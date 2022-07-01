import {Command} from '@oclif/core';
import {requests, operations as ops} from '@crosscopy/graphql-schema';
import {AuthConfig, SettingConfig} from '../config';
import {SocketIOService} from '@crosscopy/core';
import {db} from '@crosscopy/core';
import getCbListener from '../util/clipboard-monitor';
import {v4 as uuidv4} from 'uuid';
import {generatePluginManager} from '../util/plugin';
import {IsNull} from 'typeorm';
import {syncDownload} from '../util/sync';

export default class Listen extends Command {
  static description = 'Realtime Syncing';
  setting = new SettingConfig(this.config.configDir);
  auth = new AuthConfig(this.config.configDir);
  dbService = db.DBService.instance;

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
    if (!this.auth.accessToken) return this.error('Not Authenticated');
    await this.dbService.init(this.setting.dbPath);
    const socketioUrl = this.setting.socketioUrl;
    if (!this.auth.passwordHash)
      throw new Error('No Decryption Key Found, Please Login Again');
    const pluginManager = await generatePluginManager(this.auth.passwordHash);
    this.log(`connecting to ${socketioUrl}`);
    const allUUIDs = (
      await this.dbService.RecRepo.find({
        select: ['uuid'],
      })
    ).map((rec) => rec.uuid);
    const clientSideOnlyRecords = await this.dbService.RecRepo.find({
      // eslint-disable-next-line new-cap
      where: {id: IsNull()},
    });

    const clientSideOnlyRecords2 = clientSideOnlyRecords.map((rec) => ({
      uuid: rec.uuid,
      createdAt: rec.createdAt,
      device: rec.device,
      profile: rec.profile,
      type: rec.type,
      userId: rec.userId,
      value: rec.value,
    })) as ops.TextRecInput[];

    SocketIOService.instance
      .init(this.setting.socketioUrl, '/crosscopy/ws/', this.auth.accessToken)
      .connect(allUUIDs, clientSideOnlyRecords2)
      .on('init', async (syncResponse: requests.SyncResponse) => {
        // this.log('init');
        // console.log(records);
        // console.log(latestInUserIds);
        console.log(syncResponse);
        const {idMapping, newRecords} = syncResponse;
        console.log(idMapping);
        console.log(newRecords);
        if (idMapping === undefined || newRecords === undefined) {
          this.log('Sync Error on Server Side, Probably Duplicate Key');
          // exit(1);
        } else {
          await syncDownload(
            idMapping,
            newRecords as requests.Rec[],
            pluginManager,
            this.dbService,
          );
        }
      })
      .on('notification', this.onNotification)
      .on('deleted', this.onDelete)
      .on('uploaded', async (record: ops.Rec) => {
        record.value = await pluginManager.download(record.value);
        const newRecord = await db.DBService.instance.RecRepo.save(record);
        console.log('onUpload');
        console.log(newRecord);
      })
      .on('updated', this.onUpdate);

    const cbListener = getCbListener();
    // this.log('Start Clipboard Listener');
    cbListener.listen(
      this.dbService,
      async (content) => {
        const uuid = uuidv4();
        const record = await this.dbService.createRec({
          value: content,
          uuid: uuid,
        });
        console.log('clipboard content updated');
        record.value = await pluginManager.upload(record.value);
        SocketIOService.instance.socket?.emit(
          'upload',
          record as ops.TextRecInput,
        );
      },
      500,
    );
  }
}
