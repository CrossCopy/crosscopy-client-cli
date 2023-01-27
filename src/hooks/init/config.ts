import {Hook} from '@oclif/core';
import fs from 'node:fs';
import path from 'node:path';
// import readline from 'node:readline';
import AuthConfig from '../../config/auth';
import SettingConfig, {SettingSingleton} from '../../config/setting';
import {db} from '@crosscopy/core';
import debug from 'debug';
import {stderrLogger} from '../../util/logger';
import {DBService} from '@crosscopy/core/database';

debug.enable('crosscopy:*');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false,
// });

const hook: Hook<'init'> = async function (_options) {
  if (_options.id === 'setting') {
    return;
  }

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
  const setting = new SettingConfig(this.config.configDir); // load settings from config file
  const dbPath = path.join(this.config.dataDir, 'db.sqlite'); // default db path
  console.log('dbPath');
  console.log(dbPath);
  if (!setting.dbPath) {
    setting.dbPath = dbPath;
    setting.save();
  }

  // console.log(setting);
  const dataSource = db.createDataSource(dbPath);
  await dataSource.initialize();

  const settingIns = SettingSingleton.getInstance(); // load data to setting singleton class, which contains profile-specific settings
  const dbService = DBService.instance;
  await dbService.init(setting.dbPath);
  // const SettingSingleton.getInstance().profile
  await settingIns.init(
    setting.mode,
    setting.deviceId,
    setting.profileId,
    setting.dbPath,
  );

  const curProfile = SettingSingleton.getInstance().profile;
  if (curProfile?.preferences) {
    // use profile's server url if exists
    const preferences = JSON.parse(curProfile.preferences);
    if (preferences.server) {
      SettingSingleton.getInstance().server = preferences.server;
    } else {
      // use default server url on disk otherwise
      SettingSingleton.getInstance().server = setting.server;
    }
  } else {
    // use default server url on disk otherwise
    SettingSingleton.getInstance().server = setting.server;
  }

  // console.log(SettingSingleton.getInstance().profile);
  // console.log(SettingSingleton.getInstance().server);

  // TODO: init profile and device
  // this.log(`setting config file: ${setting.configFilePath}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auth = new AuthConfig(this.config.configDir);
  // this.log(`auth config file: ${auth.configFilePath}`);

  // const timeout = setTimeout(() => {
  //   rl.close();
  // }, 100);
  // rl.on('line', function (line) {
  //   clearTimeout(timeout);
  //   console.log(line);
  // });
};

export default hook;
