import {Command, Flags} from '@oclif/core';
import fsExtra from 'fs-extra';
import * as inquirer from 'inquirer';
export default class Clear extends Command {
  static description = 'Clear config and data';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --data',
    '<%= config.bin %> <%= command.id %> --config',
    '<%= config.bin %> <%= command.id %> --data --config',
    '<%= config.bin %> <%= command.id %> --all',
  ];

  static flags = {
    data: Flags.boolean({char: 'd'}),
    config: Flags.boolean({char: 'c'}),
    all: Flags.boolean({char: 'a'}),
  };

  clearConfigDir(): void {
    fsExtra.emptyDirSync(this.config.configDir);
    this.log(`Config cleared within ${this.config.configDir}`);
  }

  clearDataDir(): void {
    fsExtra.emptyDirSync(this.config.dataDir);
    this.log(`Data cleared within ${this.config.dataDir}`);
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Clear);
    let triggered = false;

    if (flags.data || flags.all) {
      this.clearDataDir();
      triggered = true;
    }

    if (flags.config || flags.all) {
      this.clearConfigDir();
      triggered = true;
    }

    if (triggered) return;

    const responses: {data: boolean; config: boolean} = await inquirer.prompt([
      {
        name: 'data',
        message: 'Do you want to clear data directory?',
        type: 'confirm',
      },
      {
        name: 'config',
        message: 'Do you want to clear config directory?',
        type: 'confirm',
      },
    ]);
    console.log(responses);
    if (responses.data) this.clearDataDir();

    if (responses.config) this.clearConfigDir();
  }
}
