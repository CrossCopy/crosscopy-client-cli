import {Hook} from '@oclif/core';
import {util} from '@crosscopy/core';
import {AuthConfig} from '../../../src/config';
import {GraphQLClient} from 'graphql-request';
import {SettingConfig} from '../../../src/config';
import {requests} from '@crosscopy/graphql-schema';

const hook: Hook<'init'> = async function (_options) {
  // check access token and refresh token expiry time and refresh if needed
  console.log(
    'Checking access token and refresh token expiry time and refresh if needed',
  );
  const auth = new AuthConfig(this.config.configDir);
  const setting = new SettingConfig(this.config.configDir);
  const gqlClient = new GraphQLClient(setting.graphqlUrl);
  const {getSdk} = requests;
  const sdk = getSdk(gqlClient);
  if (!auth.accessToken || !auth.refreshToken) {
    console.error("You don't have an access token or refresh token");
    throw new Error("Access or Refresh Token Doesn't Exist, Please Login");
  }

  const accessTokenExpired = util.jwt.jwtExpired(auth.accessToken);
  const refreshTokenExpired = util.jwt.jwtExpired(auth.refreshToken);

  if (accessTokenExpired) {
    if (refreshTokenExpired) {
      // both tokens expired, logout
      this.warn('Authentication expired, please login again');
      auth.accessToken = null;
      auth.refreshToken = null;
    } else {
      // refresh token is valid, refresh access token
      this.log('Refreshing access token');
      try {
        const res = await sdk.refreshAccessToken({
          refreshToken: auth.refreshToken,
        });
        if (res.refreshAccessToken?.accessToken) {
          auth.accessToken = res.refreshAccessToken.accessToken;
        }
      } catch (error: unknown) {
        this.warn("Couldn't refresh access token, please login again");
        this.error(error as Error);
      }
    }
  } else {
    // access token is valid, do nothing
  }
};

export default hook;
