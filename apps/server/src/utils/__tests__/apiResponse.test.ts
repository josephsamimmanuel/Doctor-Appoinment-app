import { describe, expect, it } from 'vitest';

import { ApiResponse } from '../apiResponse.js';

describe('ApiResponse', () => {
  it('serializes a success payload', () => {
    const response = new ApiResponse(200, 'OK', { status: 'ok' });

    expect(response.toJSON()).toEqual({
      success: true,
      statusCode: 200,
      message: 'OK',
      data: { status: 'ok' },
    });
  });

  it('includes pagination metadata when provided', () => {
    const response = new ApiResponse(200, 'OK', [], {
      page: 1,
      limit: 10,
      total: 25,
      totalPages: 3,
    });

    expect(response.toJSON()).toEqual({
      success: true,
      statusCode: 200,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 25, totalPages: 3 },
    });
  });
});
