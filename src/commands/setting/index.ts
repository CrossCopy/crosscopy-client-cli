import {Command} from '@oclif/core';

export default class Setting extends Command {
  static description = 'describe the command here';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    this.log('setting');
  }
}
