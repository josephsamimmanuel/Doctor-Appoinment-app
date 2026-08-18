export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponseBody<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  pagination?: PaginationMeta;
}

export class ApiResponse<T> {
  readonly success = true as const;

  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: T,
    public readonly pagination?: PaginationMeta,
  ) {}

  toJSON(): ApiResponseBody<T> {
    const body: ApiResponseBody<T> = {
      success: true,
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };

    if (this.pagination !== undefined) {
      body.pagination = this.pagination;
    }

    return body;
  }
}
