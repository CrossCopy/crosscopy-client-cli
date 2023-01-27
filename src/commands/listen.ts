// Reference: https://www.npmjs.com/package/graphql-ws
import {Command} from '@oclif/core';
import {RecordType, requests as req} from '@crosscopy/graphql-schema';
import {AuthConfig, SettingConfig} from '../config';
import {v4 as uuidv4} from 'uuid';
import {generatePluginManager} from '../util/plugin';
import clipboard from '@crosscopy/clipboard';
import {createClient} from 'graphql-ws';
import WebSocket from 'ws';
import {getImagePayload, getTextPayload, Payload} from '@crosscopy/core/plugin';
import {DBService} from '@crosscopy/core/database';
import {stderrLogger, stdoutLogger} from '../util/logger';
import {generateSDK} from '../util/graphql';
import {upload} from '../util/sync';
import fs from 'node:fs';
import {graphqlUrl} from '../util/url';
import {SettingSingleton} from '../config/setting';

export default class Listen extends Command {
  static description = 'Realtime Syncing';
  setting = new SettingConfig(this.config.configDir);
  auth = new AuthConfig(this.config.configDir);

  static examples = ['<%= config.bin %> <%= command.id %>'];

  onNotification({message, error}: {message: string; error: boolean}): void {
    error ? console.log(message) : console.error(message);
  }

  async onDelete(): Promise<void> {
    // delete a record in local database
    throw new Error('Method not implemented.');
  }

  async onUpdate(): Promise<void> {
    // update a record in local database
    throw new Error('Method not implemented.');
  }

  public async run(): Promise<void> {
    // listen mode has to be online, have to have logged in with a password hash
    if (!this.auth.passwordHash) {
      throw new Error('No Decryption Key Found, Please Login');
    }

    const parsedAccessToken = this.auth.parsedAccessToken;

    if (!parsedAccessToken || !parsedAccessToken.sessionId) {
      throw new Error('No Session ID Avaialble, Please Login In Again');
    }

    const dbService = DBService.instance;
    await dbService.init(this.setting.dbPath);
    const pluginManager = await generatePluginManager(this.auth.passwordHash);
    // const payload = getTextPayload(contentToUpload);
    // pluginManager.upload(payload);
    // const dataToUpload = payload.content;
    // console.log('dataToUpload', dataToUpload);

    const sdk = generateSDK(
      // this.setting.graphqlUrl,
      graphqlUrl(SettingSingleton.instance.server),
      this.auth.BearerAccessToken,
    );

    const device = await this.setting.device;
    const profile = await this.setting.profile;

    clipboard.on('text', async (data) => {
      // TODO: consider extract a helper sync function in sync command and pass data in
      stdoutLogger.info('text updated');
      const lastRec = await dbService.selectLastRecord();
      if (!lastRec || lastRec.value !== data) {
        const recToCreate = {
          id: undefined,
          uuid: uuidv4(),
          device: device,
          profile: profile,
          type: RecordType.Text,
          value: data,
        };
        dbService.createRec(recToCreate);
        upload(recToCreate, pluginManager, sdk);
      }
    });
    clipboard.on('image', async (data) => {
      const lastRec = await dbService.selectLastRecord();
      const base64Img = data.toString('base64');
      if (!lastRec || lastRec.value !== base64Img) {
        // TODO: upload image to cloud
        stdoutLogger.info('Clipboard Image Updated, upload');
        // expect data image buffer, encode it to base64 and upload
        // fs.writeFileSync('test.png', data);
        const recToCreate = {
          id: undefined,
          uuid: uuidv4(),
          device: device,
          profile: profile,
          type: RecordType.Image,
          value: base64Img, // Buffer is pure image buffer, encode to base64 and transfer
        };
        fs.writeFileSync('image-base64.txt', base64Img);
        dbService.createRec(recToCreate);
        upload(recToCreate, pluginManager, sdk);
      }
    });
    clipboard.listen();
    stdoutLogger.info('Starting Listening for Clipboard Updates');
    const accessToken = this.auth.accessToken;
    if (!accessToken) throw new Error('No Access Token');
    // Reference: https://www.npmjs.com/package/graphql-ws

    const client = createClient({
      url: this.setting.subscriptionUrl,
      webSocketImpl: WebSocket,
      generateID: () => uuidv4(),
      connectionParams: {authToken: this.auth.accessToken},
    });
    if (!this.auth.passwordHash)
      throw new Error('No Decryption Key Found, Please Login');

    const onNext = async (rec_: any) => {
      const data = rec_ as {data: {recordSync: req.SyncSubResponse}};
      const rec = data.data.recordSync;
      let payload: Payload;
      if (rec.type === req.RecordType.Text) {
        payload = getTextPayload(rec.value);
      } else if (rec.type === req.RecordType.Image) {
        payload = getImagePayload(rec.value);
      } else {
        stderrLogger.error(`Data Type: ${rec.type} is not supported`);
        return;
      }

      pluginManager.download(payload);
      const lastRec = await dbService.selectLastRecord();
      if (
        lastRec &&
        lastRec.type === payload.type &&
        lastRec.value.length === payload.content.length &&
        lastRec.value === payload.content
      ) {
        stdoutLogger.info("Same Clipboard Content, won't write again");
        return;
      }

      await dbService.createRec({
        id: rec.id as number,
        uuid: rec.uuid,
        createdAt: rec.createdAt as string,
        device: await dbService.deviceById(rec.deviceId),
        profile: await dbService.profileById(rec.profileId),
        type: rec.type as unknown as req.RecordType,
        value: payload.content,
        expired: rec.expired,
        deleted: rec.deleted,
        insync: 1,
      });
      // eslint-disable-next-line unicorn/consistent-destructuring
      if (rec.type === req.RecordType.Text) {
        stdoutLogger.debug('Writing Text to Clipboard');
        clipboard.writeTextSync(payload.content);
      } else if (rec.type === req.RecordType.Image) {
        stdoutLogger.debug('Writing Image to Clipboard');
        clipboard.writeImageSync(payload.content);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unicorn/consistent-function-scoping
    let unsubscribe = () => {
      console.log(`Unsubscribe from ${this.setting.subscriptionUrl}`);
    };

    const syncPromise: Promise<void> = new Promise((resolve, reject) => {
      unsubscribe = client.subscribe(
        {
          query: `
          subscription recordSync {
            recordSync {
              uuid
              deviceId
              profileId
              id
              type
              value
              userId
              createdAt
              deleted
              expired
            }
          }`,
        },
        {
          next: onNext,
          error: reject,
          complete: resolve,
        },
      );
    });
    syncPromise.catch((error) => {
      console.error(error.error);
    });
  }
}
