import {Device, Profile, DBService} from '@crosscopy/core/database';
import Config from './config';
import _ from 'lodash';

// export type Mode = 'offline' | 'online';
export enum Mode {
  offline = 'offline',
  online = 'online',
}

export type Setting = {
  // plugins: [];
  dbPath: string;
  server: string;
  mode: Mode;
  deviceId: number;
  profileId: number;
};

export const settingInitConfig: Setting = {
  // plugins: [],
  dbPath: '',
  mode: Mode.online,
  server: 'https://api.crosscopy.io',
  deviceId: 0,
  profileId: 0,
};

export class SettingSingleton {
  mode: Mode;
  private _deviceId: number;
  private _device?: Device;
  private _profile?: Profile;
  private _profileId: number;
  dbPath: string;
  private static _instance: SettingSingleton;
  public server: string;

  get device(): Device | undefined {
    return this._device;
  }

  get deviceId(): number {
    return this._deviceId;
  }

  get profileId(): number {
    return this._profileId;
  }

  get profile(): Profile | undefined {
    return this._profile;
  }

  async setDeviceId(id: number) {
    this._deviceId = id;
    this._device = await DBService.instance.deviceById(this._deviceId);
  }

  async setProfileId(id: number) {
    this._profileId = id;
    this._profile = await DBService.instance.profileById(this._profileId);
  }

  private constructor() {
    // dummy data for init
    this.mode = Mode.online;
    this._deviceId = 0;
    this._profileId = 0;
    this.dbPath = '';
    this.server = '';
  }

  async init(mode: Mode, deviceId: number, profileId: number, dbPath: string) {
    this.mode = mode;
    await this.setDeviceId(deviceId);
    await this.setProfileId(profileId);
    this.dbPath = dbPath;
  }

  public static get instance(): SettingSingleton {
    return SettingSingleton.getInstance();
  }

  public static getInstance(): SettingSingleton {
    if (!SettingSingleton._instance) {
      SettingSingleton._instance = new SettingSingleton();
    }

    return SettingSingleton._instance;
  }
}

/**
 * SettingConfig is for loading setting from a json file
 */
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

  get device(): Promise<Device> {
    return DBService.instance.deviceById(this.deviceId);
  }

  get profile(): Promise<Profile> {
    return DBService.instance.profileById(this.profileId);
  }

  get socketioUrl(): string {
    return `${this._config.server}/clipboard`;
  }

  get graphqlUrl(): string {
    return `${this._config.server}/graphql`;
  }

  get subscriptionUrl(): string {
    return `ws://${this._config.server.split('//')[1]}/graphql`;
  }

  /**
   * @returns Detailed settings
   */
  async config(): Promise<Setting> {
    return _.merge(this._config, {
      device: await this.device,
      profile: await this.profile,
    });
  }
}
