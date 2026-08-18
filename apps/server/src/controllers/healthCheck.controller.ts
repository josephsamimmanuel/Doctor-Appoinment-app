import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';

interface HealthCheckData {
  status: 'ok';
  timestamp: string;
  uptime: number;
}

export function healthCheck(_req: Request, res: Response): void {
  const data: HealthCheckData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  const response = new ApiResponse(200, 'Server is healthy', data);

  res.status(response.statusCode).json(response.toJSON());
}
