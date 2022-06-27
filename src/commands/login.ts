import {Command, Flags} from '@oclif/core';
import {CryptoService} from '@crosscopy/core';
import * as inquirer from 'inquirer';
import {requests} from '@crosscopy/graphql-schema';
import nconf from 'nconf';

/**
 * Sample Command
 *
 * ./bin/dev login -e user0@crosscopy.io -p password0
 */

const {getSdk} = requests;
import {GraphQLClient} from 'graphql-request';

const gqlClient = new GraphQLClient('https://api.crosscopy.io/graphql');
const sdk = getSdk(gqlClient);

export default class Login extends Command {
  static description = 'Login to CrossCopy Cloud';

  static examples = [
    'ccp login',
    'ccp login -e username@email.com -p password',
  ];

  static flags = {
    email: Flags.string({char: 'e', description: 'Email'}),
    password: Flags.string({char: 'p', description: 'Password'}),
  };

  public async run(): Promise<void> {
    nconf.argv().env().file({file: 'config.json'});
    console.log(nconf.get('a'));
    const {flags} = await this.parse(Login);
    // type Prompt = Parameters<typeof inquirer.prompt>
    const prompts: {name: string; message: string; type: string}[] = [];
    if (!flags.email) {
      prompts.push({name: 'email', message: 'Enter your Email', type: 'input'});
    }

    if (!flags.password) {
      prompts.push({
        name: 'password',
        message: 'Enter your Password',
        type: 'password',
      });
    }

    const responses: {email?: string; password?: string} =
      await inquirer.prompt(prompts);
    const email = flags.email || responses.email;
    const password = flags.password || responses.password;
    if (!email || !password)
      throw new Error('Email and Password have to be defined');
    const crypto = CryptoService.instance;
    // console.log(crypto);
    crypto.init(password);
    this.log(crypto.passwordHash);
    sdk
      .login({email, password})
      .then((res) => {
        console.log(res.login?.accessToken);
        console.log(res.login?.success);
        if (res.login?.message) {
          this.log(res.login?.message);
        }
      })
      .catch((error) => {
        this.error(error);
      });
  }
}
