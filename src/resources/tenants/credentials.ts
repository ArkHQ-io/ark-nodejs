// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Credentials extends APIResource {
  /**
   * Create a new SMTP or API credential for a tenant. The credential can be used to
   * send emails via Ark on behalf of the tenant.
   *
   * **Important:** The credential key is only returned once at creation time. Store
   * it securely - you cannot retrieve it again.
   *
   * **Credential Types:**
   *
   * - `smtp` - For SMTP-based email sending. Returns both `key` and `smtpUsername`.
   * - `api` - For API-based email sending. Returns only `key`.
   *
   * @example
   * ```ts
   * const credential = await client.tenants.credentials.create(
   *   'cm6abc123def456',
   *   { name: 'production-smtp', type: 'smtp' },
   * );
   * ```
   */
  create(
    tenantID: string,
    body: CredentialCreateParams,
    options?: RequestOptions,
  ): APIPromise<CredentialCreateResponse> {
    return this._client.post(path`/tenants/${tenantID}/credentials`, { body, ...options });
  }

  /**
   * Get details of a specific credential.
   *
   * **Revealing the key:** By default, the credential key is not returned. Pass
   * `reveal=true` to include the key in the response. Use this sparingly and only
   * when you need to retrieve the key (e.g., for configuration).
   *
   * @example
   * ```ts
   * const credential =
   *   await client.tenants.credentials.retrieve(123, {
   *     tenantId: 'cm6abc123def456',
   *   });
   * ```
   */
  retrieve(
    credentialID: number,
    params: CredentialRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CredentialRetrieveResponse> {
    const { tenantId, ...query } = params;
    return this._client.get(path`/tenants/${tenantId}/credentials/${credentialID}`, { query, ...options });
  }

  /**
   * Update a credential's name or hold status.
   *
   * **Hold Status:**
   *
   * - When `hold: true`, the credential is disabled and cannot be used to send
   *   emails.
   * - When `hold: false`, the credential is active and can send emails.
   * - Use this to temporarily disable a credential without deleting it.
   *
   * @example
   * ```ts
   * const credential = await client.tenants.credentials.update(
   *   123,
   *   {
   *     tenantId: 'cm6abc123def456',
   *     name: 'production-smtp-v2',
   *   },
   * );
   * ```
   */
  update(
    credentialID: number,
    params: CredentialUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CredentialUpdateResponse> {
    const { tenantId, ...body } = params;
    return this._client.patch(path`/tenants/${tenantId}/credentials/${credentialID}`, { body, ...options });
  }

  /**
   * List all SMTP and API credentials for a tenant. Credentials are used to send
   * emails via Ark on behalf of the tenant.
   *
   * **Security:** Credential keys are not returned in the list response. Use the
   * retrieve endpoint with `reveal=true` to get the key.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const credentialListResponse of client.tenants.credentials.list(
   *   'cm6abc123def456',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    tenantID: string,
    query: CredentialListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CredentialListResponsesPageNumberPagination, CredentialListResponse> {
    return this._client.getAPIList(
      path`/tenants/${tenantID}/credentials`,
      PageNumberPagination<CredentialListResponse>,
      { query, ...options },
    );
  }

  /**
   * Permanently delete (revoke) a credential. The credential can no longer be used
   * to send emails.
   *
   * **Warning:** This action is irreversible. If you want to temporarily disable a
   * credential, use the update endpoint to set `hold: true` instead.
   *
   * @example
   * ```ts
   * const credential = await client.tenants.credentials.delete(
   *   123,
   *   { tenantId: 'cm6abc123def456' },
   * );
   * ```
   */
  delete(
    credentialID: number,
    params: CredentialDeleteParams,
    options?: RequestOptions,
  ): APIPromise<CredentialDeleteResponse> {
    const { tenantId } = params;
    return this._client.delete(path`/tenants/${tenantId}/credentials/${credentialID}`, options);
  }
}

export type CredentialListResponsesPageNumberPagination = PageNumberPagination<CredentialListResponse>;

export interface CredentialCreateResponse {
  data: CredentialCreateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace CredentialCreateResponse {
  export interface Data {
    /**
     * Unique identifier for the credential
     */
    id: number;

    /**
     * When the credential was created
     */
    createdAt: string;

    /**
     * Whether the credential is on hold (disabled). When `true`, the credential cannot
     * be used to send emails.
     */
    hold: boolean;

    /**
     * The credential key (secret). **Store this securely** - it will not be shown
     * again unless you use the reveal parameter.
     */
    key: string;

    /**
     * When the credential was last used to send an email
     */
    lastUsedAt: string | null;

    /**
     * Name of the credential
     */
    name: string;

    /**
     * Type of credential:
     *
     * - `smtp` - For SMTP-based email sending
     * - `api` - For API-based email sending
     */
    type: 'smtp' | 'api';

    /**
     * When the credential was last updated
     */
    updatedAt: string;

    /**
     * SMTP username for authentication. Only included for SMTP credentials. Format:
     * `{tenantId}/{key}`
     */
    smtpUsername?: string;
  }
}

export interface CredentialRetrieveResponse {
  data: CredentialRetrieveResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace CredentialRetrieveResponse {
  export interface Data {
    /**
     * Unique identifier for the credential
     */
    id: number;

    /**
     * When the credential was created
     */
    createdAt: string;

    /**
     * Whether the credential is on hold (disabled). When `true`, the credential cannot
     * be used to send emails.
     */
    hold: boolean;

    /**
     * When the credential was last used to send an email
     */
    lastUsedAt: string | null;

    /**
     * Name of the credential
     */
    name: string;

    /**
     * Type of credential:
     *
     * - `smtp` - For SMTP-based email sending
     * - `api` - For API-based email sending
     */
    type: 'smtp' | 'api';

    /**
     * When the credential was last updated
     */
    updatedAt: string;

    /**
     * The credential key (secret). Only included when:
     *
     * - Creating a new credential (always returned)
     * - Retrieving with `reveal=true`
     */
    key?: string;

    /**
     * SMTP username for authentication. Only included for SMTP credentials when the
     * key is revealed.
     */
    smtpUsername?: string;
  }
}

export interface CredentialUpdateResponse {
  data: CredentialUpdateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace CredentialUpdateResponse {
  export interface Data {
    /**
     * Unique identifier for the credential
     */
    id: number;

    /**
     * When the credential was created
     */
    createdAt: string;

    /**
     * Whether the credential is on hold (disabled). When `true`, the credential cannot
     * be used to send emails.
     */
    hold: boolean;

    /**
     * When the credential was last used to send an email
     */
    lastUsedAt: string | null;

    /**
     * Name of the credential
     */
    name: string;

    /**
     * Type of credential:
     *
     * - `smtp` - For SMTP-based email sending
     * - `api` - For API-based email sending
     */
    type: 'smtp' | 'api';

    /**
     * When the credential was last updated
     */
    updatedAt: string;

    /**
     * The credential key (secret). Only included when:
     *
     * - Creating a new credential (always returned)
     * - Retrieving with `reveal=true`
     */
    key?: string;

    /**
     * SMTP username for authentication. Only included for SMTP credentials when the
     * key is revealed.
     */
    smtpUsername?: string;
  }
}

export interface CredentialListResponse {
  /**
   * Unique identifier for the credential
   */
  id: number;

  /**
   * When the credential was created
   */
  createdAt: string;

  /**
   * Whether the credential is on hold (disabled). When `true`, the credential cannot
   * be used to send emails.
   */
  hold: boolean;

  /**
   * When the credential was last used to send an email
   */
  lastUsedAt: string | null;

  /**
   * Name of the credential
   */
  name: string;

  /**
   * Type of credential:
   *
   * - `smtp` - For SMTP-based email sending
   * - `api` - For API-based email sending
   */
  type: 'smtp' | 'api';

  /**
   * When the credential was last updated
   */
  updatedAt: string;
}

export interface CredentialDeleteResponse {
  data: CredentialDeleteResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace CredentialDeleteResponse {
  export interface Data {
    deleted: true;
  }
}

export interface CredentialCreateParams {
  /**
   * Name for the credential. Can only contain letters, numbers, hyphens, and
   * underscores. Max 50 characters.
   */
  name: string;

  /**
   * Type of credential:
   *
   * - `smtp` - For SMTP-based email sending
   * - `api` - For API-based email sending
   */
  type: 'smtp' | 'api';
}

export interface CredentialRetrieveParams {
  /**
   * Path param: The tenant ID
   */
  tenantId: string;

  /**
   * Query param: Set to `true` to include the credential key in the response
   */
  reveal?: boolean;
}

export interface CredentialUpdateParams {
  /**
   * Path param: The tenant ID
   */
  tenantId: string;

  /**
   * Body param: Set to `true` to disable the credential (put on hold). Set to
   * `false` to enable the credential (release from hold).
   */
  hold?: boolean;

  /**
   * Body param: New name for the credential
   */
  name?: string;
}

export interface CredentialListParams extends PageNumberPaginationParams {
  /**
   * Filter by credential type
   */
  type?: 'smtp' | 'api';
}

export interface CredentialDeleteParams {
  /**
   * The tenant ID
   */
  tenantId: string;
}

export declare namespace Credentials {
  export {
    type CredentialCreateResponse as CredentialCreateResponse,
    type CredentialRetrieveResponse as CredentialRetrieveResponse,
    type CredentialUpdateResponse as CredentialUpdateResponse,
    type CredentialListResponse as CredentialListResponse,
    type CredentialDeleteResponse as CredentialDeleteResponse,
    type CredentialListResponsesPageNumberPagination as CredentialListResponsesPageNumberPagination,
    type CredentialCreateParams as CredentialCreateParams,
    type CredentialRetrieveParams as CredentialRetrieveParams,
    type CredentialUpdateParams as CredentialUpdateParams,
    type CredentialListParams as CredentialListParams,
    type CredentialDeleteParams as CredentialDeleteParams,
  };
}
