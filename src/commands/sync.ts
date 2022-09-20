import {Command} from '@oclif/core';
import {SettingConfig, AuthConfig} from '../config';
import {GraphQLClient} from 'graphql-request';
import {db} from '@crosscopy/core';
import {generatePluginManager} from '../util/plugin';
import {requests as req} from '@crosscopy/graphql-schema';
import clipboard from 'clipboardy';
import {v4 as uuidv4} from 'uuid';
import {syncDownload} from '../util/sync';

const {getSdk} = req;

export default class Sync extends Command {
  auth = new AuthConfig(this.config.configDir);
  setting = new SettingConfig(this.config.configDir);

  static description = 'Sync Data With CrossCopy Cloud';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    const dbService = db.DBService.instance;
    await dbService.init(this.setting.dbPath);
    const uuids = await dbService.uuids(); // get all uuids locally from sqlite db
    const gqlClient = new GraphQLClient(this.setting.graphqlUrl, {
      headers: {
        Authorization: `Bearer ${this.auth._config.accessToken}`,
      },
    });
    if (!this.auth.passwordHash)
      throw new Error('No Decryption Key Found, Please Login Again');
    const pluginManager = await generatePluginManager(this.auth.passwordHash);

    const cbStr = clipboard.readSync();
    const lastRec = await dbService.selectLastRecord();

    if (!lastRec || (lastRec && lastRec.value !== cbStr)) {
      await dbService.createRec({value: cbStr, uuid: uuidv4()});
    }

    const notSyncedRecords = await dbService.selectNotSyncedRecords();
    const recordsToUpload = notSyncedRecords.map((r) => ({
      type: r.type,
      value: r.value,
      device: r.device,
      profile: r.profile,
      uuid: r.uuid,
      createdAt: r.createdAt,
    })) as req.TextRecInput[];

    const encryptPromises = recordsToUpload.map((rec) =>
      pluginManager.upload(rec.value),
    );
    const encryptedValues = await Promise.all(encryptPromises);
    for (const [i, r] of recordsToUpload.entries()) {
      r.value = encryptedValues[i];
    }

    const sdk = getSdk(gqlClient);

    // sdk.syncByLatestCreationTime({
    //   latestCreationTime: '',
    //   records: [],
    // });
    // const res = await sdk.sync({
    //   uuids,
    //   records: recordsToUpload,
    // });

    // if (!res.sync) throw new Error('Unexpected Error, wrong sync response');
    // const {idMapping, newRecords} = res.sync;
    // if (!this.setting._config.dbPath) throw new Error('DB Path not defined');
    // syncDownload(
    //   idMapping,
    //   newRecords as requests.Rec[],
    //   pluginManager,
    //   dbService,
    // );
    // sdk.
  }
}
