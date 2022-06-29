import Config from './config';

type Mode = 'offline' | 'online';

export type Setting = {
  plugins: [];
  server: string;
  dbPath: string;
  mode: Mode;
};

export const settingInitConfig: Setting = {
  plugins: [],
  server: 'https://api.crosscopy.io',
  dbPath: '',
  mode: 'online',
};

export default class SettingConfig extends Config<Setting> {
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

  constructor(configDir: string) {
    super(configDir, 'setting.json', settingInitConfig);
  }

  get socketioUrl(): string {
    return `${this._config.server}/clipboard`;
  }

  get graphqlUrl(): string {
    return `${this._config.server}/graphql`;
  }
}
