import {Command, Flags} from '@oclif/core';
import * as inquirer from 'inquirer';

export default class Delete extends Command {
  static description =
    'Delete Records, Flags can be combined, each flag will be evaluated separately.';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --all',
    '<%= config.bin %> <%= command.id %> --all -y',
    '<%= config.bin %> <%= command.id %> --idx 6',
    '<%= config.bin %> <%= command.id %> --start 6 --end 10',
    '<%= config.bin %> <%= command.id %> --numDays=7',
  ];

  static flags = {
    all: Flags.boolean({char: 'a', description: 'delete all records'}),
    start: Flags.integer({char: 's', description: 'start index'}),
    end: Flags.integer({char: 'e', description: 'end index'}),
    yes: Flags.boolean({
      char: 'y',
      description: 'Confirm Deletion without prompt',
    }),
    idx: Flags.integer({char: 'i', description: 'Index of record to delete'}),
    numDays: Flags.integer({
      char: 'n',
      description: 'Delete records older than n days',
    }),
  };

  static args = [{name: 'file'}];

  public async run(): Promise<void> {
    const {flags} = await this.parse(Delete);
    const deleteAll = flags.all;
    const start = flags.start;
    const end = flags.end;
    const idx = flags.idx;

    let confirm = flags.yes;
    if (!confirm) {
      let messageSubStr = '';
      if (flags.all) {
        messageSubStr = 'All Records';
      } else if (flags.start) {
      } else if (flags.end) {
      } else if (flags.idx) {
      }

      const responses: {confirm?: boolean} = await inquirer.prompt([
        {
          name: 'confirm',
          message: `Confirm Delete ${messageSubStr}?`,
          type: 'confirm',
        },
      ]);
      console.log(responses);
      confirm = Boolean(responses.confirm);
    }

    if (!confirm) {
      this.log('Deletion Aborted');
    }
  }
}
