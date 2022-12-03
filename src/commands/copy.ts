import {Command, Flags} from '@oclif/core';
import {generatePluginManager} from '../util/plugin';
import {readStdin} from '../util/stdin';
import {SettingConfig, AuthConfig} from '../config';
import {db} from '@crosscopy/core';
import {v4 as uuidv4} from 'uuid';
import {requests as req} from '@crosscopy/graphql-schema';
import {GraphQLClient} from 'graphql-request';

export default class Copy extends Command {
  static description = 'Copy content piped to stdin';
  auth = new AuthConfig(this.config.configDir);
  setting = new SettingConfig(this.config.configDir);

  static examples = [
    'echo content | <%= config.bin %> <%= command.id %>',
    'echo huakun | ./bin/dev copy',
  ];

  static flags = {};

  static args = [{name: 'file'}];

  public async run(): Promise<void> {
    this.log('Enter content you want to copy, press Ctrl+D to finish');
    const input = await readStdin();
    console.log(input);
    // create record
    const dbService = db.DBService.instance;
    await dbService.init(this.setting.dbPath);
    const newRecUUID = uuidv4();
    const createRec = dbService.createRec({
      id: undefined,
      uuid: newRecUUID,
      // createdAt: new Date(),
      device: await this.setting.device,
      profile: await this.setting.profile,
      // type: req.RecordType.Text,
      value: input,
      // expired: false,
      // deleted: false,
    });
    // save to sqlite db
    const createdRec = await createRec;
    // check mode
    // if mode is online, upload record (using plugin manager)
    if (this.setting.mode === 'online') {
      if (!this.auth.passwordHash)
        throw new Error('No Decryption Key Found, Please Login');
      const pluginManager = await generatePluginManager(this.auth.passwordHash);
      const dataToUpload = await pluginManager.upload(input);
      const gqlClient = new GraphQLClient(this.setting.graphqlUrl);
      const sdk = req.getSdk(gqlClient);
      // get response, update local copy with remote version
      const addedRecord = await sdk.addRecord({
        type: req.RecordType.Text,
        value: dataToUpload,
        deviceId: -1,
        profileId: (await this.setting.profile).id,
      });
      if (addedRecord.addRecord?.id) {
        await dbService.setDbId(newRecUUID, addedRecord.addRecord?.id);
      } else {
        throw new Error('Failed to add record');
      }
    }
  }
}
