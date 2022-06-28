import {Command, Flags} from '@oclif/core';
import fsExtra from 'fs-extra';

export default class Clear extends Command {
  static description = 'Clear config and data';

  static examples = [
    'ccp clear',
    'ccp clear --data',
    'ccp clear --config',
    'ccp clear --data --config',
    'ccp clear --all',
  ];

  static flags = {
    data: Flags.boolean({char: 'd'}),
    config: Flags.boolean({char: 'c'}),
    all: Flags.boolean({char: 'a'}),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(Clear);
    if (flags.data || flags.all) {
      fsExtra.emptyDirSync(this.config.dataDir);
      this.log(`Data cleared within ${this.config.dataDir}`);
    }

    if (flags.config || flags.all) {
      fsExtra.emptyDirSync(this.config.configDir);
      this.log(`Config cleared within ${this.config.configDir}`);
    }
  }
}
