import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ApiError, ApiResponse } from '@repo/shared/types';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/v1';

/** Strips the server's success envelope so endpoints expose `data` directly. */
export function unwrapApiData<TData>(response: ApiResponse<TData>): TData {
  return response.data;
}

/** Narrows an RTK Query error payload to the server's error envelope. */
export function isApiError(payload: unknown): payload is ApiError {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    (payload as Partial<ApiError>).success === false &&
    typeof (payload as Partial<ApiError>).statusCode === 'number'
  );
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [],
  endpoints: () => ({}),
});
