import mongoose from 'mongoose';
import { describe, expect, it } from 'vitest';

import { connectMongoDB, disconnectMongoDB, getMongoStatus } from '../db.js';

describe('db config', () => {
  it('reports connected while mongoose is active', () => {
    expect(getMongoStatus()).toBe('connected');
  });

  it('connects when mongoose is already connected', async () => {
    await expect(connectMongoDB()).resolves.toBeUndefined();
    expect(getMongoStatus()).toBe('connected');
  });

  it('disconnects cleanly and skips repeat disconnects', async () => {
    await disconnectMongoDB();
    expect(getMongoStatus()).toBe('disconnected');

    await expect(disconnectMongoDB()).resolves.toBeUndefined();

    const mongodbUri = process.env.MONGODB_URI;
    if (mongodbUri === undefined) {
      throw new Error('MONGODB_URI is required for db tests');
    }

    await mongoose.connect(mongodbUri);
    expect(getMongoStatus()).toBe('connected');
  });
});
