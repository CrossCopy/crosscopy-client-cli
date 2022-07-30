import {requests as req} from '@crosscopy/graphql-schema';
import {plugin, db} from '@crosscopy/core';
import clipboard from 'clipboardy';

export const syncDownload = async (
  idMapping: (req.IdMapping | null)[],
  newRecords: (req.Rec | req.Rec | null)[],
  pluginManager: plugin.PluginManager,
  dbService: db.DBService,
): Promise<void> => {
  const decryptPromises = newRecords
    .filter((rec_) => rec_)
    .map((rec) => {
      return pluginManager.download(rec!.value);
    });
  const decrypted = await Promise.all(decryptPromises);

  for (const [i, rec] of newRecords.entries()) {
    if (rec) {
      rec.value = decrypted[i];
    }
  }

  const createRecordPromise = newRecords
    .filter((rec) => rec)
    .map((rec) =>
      dbService.createRec({
        id: rec!.id,
        uuid: rec!.uuid,
        createdAt: rec!.createdAt,
        device: rec!.device,
        profile: rec!.profile,
        type: rec!.type as unknown as req.RecordType,
        userId: rec!.userId,
        value: rec!.value,
        expired: rec!.expired,
        deleted: rec!.deleted,
      }),
    );
  await Promise.all(createRecordPromise);
  console.log('Sync Success');
  console.log(`Downloaded ${newRecords.length} Records`);

  const updateDbIdPromise = idMapping
    .filter((pair) => pair)
    .map((pair) => dbService.setDbId(pair!.uuid, pair!.id));
  await Promise.all(updateDbIdPromise);
  console.log(`Uploaded ${idMapping.length} Records, Database ID Assigned`);

  // write latest record to clipboard
  const lastRec2 = await dbService.selectLastRecord();
  if (lastRec2) {
    clipboard.writeSync(lastRec2.value);
  }
};
