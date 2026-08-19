import { HTTP_STATUS } from '@repo/shared/constants';
import type { Request, Response } from 'express';
import { getMongoStatus } from '../config/db.js';
import { getRedisStatus } from '../config/redis.js';
import { ApiResponse } from '../utils/apiResponse.js';

interface HealthCheckData {
  status: 'ok';
  timestamp: string;
  uptime: number;
  db: 'connected' | 'disconnected';
  redis: 'connected' | 'disconnected';
}

export function healthCheck(_req: Request, res: Response): void {
  const data: HealthCheckData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    db: getMongoStatus(),
    redis: getRedisStatus(),
  };

  const response = new ApiResponse(HTTP_STATUS.OK, 'Server is healthy', data);

  res.status(response.statusCode).json(response.toJSON());
}
