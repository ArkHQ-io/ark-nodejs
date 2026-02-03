// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as CredentialsAPI from './credentials';
import {
  CredentialCreateParams,
  CredentialCreateResponse,
  CredentialDeleteParams,
  CredentialDeleteResponse,
  CredentialListParams,
  CredentialListResponse,
  CredentialListResponsesPageNumberPagination,
  CredentialRetrieveParams,
  CredentialRetrieveResponse,
  CredentialUpdateParams,
  CredentialUpdateResponse,
  Credentials,
} from './credentials';
import { APIPromise } from '../../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tenants extends APIResource {
  credentials: CredentialsAPI.Credentials = new CredentialsAPI.Credentials(this._client);

  /**
   * Create a new tenant.
   *
   * Returns the created tenant with a unique `id`. Store this ID in your database to
   * reference this tenant later.
   *
   * @example
   * ```ts
   * const tenant = await client.tenants.create({
   *   name: 'Acme Corp',
   * });
   * ```
   */
  create(body: TenantCreateParams, options?: RequestOptions): APIPromise<TenantCreateResponse> {
    return this._client.post('/tenants', { body, ...options });
  }

  /**
   * Get a tenant by ID.
   *
   * @example
   * ```ts
   * const tenant = await client.tenants.retrieve(
   *   'cm6abc123def456',
   * );
   * ```
   */
  retrieve(tenantID: string, options?: RequestOptions): APIPromise<TenantRetrieveResponse> {
    return this._client.get(path`/tenants/${tenantID}`, options);
  }

  /**
   * Update a tenant's name, metadata, or status. At least one field is required.
   *
   * Metadata is replaced entirely—include all keys you want to keep.
   *
   * @example
   * ```ts
   * const tenant = await client.tenants.update(
   *   'cm6abc123def456',
   *   { name: 'Acme Corporation' },
   * );
   * ```
   */
  update(
    tenantID: string,
    body: TenantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TenantUpdateResponse> {
    return this._client.patch(path`/tenants/${tenantID}`, { body, ...options });
  }

  /**
   * List all tenants with pagination. Filter by `status` if needed.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tenant of client.tenants.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TenantListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TenantsPageNumberPagination, Tenant> {
    return this._client.getAPIList('/tenants', PageNumberPagination<Tenant>, { query, ...options });
  }

  /**
   * Permanently delete a tenant. This cannot be undone.
   *
   * @example
   * ```ts
   * const tenant = await client.tenants.delete(
   *   'cm6abc123def456',
   * );
   * ```
   */
  delete(tenantID: string, options?: RequestOptions): APIPromise<TenantDeleteResponse> {
    return this._client.delete(path`/tenants/${tenantID}`, options);
  }
}

export type TenantsPageNumberPagination = PageNumberPagination<Tenant>;

export interface Tenant {
  /**
   * Unique identifier for the tenant
   */
  id: string;

  /**
   * When the tenant was created
   */
  created_at: string;

  /**
   * Custom key-value pairs for storing additional data
   */
  metadata: { [key: string]: string | number | boolean | null };

  /**
   * Display name for the tenant
   */
  name: string;

  /**
   * Current status of the tenant:
   *
   * - `active` - Normal operation
   * - `suspended` - Temporarily disabled
   * - `archived` - Soft-deleted
   */
  status: 'active' | 'suspended' | 'archived';

  /**
   * When the tenant was last updated
   */
  updated_at: string;
}

export interface TenantCreateResponse {
  data: Tenant;

  meta: Shared.APIMeta;

  success: true;
}

export interface TenantRetrieveResponse {
  data: Tenant;

  meta: Shared.APIMeta;

  success: true;
}

export interface TenantUpdateResponse {
  data: Tenant;

  meta: Shared.APIMeta;

  success: true;
}

export interface TenantDeleteResponse {
  data: TenantDeleteResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace TenantDeleteResponse {
  export interface Data {
    deleted: true;
  }
}

export interface TenantCreateParams {
  /**
   * Display name for the tenant (e.g., your customer's company name)
   */
  name: string;

  /**
   * Custom key-value pairs. Useful for storing references to your internal systems.
   *
   * **Limits:**
   *
   * - Max 50 keys
   * - Key names max 40 characters
   * - String values max 500 characters
   * - Total size max 8KB
   */
  metadata?: { [key: string]: string | number | boolean | null } | null;
}

export interface TenantUpdateParams {
  /**
   * Custom key-value pairs. Useful for storing references to your internal systems.
   *
   * **Limits:**
   *
   * - Max 50 keys
   * - Key names max 40 characters
   * - String values max 500 characters
   * - Total size max 8KB
   */
  metadata?: { [key: string]: string | number | boolean | null } | null;

  /**
   * Display name for the tenant
   */
  name?: string;

  /**
   * Tenant status
   */
  status?: 'active' | 'suspended' | 'archived';
}

export interface TenantListParams extends PageNumberPaginationParams {
  /**
   * Filter by tenant status
   */
  status?: 'active' | 'suspended' | 'archived';
}

Tenants.Credentials = Credentials;

export declare namespace Tenants {
  export {
    type Tenant as Tenant,
    type TenantCreateResponse as TenantCreateResponse,
    type TenantRetrieveResponse as TenantRetrieveResponse,
    type TenantUpdateResponse as TenantUpdateResponse,
    type TenantDeleteResponse as TenantDeleteResponse,
    type TenantsPageNumberPagination as TenantsPageNumberPagination,
    type TenantCreateParams as TenantCreateParams,
    type TenantUpdateParams as TenantUpdateParams,
    type TenantListParams as TenantListParams,
  };

  export {
    Credentials as Credentials,
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
