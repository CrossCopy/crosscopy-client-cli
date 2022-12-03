import {Command, Flags} from '@oclif/core';
import {CryptoService, db} from '@crosscopy/core';
import * as inquirer from 'inquirer';
import {requests as req} from '@crosscopy/graphql-schema';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Sample Command
 *
 * ./bin/dev login -e user0@crosscopy.io -p password0
 */
const {getSdk} = req;
import {GraphQLClient} from 'graphql-request';
import {SettingConfig, AuthConfig} from '../config';

export default class Login extends Command {
  static description = 'Login to CrossCopy Cloud';
  auth = new AuthConfig(this.config.configDir);
  setting = new SettingConfig(this.config.configDir);
  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> -e username@email.com -p password',
  ];

  static flags = {
    email: Flags.string({char: 'e', description: 'Email'}),
    password: Flags.string({char: 'p', description: 'Password'}),
  };

  public async run(): Promise<void> {
    this.log(this.setting.graphqlUrl);
    const gqlClient = new GraphQLClient(this.setting.graphqlUrl);
    const sdk = getSdk(gqlClient);
    const {flags} = await this.parse(Login);
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
    if (!email || !password) throw new Error('Email and Password not defined');

    // clear database
    const dbService = db.DBService.instance;
    if (!this.setting.dbPath) throw new Error('DB Path not defined');
    await dbService.init(this.setting.dbPath);
    this.log('Clear Old Database Data');
    await dbService.RecRepo.createQueryBuilder()
      .delete()
      .where('1=1')
      .execute();
    sdk
      .login({email, password})
      .then((res) => {
        if (!res.login)
          throw new Error('Unexpected Error, wrong login response');
        this.auth.accessToken = res.login.accessToken;
        if (res.login.refreshToken) {
          this.auth.refreshToken = res.login.refreshToken;
        } else {
          this.warn(
            "Didn't receive a refresh token, session will expire soon.",
          );
        }

        const devices = res.login.user?.devices;
        console.log(devices);

        // const devices =
        //   res.login.user.?.map((d) => ({
        //     id: d?.id,
        //     deviceName: d?.deviceName,
        //   })) || [];
        // const profiles =
        //   res.login.user?.profiles?.map((p) => ({
        //     id: p?.id,
        //     profileName: p?.profileName,
        //   })) || [];
        // const records =
        //   res.login.user?.records?.map((r) => ({
        //     id: r?.id,
        //     uuid: r?.uuid,
        //     createdAt: r?.createdAt,
        //     device: r?.device,
        //     profile: r?.profile,
        //     type: r?.type,
        //     value: r?.value,
        //     expired: r?.expired,
        //     deleted: r?.deleted,
        //     deletedAt: r?.deletedAt,
        //     insync: true,
        //   })) || [];
        // dbService.DeviceRepo.createQueryBuilder()
        //   .insert()
        //   .values(devices)
        //   .execute();

        // dbService.ProfileRepo.createQueryBuilder()
        //   .insert()
        //   .values(profiles)
        //   .execute();

        // dbService.RecRepo.createQueryBuilder()
        //   .insert()
        //   .values(records)
        //   .execute();
        // dbService.RecRepo.create({device: {}});
        const userOnly = cloneDeep(res.login.user);
        delete userOnly?.records;
        this.auth.user = userOnly as unknown as req.User;
        const crypto = CryptoService.instance;
        crypto.init(password);
        this.auth.passwordHash = crypto.passwordHash;
        console.log(res.login);
        if (res.login.message) {
          this.log(res.login?.message);
        }

        this.log(`Login As ${this.auth.user.username}`);
      })
      .catch((error) => {
        this.error(error.message);
      });
  }
}
