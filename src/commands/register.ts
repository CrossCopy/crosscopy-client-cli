import {Command, Flags} from '@oclif/core';
import {requests as req} from '@crosscopy/graphql-schema';
import {GraphQLClient} from 'graphql-request';
import {SettingConfig} from '../config';
import * as inquirer from 'inquirer';

const {getSdk} = req;

export default class Register extends Command {
  static description = 'describe the command here';
  setting = new SettingConfig(this.config.configDir);

  static examples = [
    '<%= config.bin %> <%= command.id %> -e example@email.com -u username -p password',
    '<%= config.bin %> <%= command.id %> -e example@email.com -u username',
  ];

  static flags = {
    email: Flags.string({char: 'e', description: 'Email'}),
    username: Flags.string({char: 'u', description: 'Username'}),
    password: Flags.string({char: 'p', description: 'Password'}),
  };

  public async run(): Promise<void> {
    const gqlClient = new GraphQLClient(this.setting.graphqlUrl);
    const sdk = getSdk(gqlClient);
    const {flags} = await this.parse(Register);
    let {email, username, password} = flags;
    const prompts: {name: string; message: string; type: string}[] = [];
    if (!password) {
      prompts.unshift({
        name: 'confirmPassword',
        message: 'Enter Password Again: ',
        type: 'password',
      });
      prompts.unshift({
        name: 'password',
        message: 'Choose a Password: ',
        type: 'password',
      });
    }

    if (!email)
      prompts.unshift({
        name: 'email',
        message: "What's your Email?",
        type: 'input',
      });
    if (!username)
      prompts.unshift({
        name: 'username',
        message: 'Choose a Username: ',
        type: 'input',
      });

    const responses: {
      email?: string;
      username?: string;
      password?: string;
      confirmPassword?: string;
    } = await inquirer.prompt(prompts);
    if (!email) email = responses.email;
    if (!username) username = responses.username;
    if (!password) {
      // password not set through command line flags
      password = responses.password;
      if (password !== responses.confirmPassword)
        throw new Error("Password Entered Don't match");
    }

    let code = '';
    sdk
      .sendEmailOwnershipVerificationCode({
        username: username as string,
        email: email as string,
      })
      .then((sendVerificationRes) => {
        // console.log(sendVerificationRes);
        return inquirer.prompt([
          {name: 'code', message: 'Email Verification Code', type: 'input'},
        ]);
      })
      .then((codeRes: {code: string}) => {
        code = codeRes.code;
        return sdk.verifyEmailOwnership({
          username: username as string,
          email: email as string,
          code: codeRes.code,
        });
      })
      .then((verifyRes) => {
        if (!verifyRes.verifyEmailOwnership?.success) {
          throw new Error(
            verifyRes.verifyEmailOwnership?.message ||
              'No Error Message Returned',
          );
        }

        return sdk.signup({
          username: username as string,
          email: email as string,
          code,
          password: password as string,
        });
      })
      .then((signupRes) => {
        if (!signupRes.register?.success) {
          throw new Error(
            signupRes.register?.message ||
              'Sign Up Failed, No Error Message Found',
          );
        }

        this.log('Signup Successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
