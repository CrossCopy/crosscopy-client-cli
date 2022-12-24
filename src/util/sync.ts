import {RecordType, requests as req} from '@crosscopy/graphql-schema';
import {DBService, Rec, RecordCreateInput} from '@crosscopy/core/database';
import {getPayload, PluginManager} from '@crosscopy/core/plugin';
import {stdoutLogger} from './logger';
import clipboard from '@crosscopy/clipboard';
import {v4 as uuidv4} from 'uuid';
import {Mode, Setting} from '../config/setting';
import bytes from 'bytes';
import {reject} from 'lodash';

/**
 * sync downloaded content to local clipboard and database
 * Update newly assigned database id to local records
 * @param idMapping mapping between uuid and id, not synced local records don't have a cloud database id
 * @param newRecords new records from cloud
 * @param deletedRecInfo deleted records from cloud
 * @param pluginManager plugin manager
 * @param dbService local database service
 * @returns Promise<void>
 */
export const syncDownload = async (
  idMapping: (req.IdMapping | null)[],
  newRecords: (req.Rec | req.Rec | null)[],
  deletedRecInfo: (req.DeletedRecordInfo | null)[],
  pluginManager: PluginManager,
  dbService: DBService,
): Promise<void> => {
  const payloads = newRecords
    .filter((rec_) => rec_)
    .map((rec) => getPayload(rec!.type, rec!.value));
  const decodedPayloads = pluginManager.downloadMany(payloads);
  for (const [i, rec] of newRecords.entries()) {
    // assign processed value to records
    if (rec) {
      rec.value = decodedPayloads[i].content;
    }
  }

  // TODO: use query builder to insert multiple records, check login command
  const createRecordPromise = (
    newRecords.filter((rec) => rec) as req.Rec[]
  ).map(async (rec) =>
    dbService.createRec({
      id: rec.id,
      uuid: rec.uuid,
      createdAt: rec.createdAt as string,
      device: await dbService.deviceById(rec.device!.id),
      profile: await dbService.profileById(rec.profile!.id),
      type: rec.type as unknown as req.RecordType,
      value: rec.value,
      expired: rec.expired,
      deleted: rec.deleted,
      insync: 1,
    }),
  );
  await Promise.all(createRecordPromise);
  stdoutLogger.info('Sync Success');
  stdoutLogger.info(`Downloaded ${newRecords.length} Records`);

  const updateNewRecordsPromise = (
    idMapping.filter((pair) => pair) as req.IdMapping[]
  ).map((pair) =>
    dbService.RecRepo.update(pair.uuid, {insync: 1, id: pair.id}),
  );
  await Promise.all(updateNewRecordsPromise);

  stdoutLogger.log(
    `Uploadeded ${idMapping.length} Record(s), Database ID Assigned`,
  );

  // handle deleted records
  await Promise.all(
    (
      deletedRecInfo.filter(
        (deleted) => deleted !== null,
      ) as req.DeletedRecordInfo[]
    ).map((deleted) =>
      dbService.RecRepo.update(
        {deleted: true, deletedAt: deleted.deletedAt},
        {uuid: deleted.uuid},
      ),
    ),
  );

  // write latest record to clipboard
  const lastRec2 = await dbService.selectLastRecord();
  if (lastRec2) {
    if (lastRec2.type === RecordType.Text) {
      if (clipboard.readTextSync() === lastRec2.value) {
        stdoutLogger.warn('Text is unchanged, skip');
      } else {
        clipboard.writeTextSync(lastRec2.value);
      }
    } else if (lastRec2.type === RecordType.Image) {
      if (clipboard.readImageBase64Sync() === lastRec2.value) {
        stdoutLogger.warn('Image is unchanged, skip');
      } else {
        clipboard.writeImageSync(lastRec2.value);
      }
    }
  }
};

// export const syncUpload = (
//   recordsToUpload: req.TextRecInput[],
//   pluginManager: PluginManager,
//   dbService: DBService,
// ): Promise<void> => {

//   return Promise.resolve();
// };

/**
 * Upload text or image to cloud
 * ! Make sure dbService.init has been run (i.e. db path has been initialized)
 * @param recordPayload record payload to upload
 * @param pluginManager plugin manager
 * @param sdk sdk for graphql request
 * @returns Nothing
 */
export const upload = async (
  recordPayload: RecordCreateInput,
  pluginManager: PluginManager,
  sdk: ReturnType<typeof req.getSdk>,
): Promise<req.AddRecordResponse> => {
  const dbService = DBService.instance;
  const payload = getPayload(
    recordPayload.type as RecordType,
    recordPayload.value,
  );
  pluginManager.upload(payload);

  const dataToUpload = payload.content;
  stdoutLogger.info(`Content Size: ${bytes(dataToUpload.length)}`);

  const addedRecord = await sdk.addRecord({
    type: payload.type,
    value: dataToUpload,
    deviceId: recordPayload.device.id,
    profileId: recordPayload.profile.id,
  });

  if (addedRecord.addRecord?.id) {
    await dbService.setDbId(recordPayload.uuid, addedRecord.addRecord?.id);
    await dbService.setInsync(recordPayload.uuid, 1);
  } else {
    reject(new Error('Failed to add record'));
  }

  return Promise.resolve(addedRecord.addRecord as req.AddRecordResponse);
};
