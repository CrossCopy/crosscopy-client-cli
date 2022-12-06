import {db} from '@crosscopy/core';
import Config from './config';

export type Mode = 'offline' | 'online';

export type Setting = {
  plugins: [];
  server: string;
  dbPath: string;
  mode: Mode;
  deviceId: number;
  profileId: number;
};

export const settingInitConfig: Setting = {
  plugins: [],
  server: 'https://api.crosscopy.io',
  dbPath: '',
  mode: 'online',
  // deviceName: `${os.hostname()}-cli`,
  // profileName: 'Default',
  deviceId: 0,
  profileId: 0,
};

export default class SettingConfig extends Config<Setting> {
  // private static instance: SettingConfig;
  // private constructor() {}

  constructor(configDir: string) {
    super(configDir, 'setting.json', settingInitConfig);
  }

  get deviceId(): number {
    return this._config.deviceId;
  }

  set deviceId(deviceId: number) {
    this._config.deviceId = deviceId;
    this.save();
  }

  get profileId(): number {
    return this._config.profileId;
  }

  set profileId(profileId: number) {
    this._config.profileId = profileId;
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
    return db.DBService.instance.deviceById(this.deviceId);
  }

  get profile(): Promise<db.Profile> {
    return db.DBService.instance.profileById(this.profileId);
  }

  get socketioUrl(): string {
    return `${this._config.server}/clipboard`;
  }

  get graphqlUrl(): string {
    return `${this._config.server}/graphql`;
  }
}
