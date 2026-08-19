/**
 * Wire-format contracts shared by the API and both frontends.
 *
 * Identifiers and dates are always `string` here: these types describe JSON
 * crossing the network, so they must stay free of Mongoose/BSON constructs.
 */

export type ObjectIdString = string;

/** ISO 8601 timestamp, e.g. `2026-08-19T08:00:00.000Z`. */
export type IsoDateTimeString = string;

/** Calendar date without a time component, e.g. `2026-08-19`. */
export type IsoDateString = string;

/** 24-hour clock time, e.g. `09:30`. */
export type TimeString = string;

export interface Timestamps {
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

export type DayOfWeek =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface TimeRange {
  start: TimeString;
  end: TimeString;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiResponse<TData> {
  success: true;
  statusCode: number;
  message: string;
  data: TData;
  pagination?: PaginationMeta;
}

export interface PaginatedResponse<TItem> extends ApiResponse<TItem[]> {
  pagination: PaginationMeta;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  errors?: FieldError[];
  stack?: string;
}

export type ApiResult<TData> = ApiResponse<TData> | ApiError;
