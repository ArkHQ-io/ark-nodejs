// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DomainsAPI from './domains';
import * as TrackingAPI from './tracking';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Domains extends APIResource {
  /**
   * Add a new domain for sending emails. Returns DNS records that must be configured
   * before the domain can be verified.
   *
   * **Required DNS records:**
   *
   * - **SPF** - TXT record for sender authentication
   * - **DKIM** - TXT record for email signing
   * - **Return Path** - CNAME for bounce handling
   *
   * After adding DNS records, call `POST /domains/{id}/verify` to verify.
   *
   * @example
   * ```ts
   * const domainResponse = await client.domains.create({
   *   name: 'notifications.myapp.com',
   * });
   * ```
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainResponse> {
    return this._client.post('/domains', { body, ...options });
  }

  /**
   * Get detailed information about a domain including DNS record status
   *
   * @example
   * ```ts
   * const domainResponse = await client.domains.retrieve(
   *   'domainId',
   * );
   * ```
   */
  retrieve(domainID: string, options?: RequestOptions): APIPromise<DomainResponse> {
    return this._client.get(path`/domains/${domainID}`, options);
  }

  /**
   * Get all sending domains with their verification status
   *
   * @example
   * ```ts
   * const domains = await client.domains.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<DomainListResponse> {
    return this._client.get('/domains', options);
  }

  /**
   * Remove a sending domain. You will no longer be able to send emails from this
   * domain.
   *
   * **Warning:** This action cannot be undone.
   *
   * @example
   * ```ts
   * const successResponse = await client.domains.delete(
   *   'domainId',
   * );
   * ```
   */
  delete(domainID: string, options?: RequestOptions): APIPromise<SuccessResponse> {
    return this._client.delete(path`/domains/${domainID}`, options);
  }

  /**
   * Check if DNS records are correctly configured and verify the domain. Returns the
   * current status of each required DNS record.
   *
   * Call this after you've added the DNS records shown when creating the domain.
   *
   * @example
   * ```ts
   * const domainResponse = await client.domains.verify(
   *   'domainId',
   * );
   * ```
   */
  verify(domainID: string, options?: RequestOptions): APIPromise<DomainResponse> {
    return this._client.post(path`/domains/${domainID}/verify`, options);
  }
}

export interface DNSRecord {
  /**
   * DNS record name (hostname)
   */
  name: string;

  /**
   * DNS record type
   */
  type: 'TXT' | 'CNAME' | 'MX';

  /**
   * DNS record value
   */
  value: string;

  /**
   * DNS verification status:
   *
   * - `OK` - Record is correctly configured
   * - `Missing` - Record not found in DNS
   * - `Invalid` - Record exists but has wrong value
   * - `null` - Not yet checked
   */
  status?: 'OK' | 'Missing' | 'Invalid' | null;
}

export interface DomainResponse {
  data: DomainResponse.Data;

  meta: TrackingAPI.APIMeta;

  success: true;
}

export namespace DomainResponse {
  export interface Data {
    /**
     * Domain ID
     */
    id: string;

    createdAt: string;

    dnsRecords: Data.DNSRecords;

    /**
     * Domain name
     */
    name: string;

    uuid: string;

    /**
     * Whether DNS is verified
     */
    verified: boolean;

    /**
     * When the domain was verified (null if not verified)
     */
    verifiedAt?: string | null;
  }

  export namespace Data {
    export interface DNSRecords {
      dkim: DomainsAPI.DNSRecord;

      returnPath: DomainsAPI.DNSRecord;

      spf: DomainsAPI.DNSRecord;
    }
  }
}

export interface SuccessResponse {
  data: SuccessResponse.Data;

  meta: TrackingAPI.APIMeta;

  success: true;
}

export namespace SuccessResponse {
  export interface Data {
    message: string;
  }
}

export interface DomainListResponse {
  data: DomainListResponse.Data;

  meta: TrackingAPI.APIMeta;

  success: true;
}

export namespace DomainListResponse {
  export interface Data {
    domains: Array<Data.Domain>;
  }

  export namespace Data {
    export interface Domain {
      /**
       * Domain ID
       */
      id: string;

      dnsOk: boolean;

      name: string;

      verified: boolean;
    }
  }
}

export interface DomainCreateParams {
  /**
   * Domain name (e.g., "mail.example.com")
   */
  name: string;
}

export declare namespace Domains {
  export {
    type DNSRecord as DNSRecord,
    type DomainResponse as DomainResponse,
    type SuccessResponse as SuccessResponse,
    type DomainListResponse as DomainListResponse,
    type DomainCreateParams as DomainCreateParams,
  };
}
