import {Command} from '@oclif/core';
import {SettingConfig} from '../../config';

export default class Setting extends Command {
  setting = new SettingConfig(this.config.configDir);

  static description = 'Setting';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    console.log(JSON.stringify(this.setting._config, null, 2));
  }
}
