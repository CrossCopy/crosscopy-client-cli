import {Command, Flags} from '@oclif/core';

export default class Exp extends Command {
  static description = 'describe the command here';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {};

  static args = [{name: 'file'}];

  public async run(): Promise<void> {
    console.log(process.env.DISPLAY);
  }
}
