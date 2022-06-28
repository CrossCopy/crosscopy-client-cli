import {Command} from '@oclif/core';
import {operations as ops} from '@crosscopy/graphql-schema';
import {AuthConfig, SettingConfig} from '../config';
// import SocketIOService from '../util/socketio';
import {SocketIOService} from '@crosscopy/core';

export default class Listen extends Command {
  static description = 'Realtime Syncing';
  setting = new SettingConfig(this.config.configDir);
  auth = new AuthConfig(this.config.configDir);

  static examples = ['ccp listen'];

  public async run(): Promise<void> {
    if (!this.auth.accessToken) return this.error('Not Authenticated');
    const socketioUrl = this.setting.socketioUrl;
    this.log(`connecting to ${socketioUrl}`);
    this.log(this.auth.accessToken);
    SocketIOService.instance
      .init(
        this.setting.socketioUrl,
        '/crosscopy/ws/',
        this.auth.accessToken,
      )
      .connect([])
      .on('init', (records: ops.Rec[], latestInUserIds: number[]) => {
        this.log('init');
        console.log(records);
        console.log(latestInUserIds);
      })
      .on('notification', ({message, error}) => {
        error ? this.log(message) : this.error(message);
      });
  }
}
