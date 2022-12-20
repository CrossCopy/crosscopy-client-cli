import {Hook} from '@oclif/core';
import fs from 'node:fs';
import path from 'node:path';
// import readline from 'node:readline';
import AuthConfig from '../../config/auth';
import SettingConfig from '../../config/setting';
import {db} from '@crosscopy/core';
import debug from 'debug';
import {stderrLogger} from '../../util/logger';

debug.enable('crosscopy:*');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false,
// });

const hook: Hook<'init'> = async function (_options) {
  // stderrLogger.info('config init hook');

  // console.log(`example init hook running before ${options.id}`);
  // console.log(this.config.configDir);
  // console.log(this.config.dataDir);
  if (!fs.existsSync(this.config.configDir)) {
    this.log(
      `config dir not created, creating (${this.config.configDir}) now;`,
    );
    fs.mkdirSync(this.config.configDir);
  }

  if (!fs.existsSync(this.config.dataDir)) {
    this.log(`data dir not created, creating (${this.config.dataDir}) now;`);
    fs.mkdirSync(this.config.dataDir);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setting = new SettingConfig(this.config.configDir);

  // TODO: init profile and device

  // this.log(`setting config file: ${setting.configFilePath}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auth = new AuthConfig(this.config.configDir);
  // this.log(`auth config file: ${auth.configFilePath}`);
  const dbPath = path.join(this.config.dataDir, 'db.sqlite');
  if (!setting.dbPath) {
    setting.dbPath = dbPath;
    setting.save();
  }

  const dataSource = db.createDataSource(dbPath);
  await dataSource.initialize();
  // const timeout = setTimeout(() => {
  //   rl.close();
  // }, 100);
  // rl.on('line', function (line) {
  //   clearTimeout(timeout);
  //   console.log(line);
  // });
};

export default hook;
