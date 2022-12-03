import * as readline from 'node:readline';

export const readStdin: () => Promise<string> = () =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    let data = '';
    rl.on('line', (line) => {
      data += line + '\n';
    });
    rl.once('close', () => {
      resolve(data);
    });
  });
