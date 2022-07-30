import cb from 'clipboardy';
import {db} from '@crosscopy/core';
import debug from 'debug';

const logger = debug('crosscopy:clipboard-monitor');

type SetIntervalRetType = ReturnType<typeof setInterval>;

export default (): {
  listen: (
    dbService: db.DBService,
    callback: (content: string) => void | Promise<void>,
    freq: number,
  ) => void;
  stop: () => void;
} => {
  let interval: SetIntervalRetType;
  return {
    listen: (dbService, callback, freq) => {
      interval = setInterval(async () => {
        const latestCbContent = cb.readSync();
        const record = await dbService.selectLastRecord();
        if (record && record.value && record.value !== latestCbContent) {
          callback(latestCbContent);
        }
      }, freq);
    },
    stop: () => {
      logger('Stopping clipboard monitor');
      clearInterval(interval);
    },
  };
};
