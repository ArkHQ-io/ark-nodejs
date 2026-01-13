// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Suppressions extends APIResource {
  /**
   * Add an email address to the suppression list. The address will not receive any
   * emails until removed.
   *
   * @example
   * ```ts
   * const suppression = await client.suppressions.create({
   *   address: 'user@example.com',
   *   reason: 'user requested removal',
   * });
   * ```
   */
  create(body: SuppressionCreateParams, options?: RequestOptions): APIPromise<SuppressionCreateResponse> {
    return this._client.post('/suppressions', { body, ...options });
  }

  /**
   * Check if a specific email address is on the suppression list
   *
   * @example
   * ```ts
   * const suppression = await client.suppressions.retrieve(
   *   'dev@stainless.com',
   * );
   * ```
   */
  retrieve(email: string, options?: RequestOptions): APIPromise<SuppressionRetrieveResponse> {
    return this._client.get(path`/suppressions/${email}`, options);
  }

  /**
   * Get all email addresses on the suppression list. These addresses will not
   * receive any emails.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const suppressionListResponse of client.suppressions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: SuppressionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SuppressionListResponsesPageNumberPagination, SuppressionListResponse> {
    return this._client.getAPIList('/suppressions', PageNumberPagination<SuppressionListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Remove an email address from the suppression list. The address will be able to
   * receive emails again.
   *
   * @example
   * ```ts
   * const suppression = await client.suppressions.delete(
   *   'dev@stainless.com',
   * );
   * ```
   */
  delete(email: string, options?: RequestOptions): APIPromise<SuppressionDeleteResponse> {
    return this._client.delete(path`/suppressions/${email}`, options);
  }

  /**
   * Add up to 1000 email addresses to the suppression list at once
   *
   * @example
   * ```ts
   * const response = await client.suppressions.bulkCreate({
   *   suppressions: [{ address: 'dev@stainless.com' }],
   * });
   * ```
   */
  bulkCreate(
    body: SuppressionBulkCreateParams,
    options?: RequestOptions,
  ): APIPromise<SuppressionBulkCreateResponse> {
    return this._client.post('/suppressions/bulk', { body, ...options });
  }
}

export type SuppressionListResponsesPageNumberPagination = PageNumberPagination<SuppressionListResponse>;

export interface SuppressionCreateResponse {
  data: SuppressionCreateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace SuppressionCreateResponse {
  export interface Data {
    /**
     * Suppression ID
     */
    id: string;

    address: string;

    createdAt: string;

    /**
     * Reason for suppression
     */
    reason?: string;
  }
}

export interface SuppressionRetrieveResponse {
  data: SuppressionRetrieveResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace SuppressionRetrieveResponse {
  export interface Data {
    /**
     * The email address that was checked
     */
    address: string;

    /**
     * Whether the address is currently suppressed
     */
    suppressed: boolean;

    /**
     * When the suppression was created (if suppressed)
     */
    createdAt?: string | null;

    /**
     * Reason for suppression (if suppressed)
     */
    reason?: string | null;
  }
}

export interface SuppressionListResponse {
  /**
   * Suppression ID
   */
  id: string;

  address: string;

  createdAt: string;

  reason?: string;
}

export interface SuppressionDeleteResponse {
  data: SuppressionDeleteResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace SuppressionDeleteResponse {
  export interface Data {
    message: string;
  }
}

export interface SuppressionBulkCreateResponse {
  data: SuppressionBulkCreateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace SuppressionBulkCreateResponse {
  export interface Data {
    /**
     * Newly suppressed addresses
     */
    added: number;

    /**
     * Invalid addresses skipped
     */
    failed: number;

    /**
     * Total addresses in request
     */
    totalRequested: number;

    /**
     * Already suppressed addresses (updated reason)
     */
    updated: number;
  }
}

export interface SuppressionCreateParams {
  /**
   * Email address to suppress
   */
  address: string;

  /**
   * Reason for suppression
   */
  reason?: string;
}

export interface SuppressionListParams extends PageNumberPaginationParams {}

export interface SuppressionBulkCreateParams {
  suppressions: Array<SuppressionBulkCreateParams.Suppression>;
}

export namespace SuppressionBulkCreateParams {
  export interface Suppression {
    address: string;

    reason?: string;
  }
}

export declare namespace Suppressions {
  export {
    type SuppressionCreateResponse as SuppressionCreateResponse,
    type SuppressionRetrieveResponse as SuppressionRetrieveResponse,
    type SuppressionListResponse as SuppressionListResponse,
    type SuppressionDeleteResponse as SuppressionDeleteResponse,
    type SuppressionBulkCreateResponse as SuppressionBulkCreateResponse,
    type SuppressionListResponsesPageNumberPagination as SuppressionListResponsesPageNumberPagination,
    type SuppressionCreateParams as SuppressionCreateParams,
    type SuppressionListParams as SuppressionListParams,
    type SuppressionBulkCreateParams as SuppressionBulkCreateParams,
  };
}
