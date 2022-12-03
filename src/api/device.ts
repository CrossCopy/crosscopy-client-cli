import {requests as req} from '@crosscopy/graphql-schema';
import {GraphQLClient} from 'graphql-request';
import {SettingConfig} from '../config';
import API from '.';
import {Config} from '@oclif/core/lib/config/config';
import AuthConfig from '../config/auth';

const {getSdk} = req;

export default class DeviceAPI extends API {
  constructor(config: Config) {
    super(config);
  }

  /**
   * get all devices
   */
  async devices() {
    const devices = await this.sdk.devices();
    // devices.devices[0].
  }
}
