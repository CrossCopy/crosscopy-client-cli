import {Command, Flags} from '@oclif/core';
import {SettingConfig} from '../../config';
import {Mode} from '../../config/setting';
import os from 'node:os';
import {db} from '@crosscopy/core';

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
    device: Flags.string({
      description: 'set device name',
      default: `${os.hostname()}-cli`,
    }),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(Setting);
    if (flags.mode !== undefined) {
      /*
       when switching to online mode, need to take care of device name changing and profile
       if device not found, ask user to choose from an existing device, rename it locally, or create a new device

        also sync profile
       */
      this.setting.mode = flags.mode as Mode;
    }

    if (flags.server !== undefined) {
      this.setting.server = flags.server;
    }

    if (flags.device !== undefined) {
      // if in online mode, need to rename device or create new device
      const dbService = db.DBService.instance;
      if (!this.setting.dbPath) throw new Error('DB Path not defined');
      await dbService.init(this.setting.dbPath);
      this.setting.deviceId = (await dbService.deviceByName(flags.device)).id;
    }
  }
}
