import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(
    new ApiError(
      404,
      `Route not found: ${req.method} ${req.originalUrl}`,
    ),
  );
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.toJSON(!env.isProduction));
    return;
  }

  console.error('[errorHandler]', err);

  const apiError = new ApiError(
    500,
    'Internal server error',
    undefined,
    false,
  );

  res.status(apiError.statusCode).json(apiError.toJSON(!env.isProduction));
}
