import { describe, expect, it } from 'vitest';

import { ApiError } from '../apiError.js';

describe('ApiError', () => {
  it('serializes a basic error body', () => {
    const error = new ApiError(400, 'Bad request');

    expect(error.toJSON()).toEqual({
      success: false,
      statusCode: 400,
      message: 'Bad request',
    });
  });

  it('includes field errors when provided', () => {
    const error = new ApiError(422, 'Validation failed', [
      { field: 'email', message: 'Invalid email' },
    ]);

    expect(error.toJSON()).toEqual({
      success: false,
      statusCode: 422,
      message: 'Validation failed',
      errors: [{ field: 'email', message: 'Invalid email' }],
    });
  });

  it('omits empty field errors and includes stack when requested', () => {
    const error = new ApiError(500, 'Server error', []);

    expect(error.toJSON()).toEqual({
      success: false,
      statusCode: 500,
      message: 'Server error',
    });

    expect(error.toJSON(true).stack).toEqual(expect.any(String));
  });
});
