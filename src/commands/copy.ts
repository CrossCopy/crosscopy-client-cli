import {Command} from '@oclif/core';
import {generatePluginManager} from '../util/plugin';
import {readStdin} from '../util/stdin';
import {SettingConfig, AuthConfig} from '../config';
import {db} from '@crosscopy/core';
import {v4 as uuidv4} from 'uuid';
import {requests as req} from '@crosscopy/graphql-schema';
import {generateSDK} from '../util/graphql';
import fs from 'node:fs';
import chalk from 'chalk';
import {plugin} from '@crosscopy/core';

const {getTextPayload} = plugin;
const maxDisplayContentLength = 200;

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

  static flags = {};

  static args = [{name: 'file'}];

  public async run(): Promise<void> {
    this.log('Enter content you want to copy, press Ctrl+D to finish');
    const {args} = await this.parse(Copy);
    let contentToUpload: string;
    if (args.file) {
      this.log(chalk.cyan('Input File:'), chalk.green(`${args.file}`));
      const fileContent = fs.readFileSync(args.file, {
        encoding: 'utf8',
        flag: 'r',
      });

      contentToUpload = fileContent;
    } else {
      contentToUpload = await readStdin();
      console.log(`stdin content:\n${contentToUpload}`);
    }

    this.log(chalk.cyan('\nContent to Upload:\n'));
    this.log(
      chalk.green(
        `${contentToUpload.slice(0, maxDisplayContentLength)}${
          contentToUpload.length > maxDisplayContentLength ? '...' : ''
        }\n\n`,
      ),
    );

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
      value: contentToUpload,
      // expired: false,
      // deleted: false,
    });
    // save to local sqlite db
    await createRec;
    // check mode
    // if mode is online, upload record (using plugin manager)
    if (this.setting.mode === 'online') {
      if (!this.auth.passwordHash)
        throw new Error('No Decryption Key Found, Please Login');
      const pluginManager = await generatePluginManager(this.auth.passwordHash);
      const payload = getTextPayload(contentToUpload);
      pluginManager.upload(payload);
      const dataToUpload = payload.content;
      const sdk = generateSDK(
        this.setting.graphqlUrl,
        this.auth.BearerAccessToken,
      );
      this.log(`Content Length: ${dataToUpload.length}`);

      // get response, update local copy with remote version
      console.log(dataToUpload);

      const addedRecord = await sdk.addRecord({
        type: req.RecordType.Text,
        value: dataToUpload,
        deviceId: this.setting.deviceId,
        profileId: this.setting.profileId,
      });
      if (addedRecord.addRecord?.id) {
        await dbService.setDbId(newRecUUID, addedRecord.addRecord?.id);
      } else {
        throw new Error('Failed to add record');
      }
    }
  }
}
