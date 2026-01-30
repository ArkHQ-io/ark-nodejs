// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Logs extends APIResource {
  /**
   * Retrieve detailed information about a specific API request log, including the
   * full request and response bodies.
   *
   * **Body decryption:** Request and response bodies are stored encrypted and
   * automatically decrypted when retrieved. Bodies larger than 25KB are truncated at
   * storage time with a `... [truncated]` marker.
   *
   * **Use cases:**
   *
   * - Debug a specific failed request
   * - Review the exact payload sent/received
   * - Share request details with support
   *
   * **Related endpoints:**
   *
   * - `GET /logs` - List logs with filters
   *
   * @example
   * ```ts
   * const log = await client.logs.retrieve(
   *   'req_V8GGcdWYzgeWIHiI',
   * );
   * ```
   */
  retrieve(requestID: string, options?: RequestOptions): APIPromise<LogRetrieveResponse> {
    return this._client.get(path`/logs/${requestID}`, options);
  }

  /**
   * Retrieve a paginated list of API request logs for debugging and monitoring.
   * Results are ordered by timestamp, newest first.
   *
   * **Use cases:**
   *
   * - Debug integration issues by reviewing recent requests
   * - Monitor error rates and response times
   * - Audit API usage patterns
   *
   * **Filters:**
   *
   * - `status` - Filter by success or error category
   * - `statusCode` - Filter by exact HTTP status code
   * - `endpoint` - Filter by endpoint name (e.g., `emails.send`)
   * - `credentialId` - Filter by API key
   * - `startDate`/`endDate` - Filter by date range
   *
   * **Note:** Request and response bodies are only included when retrieving a single
   * log entry with `GET /logs/{requestId}`.
   *
   * **Related endpoints:**
   *
   * - `GET /logs/{requestId}` - Get full log details with request/response bodies
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const logEntry of client.logs.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: LogListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<LogEntriesPageNumberPagination, LogEntry> {
    return this._client.getAPIList('/logs', PageNumberPagination<LogEntry>, { query, ...options });
  }
}

export type LogEntriesPageNumberPagination = PageNumberPagination<LogEntry>;

/**
 * API request log entry (list view)
 */
export interface LogEntry {
  /**
   * Request context information
   */
  context: LogEntry.Context;

  /**
   * API credential information
   */
  credential: LogEntry.Credential;

  /**
   * Request duration in milliseconds
   */
  durationMs: number;

  /**
   * Semantic endpoint name
   */
  endpoint: string;

  /**
   * HTTP method
   */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  /**
   * Request path
   */
  path: string;

  /**
   * Rate limit state at time of request
   */
  rateLimit: LogEntry.RateLimit;

  /**
   * Unique request identifier
   */
  requestId: string;

  /**
   * HTTP response status code
   */
  statusCode: number;

  /**
   * When the request was made (ISO 8601)
   */
  timestamp: string;

  /**
   * Email-specific data (for email endpoints)
   */
  email?: LogEntry.Email | null;

  /**
   * Error details (null if request succeeded)
   */
  error?: LogEntry.Error | null;

  /**
   * SDK information (null if not using an SDK)
   */
  sdk?: LogEntry.SDK | null;
}

export namespace LogEntry {
  /**
   * Request context information
   */
  export interface Context {
    /**
     * Idempotency key if provided
     */
    idempotencyKey?: string | null;

    /**
     * Client IP address
     */
    ipAddress?: string | null;

    /**
     * Query parameters
     */
    queryParams?: { [key: string]: unknown } | null;

    /**
     * User-Agent header
     */
    userAgent?: string | null;
  }

  /**
   * API credential information
   */
  export interface Credential {
    /**
     * Credential ID
     */
    id: string;

    /**
     * API key prefix (first 8 characters)
     */
    keyPrefix?: string | null;
  }

  /**
   * Rate limit state at time of request
   */
  export interface RateLimit {
    /**
     * Rate limit ceiling
     */
    limit?: number | null;

    /**
     * Whether the request was rate limited
     */
    limited?: boolean;

    /**
     * Remaining requests in window
     */
    remaining?: number | null;

    /**
     * Unix timestamp when limit resets
     */
    reset?: number | null;
  }

  /**
   * Email-specific data (for email endpoints)
   */
  export interface Email {
    /**
     * Email message ID
     */
    id?: string;

    /**
     * Number of recipients
     */
    recipientCount?: number | null;
  }

  /**
   * Error details (null if request succeeded)
   */
  export interface Error {
    /**
     * Error code
     */
    code?: string;

    /**
     * Error message
     */
    message?: string | null;
  }

  /**
   * SDK information (null if not using an SDK)
   */
  export interface SDK {
    /**
     * SDK name
     */
    name?: string;

    /**
     * SDK version
     */
    version?: string | null;
  }
}

/**
 * Full API request log entry with bodies
 */
export interface LogEntryDetail extends LogEntry {
  /**
   * Request body information
   */
  request?: LogEntryDetail.Request;

  /**
   * Response body information
   */
  response?: LogEntryDetail.Response;
}

export namespace LogEntryDetail {
  /**
   * Request body information
   */
  export interface Request {
    /**
     * Decrypted request body (JSON or string). Bodies over 25KB are truncated.
     */
    body?: { [key: string]: unknown } | string | null;

    /**
     * Original request body size in bytes
     */
    bodySize?: number | null;
  }

  /**
   * Response body information
   */
  export interface Response {
    /**
     * Decrypted response body (JSON or string). Bodies over 25KB are truncated.
     */
    body?: { [key: string]: unknown } | string | null;

    /**
     * Response body size in bytes
     */
    bodySize?: number | null;
  }
}

/**
 * Detailed API request log with request/response bodies
 */
export interface LogRetrieveResponse {
  /**
   * Full API request log entry with bodies
   */
  data: LogEntryDetail;

  meta: Shared.APIMeta;

  success: true;
}

export interface LogListParams extends PageNumberPaginationParams {
  /**
   * Filter by API credential ID
   */
  credentialId?: string;

  /**
   * Filter logs before this date (ISO 8601 format)
   */
  endDate?: string;

  /**
   * Filter by endpoint name
   */
  endpoint?: string;

  /**
   * Filter by request ID (partial match)
   */
  requestId?: string;

  /**
   * Filter logs after this date (ISO 8601 format)
   */
  startDate?: string;

  /**
   * Filter by status category:
   *
   * - `success` - Status codes < 400
   * - `error` - Status codes >= 400
   */
  status?: 'success' | 'error';

  /**
   * Filter by exact HTTP status code (100-599)
   */
  statusCode?: number;
}

export declare namespace Logs {
  export {
    type LogEntry as LogEntry,
    type LogEntryDetail as LogEntryDetail,
    type LogRetrieveResponse as LogRetrieveResponse,
    type LogEntriesPageNumberPagination as LogEntriesPageNumberPagination,
    type LogListParams as LogListParams,
  };
}
