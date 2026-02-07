// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TrackingAPI from './tracking';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tracking extends APIResource {
  /**
   * Create a new track domain for open/click tracking for a tenant.
   *
   * After creation, you must configure a CNAME record pointing to the provided DNS
   * value before tracking will work.
   *
   * @example
   * ```ts
   * const tracking = await client.tenants.tracking.create(
   *   'cm6abc123def456',
   *   { domainId: 123, name: 'track' },
   * );
   * ```
   */
  create(
    tenantID: string,
    body: TrackingCreateParams,
    options?: RequestOptions,
  ): APIPromise<TrackingCreateResponse> {
    return this._client.post(path`/tenants/${tenantID}/tracking`, { body, ...options });
  }

  /**
   * Get details of a specific track domain including DNS configuration.
   *
   * @example
   * ```ts
   * const tracking = await client.tenants.tracking.retrieve(
   *   '123',
   *   { tenantId: 'cm6abc123def456' },
   * );
   * ```
   */
  retrieve(
    trackingID: string,
    params: TrackingRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TrackingRetrieveResponse> {
    const { tenantId } = params;
    return this._client.get(path`/tenants/${tenantId}/tracking/${trackingID}`, options);
  }

  /**
   * Update track domain settings.
   *
   * Use this to:
   *
   * - Enable/disable click tracking
   * - Enable/disable open tracking
   * - Enable/disable SSL
   * - Set excluded click domains
   *
   * @example
   * ```ts
   * const tracking = await client.tenants.tracking.update(
   *   '123',
   *   { tenantId: 'cm6abc123def456' },
   * );
   * ```
   */
  update(
    trackingID: string,
    params: TrackingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TrackingUpdateResponse> {
    const { tenantId, ...body } = params;
    return this._client.patch(path`/tenants/${tenantId}/tracking/${trackingID}`, { body, ...options });
  }

  /**
   * List all track domains configured for a tenant. Track domains enable open and
   * click tracking for emails.
   *
   * @example
   * ```ts
   * const trackings = await client.tenants.tracking.list(
   *   'cm6abc123def456',
   * );
   * ```
   */
  list(tenantID: string, options?: RequestOptions): APIPromise<TrackingListResponse> {
    return this._client.get(path`/tenants/${tenantID}/tracking`, options);
  }

  /**
   * Delete a track domain. This will disable tracking for any emails using this
   * domain.
   *
   * @example
   * ```ts
   * const tracking = await client.tenants.tracking.delete(
   *   '123',
   *   { tenantId: 'cm6abc123def456' },
   * );
   * ```
   */
  delete(
    trackingID: string,
    params: TrackingDeleteParams,
    options?: RequestOptions,
  ): APIPromise<TrackingDeleteResponse> {
    const { tenantId } = params;
    return this._client.delete(path`/tenants/${tenantId}/tracking/${trackingID}`, options);
  }

  /**
   * Check DNS configuration for the track domain.
   *
   * The track domain requires a CNAME record to be configured before open and click
   * tracking will work. Use this endpoint to verify the DNS is correctly set up.
   *
   * @example
   * ```ts
   * const response = await client.tenants.tracking.verify(
   *   '123',
   *   { tenantId: 'cm6abc123def456' },
   * );
   * ```
   */
  verify(
    trackingID: string,
    params: TrackingVerifyParams,
    options?: RequestOptions,
  ): APIPromise<TrackingVerifyResponse> {
    const { tenantId } = params;
    return this._client.post(path`/tenants/${tenantId}/tracking/${trackingID}/verify`, options);
  }
}

export interface TrackDomain {
  /**
   * Track domain ID
   */
  id: string;

  /**
   * When the track domain was created
   */
  createdAt: string;

  /**
   * Whether the tracking CNAME record is correctly configured. Must be true to use
   * tracking features.
   */
  dnsOk: boolean;

  /**
   * ID of the parent sending domain
   */
  domainId: string;

  /**
   * Full domain name
   */
  fullName: string;

  /**
   * Subdomain name
   */
  name: string;

  /**
   * Whether SSL is enabled for tracking URLs
   */
  sslEnabled: boolean;

  /**
   * Whether click tracking is enabled
   */
  trackClicks: boolean;

  /**
   * Whether open tracking is enabled
   */
  trackOpens: boolean;

  /**
   * When DNS was last checked
   */
  dnsCheckedAt?: string | null;

  /**
   * DNS error message if verification failed
   */
  dnsError?: string | null;

  /**
   * Required DNS record configuration
   */
  dnsRecord?: TrackDomain.DNSRecord | null;

  /**
   * Current DNS verification status
   */
  dnsStatus?: 'ok' | 'missing' | 'invalid' | null;

  /**
   * Domains excluded from click tracking
   */
  excludedClickDomains?: string | null;

  /**
   * When the track domain was last updated
   */
  updatedAt?: string | null;
}

export namespace TrackDomain {
  /**
   * Required DNS record configuration
   */
  export interface DNSRecord {
    /**
     * DNS record name
     */
    name?: string;

    /**
     * DNS record type
     */
    type?: string;

    /**
     * DNS record value (target)
     */
    value?: string;
  }
}

export interface TrackingCreateResponse {
  data: TrackDomain;

  meta: Shared.APIMeta;

  success: true;
}

export interface TrackingRetrieveResponse {
  data: TrackDomain;

  meta: Shared.APIMeta;

  success: true;
}

export interface TrackingUpdateResponse {
  data: TrackDomain;

  meta: Shared.APIMeta;

  success: true;
}

export interface TrackingListResponse {
  data: TrackingListResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace TrackingListResponse {
  export interface Data {
    trackDomains: Array<TrackingAPI.TrackDomain>;
  }
}

export interface TrackingDeleteResponse {
  data: TrackingDeleteResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace TrackingDeleteResponse {
  export interface Data {
    message: string;
  }
}

export interface TrackingVerifyResponse {
  data: TrackingVerifyResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace TrackingVerifyResponse {
  export interface Data {
    /**
     * Track domain ID
     */
    id: string;

    /**
     * Whether DNS is correctly configured
     */
    dnsOk: boolean;

    /**
     * Current DNS verification status
     */
    dnsStatus: 'ok' | 'missing' | 'invalid' | null;

    /**
     * Full domain name
     */
    fullName: string;

    /**
     * When DNS was last checked
     */
    dnsCheckedAt?: string | null;

    /**
     * DNS error message if verification failed
     */
    dnsError?: string | null;

    /**
     * Required DNS record configuration
     */
    dnsRecord?: Data.DNSRecord | null;
  }

  export namespace Data {
    /**
     * Required DNS record configuration
     */
    export interface DNSRecord {
      name?: string;

      type?: string;

      value?: string;
    }
  }
}

export interface TrackingCreateParams {
  /**
   * ID of the sending domain to attach this track domain to
   */
  domainId: number;

  /**
   * Subdomain name (e.g., 'track' for track.yourdomain.com)
   */
  name: string;

  /**
   * Enable SSL for tracking URLs (accepts null, defaults to true)
   */
  sslEnabled?: boolean | null;

  /**
   * Enable click tracking (accepts null, defaults to true)
   */
  trackClicks?: boolean | null;

  /**
   * Enable open tracking (tracking pixel, accepts null, defaults to true)
   */
  trackOpens?: boolean | null;
}

export interface TrackingRetrieveParams {
  /**
   * The tenant ID
   */
  tenantId: string;
}

export interface TrackingUpdateParams {
  /**
   * Path param: The tenant ID
   */
  tenantId: string;

  /**
   * Body param: Comma-separated list of domains to exclude from click tracking
   * (accepts null)
   */
  excludedClickDomains?: string | null;

  /**
   * Body param: Enable or disable SSL for tracking URLs (accepts null)
   */
  sslEnabled?: boolean | null;

  /**
   * Body param: Enable or disable click tracking (accepts null)
   */
  trackClicks?: boolean | null;

  /**
   * Body param: Enable or disable open tracking (accepts null)
   */
  trackOpens?: boolean | null;
}

export interface TrackingDeleteParams {
  /**
   * The tenant ID
   */
  tenantId: string;
}

export interface TrackingVerifyParams {
  /**
   * The tenant ID
   */
  tenantId: string;
}

export declare namespace Tracking {
  export {
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
}
