import {Hook} from '@oclif/core';
import {GraphQLClient} from 'graphql-request';
import {SettingConfig} from '../../../src/config';
import {requests} from '@crosscopy/graphql-schema';

const hook: Hook<'init'> = async function (_options) {
  this.log('wakeup init hook');
  // check access token and refresh token expiry time and refresh if needed
  const setting = new SettingConfig(this.config.configDir);
  const gqlClient = new GraphQLClient(setting.graphqlUrl);
  const {getSdk} = requests;
  const sdk = getSdk(gqlClient);
  const res = await sdk.online();
  if (res.online) {
    this.log('Server Online');
  } else {
    this.warn('Server is offline, your data will not be synced.');
  }
};

export default hook;
