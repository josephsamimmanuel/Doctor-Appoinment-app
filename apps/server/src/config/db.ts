import mongoose from 'mongoose';
import { env } from './env.js';

export type ConnectionStatus = 'connected' | 'disconnected';

const MAX_RETRIES = 3;
const BACKOFF_MS = [1000, 2000, 4000] as const;
const SERVER_SELECTION_TIMEOUT_MS = 5000;

let listenersRegistered = false;

function registerConnectionListeners(): void {
  if (listenersRegistered) {
    return;
  }

  listenersRegistered = true;

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (error: Error) => {
    console.error('MongoDB connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function connectMongoDB(): Promise<void> {
  registerConnectionListeners();

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      await mongoose.connect(env.mongodbUri, {
        serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
      });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (attempt < MAX_RETRIES) {
        const delayMs = BACKOFF_MS[attempt] ?? BACKOFF_MS.at(-1) ?? 4000;
        console.warn(
          `MongoDB connection attempt ${attempt + 1}/${MAX_RETRIES + 1} failed: ${message}. Retrying in ${delayMs}ms...`,
        );
        await sleep(delayMs);
        continue;
      }

      console.error(`MongoDB is unreachable after ${MAX_RETRIES} retries: ${message}`);
      throw error;
    }
  }
}

export async function disconnectMongoDB(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
}

export function getMongoStatus(): ConnectionStatus {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
}
