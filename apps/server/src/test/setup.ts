process.env.NODE_ENV ??= 'test';
process.env.MONGODB_URI ??= 'mongodb://127.0.0.1:27017/test';
process.env.REDIS_URL ??= 'redis://127.0.0.1:6379';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach } from 'vitest';

let mongoMemoryServer: MongoMemoryServer | undefined;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  const uri = mongoMemoryServer.getUri();

  process.env.MONGODB_URI = uri;

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;

  await Promise.all(Object.values(collections).map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoMemoryServer?.stop();
});
