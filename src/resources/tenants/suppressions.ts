// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Suppressions extends APIResource {
  /**
   * Add an email address to the tenant's suppression list. The address will not
   * receive any emails from this tenant until removed.
   *
   * @example
   * ```ts
   * const suppression =
   *   await client.tenants.suppressions.create(
   *     'cm6abc123def456',
   *     {
   *       address: 'user@example.com',
   *       reason: 'user requested removal',
   *     },
   *   );
   * ```
   */
  create(
    tenantID: string,
    body: SuppressionCreateParams,
    options?: RequestOptions,
  ): APIPromise<SuppressionCreateResponse> {
    return this._client.post(path`/tenants/${tenantID}/suppressions`, { body, ...options });
  }

  /**
   * Check if a specific email address is on the tenant's suppression list.
   *
   * @example
   * ```ts
   * const suppression =
   *   await client.tenants.suppressions.retrieve(
   *     'user@example.com',
   *     { tenantId: 'cm6abc123def456' },
   *   );
   * ```
   */
  retrieve(
    email: string,
    params: SuppressionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<SuppressionRetrieveResponse> {
    const { tenantId } = params;
    return this._client.get(path`/tenants/${tenantId}/suppressions/${email}`, options);
  }

  /**
   * Get all email addresses on the tenant's suppression list. These addresses will
   * not receive any emails from this tenant.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const suppressionListResponse of client.tenants.suppressions.list(
   *   'cm6abc123def456',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    tenantID: string,
    query: SuppressionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SuppressionListResponsesPageNumberPagination, SuppressionListResponse> {
    return this._client.getAPIList(
      path`/tenants/${tenantID}/suppressions`,
      PageNumberPagination<SuppressionListResponse>,
      { query, ...options },
    );
  }

  /**
   * Remove an email address from the tenant's suppression list. The address will be
   * able to receive emails from this tenant again.
   *
   * @example
   * ```ts
   * const suppression =
   *   await client.tenants.suppressions.delete(
   *     'user@example.com',
   *     { tenantId: 'cm6abc123def456' },
   *   );
   * ```
   */
  delete(
    email: string,
    params: SuppressionDeleteParams,
    options?: RequestOptions,
  ): APIPromise<SuppressionDeleteResponse> {
    const { tenantId } = params;
    return this._client.delete(path`/tenants/${tenantId}/suppressions/${email}`, options);
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

export interface SuppressionCreateParams {
  /**
   * Email address to suppress
   */
  address: string;

  /**
   * Reason for suppression (accepts null)
   */
  reason?: string | null;
}

export interface SuppressionRetrieveParams {
  /**
   * The tenant ID
   */
  tenantId: string;
}

export interface SuppressionListParams extends PageNumberPaginationParams {}

export interface SuppressionDeleteParams {
  /**
   * The tenant ID
   */
  tenantId: string;
}

export declare namespace Suppressions {
  export {
    type SuppressionCreateResponse as SuppressionCreateResponse,
    type SuppressionRetrieveResponse as SuppressionRetrieveResponse,
    type SuppressionListResponse as SuppressionListResponse,
    type SuppressionDeleteResponse as SuppressionDeleteResponse,
    type SuppressionListResponsesPageNumberPagination as SuppressionListResponsesPageNumberPagination,
    type SuppressionCreateParams as SuppressionCreateParams,
    type SuppressionRetrieveParams as SuppressionRetrieveParams,
    type SuppressionListParams as SuppressionListParams,
    type SuppressionDeleteParams as SuppressionDeleteParams,
  };
}
