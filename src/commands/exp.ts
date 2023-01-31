import {Command} from '@oclif/core';

export default class Exp extends Command {
  static description = 'describe the command here';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {};

  static args = [];

  public async run(): Promise<void> {
    // console.log(process.env.DISPLAY);
    // import boxen from 'boxen';
    // const boxen = await import('boxen');
    // const boxen = require('boxen/index');
    // console.log(boxen);
    // console.log(boxen('unicorn', {padding: 1}));
  }
}
