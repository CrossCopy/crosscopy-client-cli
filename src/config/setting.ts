import {db} from '@crosscopy/core';
import os from 'node:os';
import Config from './config';

export type Mode = 'offline' | 'online';

export type Setting = {
  plugins: [];
  server: string;
  dbPath: string;
  mode: Mode;
  deviceName: string;
  profileName: string;
};

export const settingInitConfig: Setting = {
  plugins: [],
  server: 'https://api.crosscopy.io',
  dbPath: '',
  mode: 'online',
  deviceName: `${os.hostname()}-cli`,
  profileName: 'Default',
};

export default class SettingConfig extends Config<Setting> {
  // private static instance: SettingConfig;
  // private constructor() {}

  constructor(configDir: string) {
    super(configDir, 'setting.json', settingInitConfig);
  }

  get deviceName(): string {
    return this._config.deviceName;
  }

  set deviceName(value: string) {
    this._config.deviceName = value;
    this.save();
  }

  get server(): string {
    return this._config.server;
  }

  set server(value: string) {
    this._config.server = value;
    this.save();
  }

  get dbPath(): string {
    return this._config.dbPath;
  }

  set dbPath(value: string) {
    this._config.dbPath = value;
    this.save();
  }

  get mode(): Mode {
    return this._config.mode;
  }

  set mode(value: Mode) {
    this._config.mode = value;
    this.save();
  }

  get device(): Promise<db.Device> {
    return db.DBService.instance.deviceByName(this.deviceName);
  }

  get profile(): Promise<db.Profile> {
    return db.DBService.instance.profileByName(this.deviceName);
  }

  get socketioUrl(): string {
    return `${this._config.server}/clipboard`;
  }

  get graphqlUrl(): string {
    return `${this._config.server}/graphql`;
  }
}
