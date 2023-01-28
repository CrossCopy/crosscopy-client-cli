import {Command, Flags} from '@oclif/core';
import {SettingConfig, AuthConfig} from '../config';
import {GraphQLClient} from 'graphql-request';
import {DBService} from '@crosscopy/core/database';
import {getPayload} from '@crosscopy/core/plugin';
import {generatePluginManager} from '../util/plugin';
import {RecordType, requests as req} from '@crosscopy/graphql-schema';
// import clipboard from 'clipboardy';
import clipboard from '@crosscopy/clipboard';
import {v4 as uuidv4} from 'uuid';
import {syncDownload} from '../util/sync';
import {stderrLogger, stdoutLogger} from '../util/logger';
import _ from 'lodash';
import {Mode, SettingSingleton} from '../config/setting';
import {graphqlUrl} from '../util/url';

const {getSdk} = req;

export default class Sync extends Command {
  auth = new AuthConfig(this.config.configDir);
  setting = new SettingConfig(this.config.configDir);

  static description = 'Sync Data With CrossCopy Cloud';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    image: Flags.boolean({
      char: 'i',
      description:
        'Sync Image from clipboard, without this flag, sync clipboard text by default',
      default: false,
    }),
  };

  static args = [{name: 'listen'}];

  public async run(): Promise<void> {
    const {flags} = await this.parse(Sync);
    const dbService = DBService.instance;
    await dbService.init(this.setting.dbPath);
    const gqlClient = new GraphQLClient(
      graphqlUrl(SettingSingleton.instance.server),
      {
        headers: {
          Authorization: this.auth.BearerAccessToken,
        },
      },
    );
    if (!this.auth.passwordHash)
      throw new Error('No Decryption Key Found, Please Login');
    const pluginManager = await generatePluginManager(this.auth.passwordHash);
    const lastRec = await dbService.selectLastRecord();
    let value: string;
    let contentType: RecordType;
    if (flags.image) {
      // clipboard image
      contentType = RecordType.Text;
      const imageBase64 = clipboard.readImageBase64Sync();
      if (imageBase64.length === 0) {
        stdoutLogger.warn('No Image In Clipboard, Skip');
        return;
      }

      value = imageBase64;
    } else {
      // clipboard text
      const cbStr = clipboard.readTextSync(); // current clipboard text
      if (cbStr.length === 0) {
        stdoutLogger.warn('No Text In Clipboard, Skip');
        return;
      }

      contentType = RecordType.Text;
      if (!lastRec || (lastRec && lastRec.value !== cbStr)) {
        stdoutLogger.debug(`lastRec: ${lastRec?.value}`);
      }

      value = cbStr;
      // syncUpload(req.RecordType.Text, )
    }

    // check if content is already in local database

    if (
      lastRec &&
      lastRec.type === contentType &&
      lastRec.value.length === value.length &&
      lastRec.value === value
    ) {
      // same content
      stdoutLogger.warn("Content is the Same, Won't Write Again");
      if (this.setting.mode === Mode.offline) {
        return;
      }

      // if (this.setting.mode === Mode.online && lastRec.insync) {
      //   stdoutLogger.warn('Clipboard is in sync with cloud');
      //   return;
      // }
    } else {
      // different clipboar content
      // continue
      await dbService.createRec({
        value: value,
        uuid: uuidv4(),
        device: await this.setting.device,
        profile: await this.setting.profile,
        type: contentType,
      });

      if (this.setting.mode === Mode.offline) {
        stdoutLogger.warn(
          "New Clipboard Content Written to Local Database.\nOffline Mode, Won't Sync with Cloud",
        );
        return;
      }
    }

    if (this.setting.mode !== Mode.online) {
      // this is a guard
      throw new Error(
        'Not In Online Mode, And Code is not Suppose to Reach Here.',
      );
    }

    const notSyncedRecords = await dbService.selectNotSyncedRecords();
    const payloads = notSyncedRecords.map((r) =>
      getPayload(r.type as RecordType, r.value),
    );
    pluginManager.uploadMany(payloads);
    const recordsToUpload: req.TextRecInput[] = notSyncedRecords.map(
      (r, idx: number) => {
        return {
          createdAt: r.createdAt,
          // deleted: r.deleted,
          deviceId: r.device.id,
          profileId: r.profile.id,
          type: r.type as req.RecordType,
          uuid: r.uuid,
          value: payloads[idx].content,
        };
      },
    );
    // console.log(recordsToUpload);

    // const encryptPromises = recordsToUpload.map((rec) =>
    //   pluginManager.upload(rec.value),
    // );
    // const encryptedValues = await Promise.all(encryptPromises);
    // for (const [i, r] of recordsToUpload.entries()) {
    //   r.value = encryptedValues[i];
    // }

    const sdk = getSdk(gqlClient);

    const syncResponse = await sdk.syncByLatestCreationTime({
      latestCreationTime: lastRec ? lastRec.createdAt : new Date(70),
      records: recordsToUpload,
    });

    if (!syncResponse.syncByLatestCreationTime) {
      stderrLogger.error('Unexpected Error, null sync response');
    }

    const res =
      syncResponse.syncByLatestCreationTime as req.SyncByLatestCreationTimeResponse;
    const {newRecords, idMapping, deletedRecInfo} = res;

    if (!this.setting.dbPath) throw new Error('DB Path not defined');
    await syncDownload(
      idMapping,
      newRecords,
      deletedRecInfo,
      pluginManager,
      dbService,
    );
    stdoutLogger.info('Sync Finished');
  }
}
