import fs from 'node:fs';
import {Command, Flags} from '@oclif/core';
import {DBService, Rec} from '@crosscopy/core/database';
import {RecordType} from '@crosscopy/graphql-schema';

import SettingConfig from '../config/setting';
import {AuthConfig} from '../config';

import {stderrLogger, stdoutLogger} from '../util/logger';
import {writeToClipboard} from '../util/clipboard';

export default class Paste extends Command {
  static summary = 'Get Clipboard History Item';

  static description =
    'Paste: Get clipboard history item, output to stdout or clipboard';

  setting = new SettingConfig(this.config.configDir);
  auth = new AuthConfig(this.config.configDir);

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --id 10',
    '<%= config.bin %> <%= command.id %> --uuid <uuid>',
    '<%= config.bin %> <%= command.id %> --id 10 --toClipboard',
    '<%= config.bin %> <%= command.id %> --uuid <uuid> --imageFile image.png',
  ];

  static flags = {
    id: Flags.integer({description: 'Database id of clipboard item to get'}),
    uuid: Flags.string({description: 'uuid of clipboard item to get'}),
    toClipboard: Flags.boolean({
      char: 'c',
      description: 'Output to clipboard.',
      default: false,
    }),
    imageFile: Flags.string({
      char: 'f',
      description: 'Output to image file, only ends with .png',
    }),
  };

  static args = [{name: 'file'}];

  public async run(): Promise<void> {
    const {flags} = await this.parse(Paste);
    let idTypeFlagCount = 0;
    if (flags.id) idTypeFlagCount++;
    if (flags.uuid) idTypeFlagCount++;
    if (idTypeFlagCount > 1) {
      stderrLogger.error(
        'No more than one id type can be set, choose one of idx, id or uuid',
      );
      return;
    }

    const dbService = DBService.instance;
    await dbService.init(this.setting.dbPath);

    let record: Rec | null;
    if (idTypeFlagCount === 0) {
      // no id type given, choose the last record
      const lastRec = await dbService.selectLastRecord();
      if (!lastRec) {
        stderrLogger.warn('No Latest Record Found');
        return;
      }

      record = lastRec;
    } else if (flags.id) {
      record = await dbService.RecRepo.findOneBy({
        id: flags.id,
      });
    } else if (flags.uuid) {
      record = await dbService.RecRepo.findOneBy({
        uuid: flags.uuid,
      });
    } else {
      stderrLogger.error(
        'Unexpected error: Id Type Not Valid, not supposed to reach here.',
      );
      return;
    }

    if (!record) {
      stdoutLogger.error('Unable to find the record with the given id');
      return;
    }

    if (flags.imageFile) {
      if (record.type !== RecordType.Image) {
        stderrLogger.error('Image File path specified but record is not image');
        return;
      }

      if (flags.imageFile.slice(-4) !== '.png') {
        stderrLogger.error('Unsupported Image Extension, use .png');
        return;
      }

      // write image to file
      const imgBuf = Buffer.from(record.value, 'base64');
      fs.writeFileSync(flags.imageFile, imgBuf);
    }

    if (flags.toClipboard) {
      writeToClipboard(record);
      stdoutLogger.info('Data written to clipboard');
    } else {
      // disable lint warning to make logic more readble
      // eslint-disable-next-line no-lonely-if
      if (record.type === RecordType.Image) {
        // if selected record is image, and to saved to file, display warning
        if (!flags.imageFile) {
          stdoutLogger.warn(
            'Selected record is of image type, cannot be printed. Write to clipboard with "-c" flag. Or save image to file with "--file" flag.',
          );
        }
      } else if (record.type === RecordType.Text) {
        stdoutLogger.data(record.value);
      } else {
        stderrLogger.error(`Record Type Unhandled: ${record.type}`);
      }
    }
  }
}
