import * as readline from 'node:readline';

export const readStdin: (wait?: boolean) => Promise<string> = (wait = true) =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    setTimeout(() => {
      if (!wait && data.length === 0) {
        rl.close();
      }
    }, 100);
    let data = '';
    rl.on('line', (line) => {
      data += line + '\n';
    });
    rl.once('close', () => {
      resolve(data);
    });
  });
