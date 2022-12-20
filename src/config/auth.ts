import {AccessToken, parseJWTToken} from '../util/auth';
import Config from './config';
import {requests as req} from '@crosscopy/graphql-schema';

export type Auth = {
  passwordHash: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  sessionId: string | null;
  user: req.User | null;
};

export const authInitConfig: Auth = {
  passwordHash: null,
  accessToken: null,
  refreshToken: null,
  user: null,
  sessionId: null,
};

export default class AuthConfig extends Config<Auth> {
  get passwordHash(): string | null {
    return this._config.passwordHash;
  }

  set passwordHash(value: string | null) {
    this._config.passwordHash = value;
    this.save();
  }

  get accessToken(): string | null {
    return this._config.accessToken;
  }

  set accessToken(value: string | null) {
    this._config.accessToken = value;
    this.save();
  }

  get parsedAccessToken(): null | AccessToken {
    return this.accessToken ? parseJWTToken(this.accessToken) : null;
  }

  get BearerAccessToken(): string {
    return `Bearer ${this.accessToken}`;
  }

  get refreshToken(): string | null {
    return this._config.refreshToken;
  }

  set refreshToken(value: string | null) {
    this._config.refreshToken = value;
    this.save();
  }

  get BearerRefreshToken(): string {
    return `Bearer ${this.refreshToken}`;
  }

  get user(): req.User | null {
    return this._config.user;
  }

  set user(value: req.User | null) {
    this._config.user = value;
    this.save();
  }

  constructor(configDir: string) {
    super(configDir, 'auth.json', authInitConfig);
  }

  get config() {
    return this._config;
  }
}
