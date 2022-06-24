import {Command} from '@oclif/core'
// import clipboard from 'clipboardy'
// import {execa} from 'execa'
import {exec} from 'node:child_process'

import util from 'node:util'

const execPromise = util.promisify(exec)

// import * as readline from 'node:readline'
// import {stdin as input, stdout as output} from 'node:process'

// const rl = readline.createInterface({input, output})
// import * as clipboard from 'clipboardy'

export default class Upload extends Command {
  static description = 'Upload some content'

  static examples = ['echo "content" | xcopy', 'xcopy < content.txt']

  public async run(): Promise<void> {
    // console.log(`config: ${JSON.stringify(this.config, null, 2)}`)
    // this.log(this.config.configDir)
    // this.log(this.config.dataDir)
    // const clipboardContent = clipboard.readSync()
    // rl.question('Content to upload?', (answer: string) => {
    //   this.log(`answer: ${answer}`)
    //   rl.close()
    // })
    await execPromise('ls')
    const {stdout, stderr} = await execPromise('ls')
    this.log(stdout)
    this.log(stderr)

    // const records = await prisma.rec.findMany({})
    // console.log(records)
    // execa('echo', ['unicorns'])
    // execa('echo', ['unicorns']).stdout.pipe(process.stdout)
    return Promise.resolve()
  }
}
