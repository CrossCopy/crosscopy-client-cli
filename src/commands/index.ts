import {Command, Flags} from '@oclif/core';
import {readStdin} from "../util/stdin";

export default class Index extends Command {
  static description = 'Root Command';

  static examples = [];

  static flags = {};

  static args = [];

  async run(): Promise<void> {
    const input = await readStdin()
    this.log(input);
    this.log("hello")
  }
}
