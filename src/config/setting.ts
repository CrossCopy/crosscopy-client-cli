import Config from './config';

export type Setting = {
  plugins: [];
  server: string;
  dbPath: string;
};

export const settingInitConfig: Setting = {
  plugins: [],
  server: 'https://api.crosscopy.io',
  dbPath: '',
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
