export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorBody {
  success: false;
  statusCode: number;
  message: string;
  errors?: FieldError[];
  stack?: string;
}

export class ApiError extends Error {
  readonly success = false as const;

  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errors?: FieldError[],
    public readonly isOperational = true,
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(includeStack = false): ApiErrorBody {
    const body: ApiErrorBody = {
      success: false,
      statusCode: this.statusCode,
      message: this.message,
    };

    if (this.errors !== undefined && this.errors.length > 0) {
      body.errors = this.errors;
    }

    if (includeStack && this.stack !== undefined) {
      body.stack = this.stack;
    }

    return body;
  }
}
