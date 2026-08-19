import type { Server } from 'node:http';
import app from './app.js';
import { connectMongoDB, disconnectMongoDB } from './config/db.js';
import { env } from './config/env.js';
import { connectRedis, disconnectRedis } from './config/redis.js';

let server: Server | undefined;
let isShuttingDown = false;

async function start(): Promise<void> {
  try {
    await connectMongoDB();
    await connectRedis();

    server = app.listen(env.port, () => {
      console.log(`Server listening on http://localhost:${env.port}`);
    });

    process.on('SIGINT', () => {
      void shutdown('SIGINT');
    });
    process.on('SIGTERM', () => {
      void shutdown('SIGTERM');
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to start server:', message);
    process.exit(1);
  }
}

async function shutdown(signal: string): Promise<void> {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}, shutting down gracefully...`);

  const closeHttpServer = (): Promise<void> =>
    new Promise((resolve, reject) => {
      if (server === undefined) {
        resolve();
        return;
      }

      server.close((error) => {
        if (error !== undefined) {
          reject(error);
          return;
        }

        resolve();
      });
    });

  try {
    await closeHttpServer();
    await disconnectMongoDB();
    await disconnectRedis();
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error during shutdown:', message);
    process.exit(1);
  }
}

void start();
