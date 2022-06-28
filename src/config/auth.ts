import Config from './config';
import {operations as ops} from '@crosscopy/graphql-schema';

export type Auth = {
  passwordHash: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: ops.User | null;
};

export const authInitConfig: Auth = {
  passwordHash: null,
  accessToken: null,
  refreshToken: null,
  user: null,
};

export default class AuthConfig extends Config<Auth> {
  get passwordHash(): string | null {
    return this._config.passwordHash
  }

  set passwordHash(value: string | null) {
    this._config.passwordHash = value
    this.save()
  }

  get accessToken(): string | null {
    return this._config.accessToken
  }

  set accessToken(value: string | null) {
    this._config.accessToken = value
    this.save()
  }

  get refreshToken(): string | null {
    return this._config.refreshToken
  }

  set refreshToken(value: string | null) {
    this._config.refreshToken = value
    this.save()
  }

  get user(): ops.User | null {
    return this._config.user
  }

  set user(value: ops.User | null) {
    this._config.user = value
    this.save()
  }

  constructor(configDir: string) {
    super(configDir, 'auth.json', authInitConfig);
  }
}
