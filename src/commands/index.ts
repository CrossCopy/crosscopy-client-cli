import {Command} from '@oclif/core'
// TODO: Switch to Promise API (v17): https://nodejs.org/api/readline.html#promises-api
// import * as readline from 'node:readline'
// import {stdin as input, stdout as output} from 'node:process'

// const rl = readline.createInterface({input, output})

export default class Index extends Command {
  static description = 'describe the command here'

  static examples = ['echo "content" | xcopy', 'xcopy < content.txt']

  public async run(): Promise<void> {
    console.log(`config: ${this.config}`)
    // rl.question('Content to upload?', (answer: string) => {
    //   this.log(`answer: ${answer}`)
    // })
    // rl.close()
    return Promise.resolve()
  }
}
