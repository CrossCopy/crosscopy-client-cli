import {Command} from '@oclif/core';
import {db} from '@crosscopy/core';
import {SettingConfig} from '../config';

export default class View extends Command {
  static description = 'View Clipboard Data';
  setting = new SettingConfig(this.config.configDir);

  static examples = ['<%= config.bin %> view'];

  public async run(): Promise<void> {
    if (!this.setting.dbPath) throw new Error('DB Path not defined');
    const dataSource = db.createDataSource(this.setting.dbPath);
    await dataSource.initialize();
    const RecRepo = db.getRecRepo(dataSource);
    const [allRecords, count] = await RecRepo.findAndCount({
      select: ['id', 'createdAt', 'type', 'value'],
      order: {createdAt: 'DESC'},
    });
    const displayRecords = allRecords.map((r) => ({
      Online: r.id !== null,
      Value: r.value.length > 40 ? `${r.value.slice(0, 40)}...` : r.value,
      'Created At': r.createdAt.toLocaleString(),
    }));
    // for (const rec of allRecords) {
    //   rec.value =
    //     rec.value.length > 40 ? `${rec.value.slice(0, 40)}...` : rec.value;
    //   rec.createdAt = new Date(rec.createdAt);
    //   // console.log(typeof rec.createdAt);
    // }

    this.log(`${count} records found`);
    console.table(displayRecords);
  }
}
