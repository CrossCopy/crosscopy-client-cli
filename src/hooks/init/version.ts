import {Hook} from '@oclif/core';
import axios from 'axios';
import {stderrLogger, stdoutLogger} from '../../util/logger';
import boxen from 'boxen';
import chalk from 'chalk';

const hook: Hook<'init'> = async function () {
  const curVersion = this.config.version;
  axios
    .get('https://registry.npmjs.org/crosscopy/latest')
    .then((data) => {
      const lastestVersion = data.data.version;
      if (!lastestVersion) {
        stderrLogger.warn('Unable to get latest version');
        return;
      }

      if (lastestVersion === curVersion) {
        stdoutLogger.warn(
          `Current version: ${curVersion}, latest version: ${lastestVersion}. Consider upgrading with`,
        );
        const banner = chalk.bold(`sudo npm i -g crosscopy@${lastestVersion}`);
        const box = boxen(banner, {
          padding: 1,
          margin: 1,
          align: 'center',
          borderColor: '#00c7b7',
        });
        console.log(box);
      }
    })
    .catch((error) => {
      stderrLogger.error('Failed to get latest version info');
      console.error(error);
    });
};

export default hook;
