import {Command} from '@oclif/core';
import {DBService} from '@crosscopy/core/database';
import SettingConfig, {Mode} from '../config/setting';
import {stderrLogger, stdoutLogger} from '../util/logger';
import {RecordType, requests as req} from '@crosscopy/graphql-schema';
import {readStdin} from '../util/stdin';
import Copy from './copy';
import {v4 as uuidv4} from 'uuid';
import {AuthConfig} from '../config';
import {generatePluginManager} from '../util/plugin';
import {generateSDK} from '../util/graphql';
import {upload} from '../util/sync';

export default class Default extends Command {
  static description = 'Root Command';
  setting = new SettingConfig(this.config.configDir);
  auth = new AuthConfig(this.config.configDir);

  static examples = [];

  static flags = {};

  static args = [];

  async run(): Promise<void> {
    // paste
    const contentToUpload = await readStdin(false);
    if (contentToUpload.length === 0) {
      // paste mode
      const dbService = DBService.instance;
      await dbService.init(this.setting.dbPath);
      const lastRecord = await dbService.selectLastRecord();
      if (lastRecord === null) {
        this.warn('No record found');
        return;
      }

      if (lastRecord.type === req.RecordType.Text) {
        stdoutLogger.data(lastRecord.value);
      } else if (lastRecord.type === req.RecordType.Image) {
        // TODO
        // fs.writeFileSync('test.jpg', Buffer.from(lastRecord.value, 'base64'));
      }
    } else {
      // copy mode
      const dbService = DBService.instance;
      await dbService.init(this.setting.dbPath);

      const newRecUUID = uuidv4();
      const recToCreate = {
        id: undefined,
        uuid: newRecUUID,
        device: await this.setting.device,
        profile: await this.setting.profile,
        type: RecordType.Text,
        value: contentToUpload,
      };
      await dbService.createRec(recToCreate);

      if (this.setting.mode === Mode.online) {
        if (!this.auth.passwordHash)
          throw new Error('No Decryption Key Found, Please Login');
        const pluginManager = await generatePluginManager(
          this.auth.passwordHash,
        );

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
}
