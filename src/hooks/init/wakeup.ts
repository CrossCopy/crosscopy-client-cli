import {Hook} from '@oclif/core';
import {GraphQLClient} from 'graphql-request';
import {SettingConfig} from '../../config';
import {requests} from '@crosscopy/graphql-schema';
import {stderrLogger} from '../../util/logger';

const hook: Hook<'init'> = async function (_options) {
  // stderrLogger.info('wakeup init hook');

  // check access token and refresh token expiry time and refresh if needed
  const setting = new SettingConfig(this.config.configDir);
  const gqlClient = new GraphQLClient(setting.graphqlUrl);
  const {getSdk} = requests;
  const sdk = getSdk(gqlClient);
  // sdk.online().then((res) => {
  //   if (res.online) {
  //     // this.log('Server Online');
  //     // process.stderr.write('Server Online');
  //     stderrLogger.info('Server Online');
  //   } else {
  //     this.warn('Server is offline, your data will not be synced.');
  //   }
  // });
};

export default hook;
