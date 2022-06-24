import {db} from '@crosscopy/core';
import {v4 as uuidv4} from 'uuid';

const {createDataSource, Rec, getRecRepo} = db;

const dataSource = createDataSource('dev.sqlite');
(async () => {
  await dataSource.initialize();
  const RecRepo = getRecRepo(dataSource);
  const createPromise = [1, 2, 3, 4, 5].map((x, idx) =>
    RecRepo.create({value: idx.toString(), uuid: uuidv4()}).save(),
  );

  await Promise.all(createPromise);
  const allRecords = await dataSource.manager.findAndCount(Rec);
  console.log(allRecords);
})();
