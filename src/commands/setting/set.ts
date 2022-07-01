import {Command, Flags} from '@oclif/core';
import {SettingConfig} from '../../config';
import {Mode} from '../../config/setting';

export default class Setting extends Command {
  setting = new SettingConfig(this.config.configDir);

  static description = 'Set Setting';

  static examples = ['<%= config.bin %> <%= command.id %> --mode=offline'];

  static flags = {
    mode: Flags.string({
      description: 'set mode',
      options: ['online', 'offline'],
    }),
    server: Flags.string({
      description: 'set server url',
      default: 'https://api.crosscopy.io',
    }),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(Setting);
    if (flags.mode !== undefined) {
      this.setting.mode = flags.mode as Mode;
    }

    if (flags.server !== undefined) {
      this.setting.server = flags.server;
    }
  }
}
