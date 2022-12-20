import process from 'node:process';
import chalk from 'chalk';

// TODO: make color configurable (because extra color chars are output to stderr if saved to file)
export class Logger {
  writeStream: NodeJS.WriteStream;
  noColor: boolean;

  constructor(stream: NodeJS.WriteStream = process.stdout, noColor = false) {
    this.writeStream = stream;
    this.noColor = noColor;
  }

  write(data: string, colorFunction?: chalk.ChalkFunction) {
    let _data = data + '\n';
    _data = !colorFunction || this.noColor ? _data : colorFunction(_data);
    this.writeStream.write(_data);
  }

  data(data: string) {
    this.write(data, chalk.cyan);
  }

  warn(data: string) {
    this.write(data, chalk.yellow);
  }

  error(data: string) {
    this.write(data, chalk.red);
  }

  info(data: string) {
    this.write(data, chalk.blue);
  }

  log(data: string) {
    this.write(data);
  }

  debug(data: string) {
    this.write(data, chalk.gray);
  }

  success(data: string) {
    this.write(data, chalk.greenBright);
  }

  fatal(data: string) {
    this.write(data, chalk.red);
  }
}

export class StdoutLogger extends Logger {
  writeStream = process.stdout;
}

export class StderrLogger extends Logger {
  writeStream = process.stderr;
}

export const stdoutLogger = new StdoutLogger();
export const stderrLogger = new StderrLogger();
