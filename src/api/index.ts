import {Config} from "@oclif/core/lib/config/config";
import {SettingConfig} from "../config";
import AuthConfig from "../config/auth";
import {requests as req} from "@crosscopy/graphql-schema";
import {GraphQLClient} from "graphql-request";

const {getSdk} = req;

export default abstract class Index {
  config: Config
  setting: SettingConfig
  auth: AuthConfig

  protected constructor(config: Config) {
    this.config = config;
    this.setting = new SettingConfig(this.config.configDir);
    this.auth = new AuthConfig(this.config.configDir);
  }

  reloadConfig() {
    this.setting = new SettingConfig(this.config.configDir);
    this.auth = new AuthConfig(this.config.configDir);
  }

  get sdk() {
    const gqlClient = new GraphQLClient(this.setting.graphqlUrl, {
      headers: {
        Authorization: `Bearer ${this.auth.config.accessToken}`,
      },
    });
    return getSdk(gqlClient);
  }
}
