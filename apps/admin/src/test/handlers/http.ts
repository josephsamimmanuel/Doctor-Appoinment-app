import type { ApiError, ApiResponse, PaginationMeta } from '@repo/shared/types';
import { HttpResponse } from 'msw';

export function apiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/v1';
}

export function successResponse<TData>(
  statusCode: number,
  message: string,
  data: TData,
  pagination?: PaginationMeta,
) {
  const body: ApiResponse<TData> = {
    success: true,
    statusCode,
    message,
    data,
  };

  if (pagination !== undefined) {
    body.pagination = pagination;
  }

  return HttpResponse.json(body, { status: statusCode });
}

export function errorResponse(
  statusCode: number,
  message: string,
  errors?: ApiError['errors'],
) {
  const body: ApiError = {
    success: false,
    statusCode,
    message,
  };

  if (errors !== undefined && errors.length > 0) {
    body.errors = errors;
  }

  return HttpResponse.json(body, { status: statusCode });
}

export function extractBearerToken(request: Request): string | null {
  const authorization = request.headers.get('Authorization');

  if (authorization === null || !authorization.startsWith('Bearer ')) {
    return null;
  }

  return authorization.slice('Bearer '.length);
}
