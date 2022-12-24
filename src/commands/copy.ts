import {Command, Flags} from '@oclif/core';
import {generatePluginManager} from '../util/plugin';
import {readStdin} from '../util/stdin';
import {SettingConfig, AuthConfig} from '../config';
import {DBService} from '@crosscopy/core/database';
import {v4 as uuidv4} from 'uuid';
import {requests as req} from '@crosscopy/graphql-schema';
import {generateSDK} from '../util/graphql';
import fs from 'node:fs';
import {stdoutLogger} from '../util/logger';
import {upload} from '../util/sync';
import {Mode} from '../config/setting';

/**
 * TODO: test coping a very long string that prisma can't handle, see what error is returned.
 * Don't want too much info returned.
 */
export default class Copy extends Command {
  static description = 'Copy content piped to stdin';
  auth = new AuthConfig(this.config.configDir);
  setting = new SettingConfig(this.config.configDir);

  static examples = [
    'echo content | <%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> <filename.txt>',
  ];

  static flags = {
    image: Flags.boolean({
      description:
        'Image File, without this flag, files will be interpreted as UTF8 Text File',
      default: false,
    }),
  };

  static args = [{name: 'file'}];

  public async run(): Promise<void> {
    this.log('Enter content you want to copy, press Ctrl+D to finish');
    const {args, flags} = await this.parse(Copy);
    let contentType: req.RecordType = req.RecordType.Text;
    let contentToUpload: string;
    if (args.file) {
      stdoutLogger.info(`Input File: ${args.file}`);
      contentType = flags.image ? req.RecordType.Image : req.RecordType.Text;
      contentToUpload = flags.image
        ? fs.readFileSync(args.file).toString('base64')
        : fs.readFileSync(args.file, {
            encoding: 'utf8',
            flag: 'r',
          });
    } else {
      contentToUpload = await readStdin();
    }

    // create record
    const dbService = DBService.instance;
    await dbService.init(this.setting.dbPath);

    // TODO: Move the following
    const newRecUUID = uuidv4();
    const recToCreate = {
      id: undefined,
      uuid: newRecUUID,
      device: await this.setting.device,
      profile: await this.setting.profile,
      type: contentType,
      value: contentToUpload,
    };
    await dbService.createRec(recToCreate);

    // save to local sqlite db
    // check mode
    // if mode is online, upload record (using plugin manager)
    if (this.setting.mode === Mode.online) {
      if (!this.auth.passwordHash)
        throw new Error('No Decryption Key Found, Please Login');
      const pluginManager = await generatePluginManager(this.auth.passwordHash);

      const sdk = generateSDK(
        this.setting.graphqlUrl,
        this.auth.BearerAccessToken,
      );
      const addedRecord = await upload(recToCreate, pluginManager, sdk);
      if (addedRecord.id) {
        await dbService.setDbId(newRecUUID, addedRecord.id);
        await dbService.setInsync(newRecUUID, 1);
      } else {
        throw new Error('Failed to add record');
      }
    }
  }
}
