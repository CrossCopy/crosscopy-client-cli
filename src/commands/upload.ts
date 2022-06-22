import {Command} from '@oclif/core'
import * as readline from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

const rl = readline.createInterface({input, output})
// import * as clipboard from 'clipboardy'

export default class Upload extends Command {
  static description = 'Upload some content'

  static examples = ['echo "content" | xcopy', 'xcopy < content.txt']

  public async run(): Promise<void> {
    // console.log(`config: ${JSON.stringify(this.config, null, 2)}`)
    // this.log(this.config.configDir)
    // this.log(this.config.dataDir)
    // const clipboardContent = clipboard.readSync()
    rl.question('Content to upload?', (answer: string) => {
      this.log(`answer: ${answer}`)
      rl.close()
    })
    return Promise.resolve()
  }
}
