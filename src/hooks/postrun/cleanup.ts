import {Hook} from '@oclif/core';
import {DBService} from '@crosscopy/core/database';
import SettingConfig from '../../config/setting';
import {stdoutLogger} from '../../util/logger';

const hook: Hook<'postrun'> = async function () {
  const setting = new SettingConfig(this.config.configDir);
  const dbService = DBService.instance;
  await dbService.init(setting.dbPath);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, count] = await dbService.RecRepo.findAndCount({
    select: ['id'],
  });
  stdoutLogger.info('Clean Up');
  stdoutLogger.data(`Number of Record: ${count}`);
  stdoutLogger.info('TODO: Clean up expired records to save space');
};

export default hook;
