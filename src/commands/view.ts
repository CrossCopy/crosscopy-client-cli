import {Command, Flags} from '@oclif/core';
import {DBService, Rec} from '@crosscopy/core/database';
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

    num: Flags.integer({
      char: 'n',
      description: 'Number of records to display',
    }),
    // id: Flags.boolean({
    //   description:
    //     'Display database (takes more space, but could be used to delete records)',
    //   default: false,
    // }),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(View);
    const dbService = DBService.instance;
    if (!this.setting.dbPath) throw new Error('DB Path not defined');
    await dbService.init(this.setting.dbPath);
    let allRecords: Rec[];
    let count: number;
    if (flags.num) {
      [allRecords, count] = await dbService.RecRepo.findAndCount({
        select: ['id', 'uuid', 'createdAt', 'type', 'value', 'insync'],
        order: {createdAt: 'DESC'},
        take: flags.num,
      });
    } else {
      [allRecords, count] = await dbService.RecRepo.findAndCount({
        select: ['id', 'uuid', 'createdAt', 'type', 'value', 'insync'],
        order: {createdAt: 'DESC'},
      });
    }

    type DisplayTableCols = {
      Online: boolean;
      Value: string;
      'Created At': string;
      UUID?: string;
      id?: number | null;
      type: string;
    };

    const displayRecords: DisplayTableCols[] = allRecords.map((r) => ({
      Online: Boolean(r.insync),
      Value: r.value.length > 40 ? `${r.value.slice(0, 40)}...` : r.value,
      'Created At': r.createdAt.toLocaleString(),
      type: r.type,
    }));
    if (flags.uuid) {
      for (const [idx, r] of allRecords.entries()) {
        displayRecords[idx].UUID = r.uuid;
      }
    }

    for (const [idx, r] of allRecords.entries()) {
      displayRecords[idx].id = r.id;
    }

    this.log(`${count} records found`);
    console.table(displayRecords);
  }
}
