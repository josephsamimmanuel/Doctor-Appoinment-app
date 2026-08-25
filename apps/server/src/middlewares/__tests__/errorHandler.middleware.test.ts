import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';

import { HTTP_STATUS } from '@repo/shared/constants';

import { ApiError } from '../../utils/apiError.js';
import { errorHandler, notFoundHandler } from '../errorHandler.middleware.js';

function createMockResponse() {
  const json = vi.fn();
  const status = vi.fn().mockReturnValue({ json });

  return { json, status, res: { status } as unknown as Response };
}

describe('errorHandler middleware', () => {
  it('passes a not-found ApiError to next', () => {
    const next = vi.fn<Parameters<NextFunction>, ReturnType<NextFunction>>();

    notFoundHandler(
      { method: 'GET', originalUrl: '/api/v1/missing' } as Request,
      {} as Response,
      next,
    );

    expect(next).toHaveBeenCalledOnce();
    expect(next.mock.calls[0]?.[0]).toBeInstanceOf(ApiError);
    expect((next.mock.calls[0]?.[0] as ApiError).statusCode).toBe(HTTP_STATUS.NOT_FOUND);
  });

  it('responds with operational ApiError details', () => {
    const { status, json, res } = createMockResponse();
    const error = new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid payload', [
      { field: 'email', message: 'Required' },
    ]);

    errorHandler(error, {} as Request, res, vi.fn());

    expect(status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid payload',
        errors: [{ field: 'email', message: 'Required' }],
      }),
    );
  });

  it('responds with a generic 500 for unknown errors', () => {
    const { status, json, res } = createMockResponse();

    errorHandler(new Error('Unexpected failure'), {} as Request, res, vi.fn());

    expect(status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }),
    );
  });
});
