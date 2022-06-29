import {Command, Flags} from '@oclif/core';
import {SettingConfig} from '../../config';

export default class Setting extends Command {
  setting = new SettingConfig(this.config.configDir);

  static description = 'describe the command here';

  static examples = ['<%= config.bin %> setting mode --offline', '<%= config.bin %> setting mode --online'];

  static flags = {
    offline: Flags.boolean({description: 'set offline mode'}),
    online: Flags.boolean({description: 'set online mode'}),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(Setting);
    if (!flags.offline && !flags.online) {
      console.log(`Mode: ${this.setting.mode}`);
    }

    if (flags.offline && flags.online) {
      this.warn("Can't set both offline and online mode");
    }

    if (flags.offline) {
      this.setting.mode = 'offline';
      this.log('Mode set to offline');
    }

    if (flags.online) {
      this.setting.mode = 'online';
      this.log('Mode set to online');
    }
  }
}
