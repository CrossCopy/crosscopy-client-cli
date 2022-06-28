import fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

export default abstract class Config<T> {
  configDir: string;
  filename: string;
  configFilePath: string;
  _config: T;

  constructor(configDir: string, filename: string, initConfig: T) {
    this.configDir = configDir;
    this.filename = filename;
    this.configFilePath = path.join(this.configDir, this.filename);
    this._config = initConfig;
    this.initConfigFile();
  }

  initConfigFile(): void {
    if (fs.existsSync(this.configFilePath)) {
      // read config file
      const config = JSON.parse(fs.readFileSync(this.configFilePath, 'utf8'));
      this._config = _.merge(this._config, config);
    } else {
      fs.writeFileSync(
        this.configFilePath,
        JSON.stringify(this._config, null, 2),
      );
    }

    this.save();
  }

  save(): void {
    fs.writeFileSync(this.configFilePath, JSON.stringify(this._config, null, 2));
  }

  vis(): void {
    console.log(JSON.stringify(this._config, null, 2));
  }
}
