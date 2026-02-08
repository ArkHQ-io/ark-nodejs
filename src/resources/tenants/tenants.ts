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
import * as DomainsAPI from './domains';
import {
  DNSRecord,
  DomainCreateParams,
  DomainCreateResponse,
  DomainDeleteParams,
  DomainDeleteResponse,
  DomainListResponse,
  DomainRetrieveParams,
  DomainRetrieveResponse,
  DomainVerifyParams,
  DomainVerifyResponse,
  Domains,
} from './domains';
import * as SuppressionsAPI from './suppressions';
import {
  SuppressionCreateParams,
  SuppressionCreateResponse,
  SuppressionDeleteParams,
  SuppressionDeleteResponse,
  SuppressionListParams,
  SuppressionListResponse,
  SuppressionListResponsesPageNumberPagination,
  SuppressionRetrieveParams,
  SuppressionRetrieveResponse,
  Suppressions,
} from './suppressions';
import * as TrackingAPI from './tracking';
import {
  TrackDomain,
  Tracking,
  TrackingCreateParams,
  TrackingCreateResponse,
  TrackingDeleteParams,
  TrackingDeleteResponse,
  TrackingListResponse,
  TrackingRetrieveParams,
  TrackingRetrieveResponse,
  TrackingUpdateParams,
  TrackingUpdateResponse,
  TrackingVerifyParams,
  TrackingVerifyResponse,
} from './tracking';
import * as UsageAPI from './usage';
import {
  TenantUsage,
  TenantUsageTimeseries,
  Usage,
  UsageRetrieveParams,
  UsageRetrieveResponse,
  UsageRetrieveTimeseriesParams,
  UsageRetrieveTimeseriesResponse,
} from './usage';
import * as WebhooksAPI from './webhooks';
import {
  WebhookCreateParams,
  WebhookCreateResponse,
  WebhookDeleteParams,
  WebhookDeleteResponse,
  WebhookListDeliveriesParams,
  WebhookListDeliveriesResponse,
  WebhookListResponse,
  WebhookReplayDeliveryParams,
  WebhookReplayDeliveryResponse,
  WebhookRetrieveDeliveryParams,
  WebhookRetrieveDeliveryResponse,
  WebhookRetrieveParams,
  WebhookRetrieveResponse,
  WebhookTestParams,
  WebhookTestResponse,
  WebhookUpdateParams,
  WebhookUpdateResponse,
  Webhooks,
} from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tenants extends APIResource {
  credentials: CredentialsAPI.Credentials = new CredentialsAPI.Credentials(this._client);
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);
  suppressions: SuppressionsAPI.Suppressions = new SuppressionsAPI.Suppressions(this._client);
  webhooks: WebhooksAPI.Webhooks = new WebhooksAPI.Webhooks(this._client);
  tracking: TrackingAPI.Tracking = new TrackingAPI.Tracking(this._client);
  usage: UsageAPI.Usage = new UsageAPI.Usage(this._client);

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
  createdAt: string;

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
  updatedAt: string;
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
Tenants.Domains = Domains;
Tenants.Suppressions = Suppressions;
Tenants.Webhooks = Webhooks;
Tenants.Tracking = Tracking;
Tenants.Usage = Usage;

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

  export {
    Domains as Domains,
    type DNSRecord as DNSRecord,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainVerifyResponse as DomainVerifyResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainDeleteParams as DomainDeleteParams,
    type DomainVerifyParams as DomainVerifyParams,
  };

  export {
    Suppressions as Suppressions,
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

  export {
    Webhooks as Webhooks,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookListDeliveriesResponse as WebhookListDeliveriesResponse,
    type WebhookReplayDeliveryResponse as WebhookReplayDeliveryResponse,
    type WebhookRetrieveDeliveryResponse as WebhookRetrieveDeliveryResponse,
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookRetrieveParams as WebhookRetrieveParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookDeleteParams as WebhookDeleteParams,
    type WebhookListDeliveriesParams as WebhookListDeliveriesParams,
    type WebhookReplayDeliveryParams as WebhookReplayDeliveryParams,
    type WebhookRetrieveDeliveryParams as WebhookRetrieveDeliveryParams,
    type WebhookTestParams as WebhookTestParams,
  };

  export {
    Tracking as Tracking,
    type TrackDomain as TrackDomain,
    type TrackingCreateResponse as TrackingCreateResponse,
    type TrackingRetrieveResponse as TrackingRetrieveResponse,
    type TrackingUpdateResponse as TrackingUpdateResponse,
    type TrackingListResponse as TrackingListResponse,
    type TrackingDeleteResponse as TrackingDeleteResponse,
    type TrackingVerifyResponse as TrackingVerifyResponse,
    type TrackingCreateParams as TrackingCreateParams,
    type TrackingRetrieveParams as TrackingRetrieveParams,
    type TrackingUpdateParams as TrackingUpdateParams,
    type TrackingDeleteParams as TrackingDeleteParams,
    type TrackingVerifyParams as TrackingVerifyParams,
  };

  export {
    Usage as Usage,
    type TenantUsage as TenantUsage,
    type TenantUsageTimeseries as TenantUsageTimeseries,
    type UsageRetrieveResponse as UsageRetrieveResponse,
    type UsageRetrieveTimeseriesResponse as UsageRetrieveTimeseriesResponse,
    type UsageRetrieveParams as UsageRetrieveParams,
    type UsageRetrieveTimeseriesParams as UsageRetrieveTimeseriesParams,
  };
}
