import {Command} from '@oclif/core';
import {DBService} from '@crosscopy/core/database';
import SettingConfig from '../config/setting';
import {stdoutLogger} from '../util/logger';
import {requests as req} from '@crosscopy/graphql-schema';
// import process from 'node:process';
// import fs from 'node:fs';

export default class Default extends Command {
  static description = 'Root Command';
  setting = new SettingConfig(this.config.configDir);

  static examples = [];

  static flags = {};

  static args = [];

  async run(): Promise<void> {
    // paste
    const dbService = DBService.instance;
    await dbService.init(this.setting.dbPath);
    const lastRecord = await dbService.selectLastRecord();
    if (lastRecord === null) {
      this.warn('No record found');
      return;
    }

    // fs.writeFileSync('test.jpg', Buffer.from(lastRecord.value, 'base64'));

    if (lastRecord.type === req.RecordType.Text) {
      stdoutLogger.data(lastRecord.value);
    } else if (lastRecord.type === req.RecordType.Image) {
      // fs.writeFileSync('test.jpg', Buffer.from(lastRecord.value, 'base64'));
    }

    // if (lastRecord.type === req.RecordType.Text) {
    //   stdoutLogger.data(lastRecord.value);
    // } else if (lastRecord.type === req.RecordType.Image) {
    //   process.stdout.write(lastRecord.value);
    // }
  }
}
