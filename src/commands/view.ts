import {Command, Flags} from '@oclif/core';
import {db} from '@crosscopy/core';
import {SettingConfig} from '../config';

export default class View extends Command {
  static description = 'View Clipboard Data';
  setting = new SettingConfig(this.config.configDir);

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    uuid: Flags.boolean({
      description:
        'Display UUID (takes more space, but could be used to delete records)',
      default: false,
    }),

    id: Flags.boolean({
      description:
        'Display database (takes more space, but could be used to delete records)',
      default: false,
    }),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(View);
    const dbService = db.DBService.instance;
    if (!this.setting.dbPath) throw new Error('DB Path not defined');
    await dbService.init(this.setting.dbPath);

    const [allRecords, count] = await dbService.RecRepo.findAndCount({
      select: ['id', 'uuid', 'createdAt', 'type', 'value'],
      order: {createdAt: 'DESC'},
    });

    type DisplayTableCols = {
      Online: boolean;
      Value: string;
      'Created At': string;
      UUID?: string;
      id?: string | null;
    };

    const displayRecords: DisplayTableCols[] = allRecords.map((r) => ({
      Online: r.id !== null,
      Value: r.value.length > 40 ? `${r.value.slice(0, 40)}...` : r.value,
      'Created At': r.createdAt.toLocaleString(),
    }));
    if (flags.uuid) {
      for (const [idx, r] of allRecords.entries()) {
        displayRecords[idx].UUID = r.uuid;
      }
    }

    if (flags.uuid) {
      for (const [idx, r] of allRecords.entries()) {
        displayRecords[idx].id = r.id;
      }
    }

    this.log(`${count} records found`);
    console.table(displayRecords);
  }
}
