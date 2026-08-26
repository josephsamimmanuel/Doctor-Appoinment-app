import type { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

import { ApiError } from '../utils/apiError.js';

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (_req: Request, res: Response) => {
    const error = new ApiError(429, 'Too many requests, please try again later.');

    res.status(error.statusCode).json(error.toJSON());
  },
});
