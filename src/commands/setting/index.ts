import {Command} from '@oclif/core';
import {SettingConfig} from '../../config';
import {stdoutLogger} from '../../util/logger';
import {DBService} from '@crosscopy/core/database';

export default class Setting extends Command {
  setting = new SettingConfig(this.config.configDir);

  static description = 'Visualize Current Setting';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    await DBService.instance.init(this.setting.dbPath);
    stdoutLogger.data(JSON.stringify(await this.setting.config(), null, 2));
  }
}
