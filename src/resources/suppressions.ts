// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DomainsAPI from './domains';
import * as EmailsAPI from './emails';
import * as TrackingAPI from './tracking';
import { APIPromise } from '../core/api-promise';
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
   * const suppressions = await client.suppressions.list();
   * ```
   */
  list(
    query: SuppressionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SuppressionListResponse> {
    return this._client.get('/suppressions', { query, ...options });
  }

  /**
   * Remove an email address from the suppression list. The address will be able to
   * receive emails again.
   *
   * @example
   * ```ts
   * const successResponse = await client.suppressions.delete(
   *   'dev@stainless.com',
   * );
   * ```
   */
  delete(email: string, options?: RequestOptions): APIPromise<DomainsAPI.SuccessResponse> {
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

export interface SuppressionCreateResponse {
  data: SuppressionCreateResponse.Data;

  meta: TrackingAPI.APIMeta;

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
  data?: SuppressionRetrieveResponse.Data;

  success?: boolean;
}

export namespace SuppressionRetrieveResponse {
  export interface Data {
    address?: string;

    createdAt?: string | null;

    reason?: string | null;

    suppressed?: boolean;
  }
}

export interface SuppressionListResponse {
  data: SuppressionListResponse.Data;

  meta: TrackingAPI.APIMeta;

  success: true;
}

export namespace SuppressionListResponse {
  export interface Data {
    pagination: EmailsAPI.Pagination;

    suppressions: Array<Data.Suppression>;
  }

  export namespace Data {
    export interface Suppression {
      /**
       * Suppression ID
       */
      id: string;

      address: string;

      createdAt: string;

      reason?: string;
    }
  }
}

export interface SuppressionBulkCreateResponse {
  data: SuppressionBulkCreateResponse.Data;

  meta: TrackingAPI.APIMeta;

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

export interface SuppressionListParams {
  page?: number;

  perPage?: number;
}

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
    type SuppressionBulkCreateResponse as SuppressionBulkCreateResponse,
    type SuppressionCreateParams as SuppressionCreateParams,
    type SuppressionListParams as SuppressionListParams,
    type SuppressionBulkCreateParams as SuppressionBulkCreateParams,
  };
}
