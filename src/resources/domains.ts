// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DomainsAPI from './domains';
import * as Shared from './shared';
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
   * const domain = await client.domains.create({
   *   name: 'notifications.myapp.com',
   * });
   * ```
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/domains', { body, ...options });
  }

  /**
   * Get detailed information about a domain including DNS record status
   *
   * @example
   * ```ts
   * const domain = await client.domains.retrieve('domainId');
   * ```
   */
  retrieve(domainID: string, options?: RequestOptions): APIPromise<DomainRetrieveResponse> {
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
   * const domain = await client.domains.delete('domainId');
   * ```
   */
  delete(domainID: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
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
   * const response = await client.domains.verify('domainId');
   * ```
   */
  verify(domainID: string, options?: RequestOptions): APIPromise<DomainVerifyResponse> {
    return this._client.post(path`/domains/${domainID}/verify`, options);
  }
}

/**
 * A DNS record that needs to be configured in your domain's DNS settings
 */
export interface DNSRecord {
  /**
   * The hostname where the record should be created (relative to your domain)
   */
  name: string;

  /**
   * The DNS record type to create
   */
  type: 'TXT' | 'CNAME' | 'MX';

  /**
   * The value to set for the DNS record
   */
  value: string;

  /**
   * Current verification status of this DNS record:
   *
   * - `OK` - Record is correctly configured and verified
   * - `Missing` - Record was not found in your DNS
   * - `Invalid` - Record exists but has an incorrect value
   * - `null` - Record has not been checked yet
   */
  status?: 'OK' | 'Missing' | 'Invalid' | null;
}

export interface DomainCreateResponse {
  data: DomainCreateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace DomainCreateResponse {
  export interface Data {
    /**
     * Unique domain identifier
     */
    id: number;

    /**
     * Timestamp when the domain was added
     */
    createdAt: string;

    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     */
    dnsRecords: Data.DNSRecords | null;

    /**
     * The domain name used for sending emails
     */
    name: string;

    /**
     * UUID of the domain
     */
    uuid: string;

    /**
     * Whether all DNS records (SPF, DKIM, Return Path) are correctly configured.
     * Domain must be verified before sending emails.
     */
    verified: boolean;

    /**
     * Timestamp when the domain ownership was verified, or null if not yet verified
     */
    verifiedAt?: string | null;
  }

  export namespace Data {
    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     */
    export interface DNSRecords {
      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      dkim?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      returnPath?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      spf?: DomainsAPI.DNSRecord | null;
    }
  }
}

export interface DomainRetrieveResponse {
  data: DomainRetrieveResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace DomainRetrieveResponse {
  export interface Data {
    /**
     * Unique domain identifier
     */
    id: number;

    /**
     * Timestamp when the domain was added
     */
    createdAt: string;

    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     */
    dnsRecords: Data.DNSRecords | null;

    /**
     * The domain name used for sending emails
     */
    name: string;

    /**
     * UUID of the domain
     */
    uuid: string;

    /**
     * Whether all DNS records (SPF, DKIM, Return Path) are correctly configured.
     * Domain must be verified before sending emails.
     */
    verified: boolean;

    /**
     * Timestamp when the domain ownership was verified, or null if not yet verified
     */
    verifiedAt?: string | null;
  }

  export namespace Data {
    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     */
    export interface DNSRecords {
      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      dkim?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      returnPath?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      spf?: DomainsAPI.DNSRecord | null;
    }
  }
}

export interface DomainListResponse {
  data: DomainListResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace DomainListResponse {
  export interface Data {
    domains: Array<Data.Domain>;
  }

  export namespace Data {
    export interface Domain {
      /**
       * Unique domain identifier
       */
      id: number;

      /**
       * The domain name used for sending emails
       */
      name: string;

      /**
       * Whether all DNS records (SPF, DKIM, Return Path) are correctly configured.
       * Domain must be verified before sending emails.
       */
      verified: boolean;
    }
  }
}

export interface DomainDeleteResponse {
  data: DomainDeleteResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace DomainDeleteResponse {
  export interface Data {
    message: string;
  }
}

export interface DomainVerifyResponse {
  data: DomainVerifyResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace DomainVerifyResponse {
  export interface Data {
    /**
     * Unique domain identifier
     */
    id: number;

    /**
     * Timestamp when the domain was added
     */
    createdAt: string;

    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     */
    dnsRecords: Data.DNSRecords | null;

    /**
     * The domain name used for sending emails
     */
    name: string;

    /**
     * UUID of the domain
     */
    uuid: string;

    /**
     * Whether all DNS records (SPF, DKIM, Return Path) are correctly configured.
     * Domain must be verified before sending emails.
     */
    verified: boolean;

    /**
     * Timestamp when the domain ownership was verified, or null if not yet verified
     */
    verifiedAt?: string | null;
  }

  export namespace Data {
    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     */
    export interface DNSRecords {
      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      dkim?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      returnPath?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings
       */
      spf?: DomainsAPI.DNSRecord | null;
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
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainVerifyResponse as DomainVerifyResponse,
    type DomainCreateParams as DomainCreateParams,
  };
}
