import {Command} from '@oclif/core';
import {SettingConfig, AuthConfig} from '../config';
import {GraphQLClient} from 'graphql-request';
import {requests} from '@crosscopy/graphql-schema';
import {db} from '@crosscopy/core';
import {generatePluginManager} from '../util/plugin';
import {operations as ops} from '@crosscopy/graphql-schema';
import clipboard from 'clipboardy';
import {v4 as uuidv4} from 'uuid';

const {getSdk} = requests;

export default class Sync extends Command {
  auth = new AuthConfig(this.config.configDir);
  setting = new SettingConfig(this.config.configDir);

  static description = 'Sync Data With CrossCopy Cloud';

  static examples = ['<%= config.bin %> sync'];

  public async run(): Promise<void> {
    const dbSerivce = db.DBService.instance;
    await dbSerivce.init(this.setting.dbPath);
    const uuids = await dbSerivce.uuids(); // get all uuids locally from sqlite db
    const gqlClient = new GraphQLClient(this.setting.graphqlUrl, {
      headers: {
        Authorization: `Bearer ${this.auth._config.accessToken}`,
      },
    });
    if (!this.auth.passwordHash)
      throw new Error('No Decryption Key Found, Please Login Again');
    const pluginManager = await generatePluginManager(this.auth.passwordHash);

    const cbStr = clipboard.readSync();
    const lastRec = await dbSerivce.selectLastRecord();

    if (!lastRec || (lastRec && lastRec.value !== cbStr)) {
      await dbSerivce.createRec({value: cbStr, uuid: uuidv4()});
    }

    const localOnlyRecords = await dbSerivce.selectLocalOnlyRecords();
    const recordsToUpload = localOnlyRecords.map((r) => ({
      type: r.type,
      value: r.value,
      device: r.device,
      profile: r.profile,
      uuid: r.uuid,
      createdAt: r.createdAt,
    })) as requests.TextRecInput[];

    const encryptPromises = recordsToUpload.map((rec) =>
      pluginManager.upload(rec.value),
    );
    const encryptedValues = await Promise.all(encryptPromises);
    for (const [i, r] of recordsToUpload.entries()) {
      r.value = encryptedValues[i];
    }

    const sdk = getSdk(gqlClient);
    const res = await sdk.sync({
      uuids,
      records: recordsToUpload,
    });
    if (!res.sync) throw new Error('Unexpected Error, wrong sync response');
    const {idMapping, newRecords} = res.sync;
    const decryptPromises = newRecords
      .filter((rec_) => rec_)
      .map((rec) => {
        return pluginManager.download(rec!.value);
      });
    const decrypted = await Promise.all(decryptPromises);

    for (const [i, rec] of newRecords.entries()) {
      if (rec) {
        rec.value = decrypted[i];
      }
    }

    if (!this.setting._config.dbPath) throw new Error('DB Path not defined');
    const createRecordPromise = newRecords
      .filter((rec) => rec)
      .map((rec) =>
        dbSerivce.createRec({
          id: rec!.id,
          uuid: rec!.uuid,
          createdAt: rec!.createdAt,
          device: rec!.device,
          profile: rec!.profile,
          type: rec!.type as unknown as ops.RecordType,
          userId: rec!.userId,
          value: rec!.value,
          expired: rec!.expired,
          deleted: rec!.deleted,
        }),
      );
    await Promise.all(createRecordPromise);
    this.log('Sync Success');
    this.log(`Downloaded ${newRecords.length} Records`);

    const updateDbIdPromise = idMapping
      .filter((pair) => pair)
      .map((pair) => dbSerivce.setDbId(pair!.uuid, pair!.id));
    await Promise.all(updateDbIdPromise);
    this.log(`Uploaded ${idMapping.length} Records, Database ID Assigned`);

    // write latest record to clipboard
    const lastRec2 = await dbSerivce.selectLastRecord();
    if (lastRec2) {
      clipboard.writeSync(lastRec2.value);
    }
  }
}
