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
   * **Required:** `tenant_id` to specify which tenant the domain belongs to. Each
   * tenant gets their own isolated mail server for domain isolation.
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
   *   tenant_id: 'cm6abc123def456',
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
   * Get all sending domains with their verification status.
   *
   * Optionally filter by `tenant_id` to list domains for a specific tenant. When
   * filtered, response includes `tenant_id` and `tenant_name` for each domain.
   *
   * @example
   * ```ts
   * const domains = await client.domains.list();
   * ```
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainListResponse> {
    return this._client.get('/domains', { query, ...options });
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
 * A DNS record that needs to be configured in your domain's DNS settings.
 *
 * The `name` field contains the relative hostname to enter in your DNS provider
 * (which auto-appends the zone). The `fullName` field contains the complete
 * fully-qualified domain name (FQDN) for reference.
 *
 * **Example for subdomain `mail.example.com`:**
 *
 * - `name`: `"mail"` (what you enter in DNS provider)
 * - `fullName`: `"mail.example.com"` (the complete hostname)
 *
 * **Example for root domain `example.com`:**
 *
 * - `name`: `"@"` (DNS shorthand for apex/root)
 * - `fullName`: `"example.com"`
 */
export interface DNSRecord {
  /**
   * The complete fully-qualified domain name (FQDN). Use this as a reference to
   * verify the record is configured correctly.
   */
  fullName: string;

  /**
   * The relative hostname to enter in your DNS provider. Most DNS providers
   * auto-append the zone name, so you only need to enter this relative part.
   *
   * - `"@"` means the apex/root of the zone (for root domains)
   * - `"mail"` for a subdomain like `mail.example.com`
   * - `"ark-xyz._domainkey.mail"` for DKIM on a subdomain
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
     *
     * **Important:** The `name` field contains the relative hostname that you should
     * enter in your DNS provider. Most DNS providers auto-append the zone name, so you
     * only need to enter the relative part.
     *
     * For subdomains like `mail.example.com`, the zone is `example.com`, so:
     *
     * - SPF `name` would be `mail` (not `@`)
     * - DKIM `name` would be `ark-xyz._domainkey.mail`
     * - Return Path `name` would be `psrp.mail`
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
     * ID of the tenant this domain belongs to
     */
    tenant_id?: string;

    /**
     * Name of the tenant this domain belongs to
     */
    tenant_name?: string;

    /**
     * Timestamp when the domain ownership was verified, or null if not yet verified
     */
    verifiedAt?: string | null;
  }

  export namespace Data {
    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     *
     * **Important:** The `name` field contains the relative hostname that you should
     * enter in your DNS provider. Most DNS providers auto-append the zone name, so you
     * only need to enter the relative part.
     *
     * For subdomains like `mail.example.com`, the zone is `example.com`, so:
     *
     * - SPF `name` would be `mail` (not `@`)
     * - DKIM `name` would be `ark-xyz._domainkey.mail`
     * - Return Path `name` would be `psrp.mail`
     */
    export interface DNSRecords {
      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      dkim?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      returnPath?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      spf?: DomainsAPI.DNSRecord | null;

      /**
       * The DNS zone (registrable domain) where records should be added. This is the
       * root domain that your DNS provider manages. For `mail.example.com`, the zone is
       * `example.com`. For `example.co.uk`, the zone is `example.co.uk`.
       */
      zone?: string;
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
     *
     * **Important:** The `name` field contains the relative hostname that you should
     * enter in your DNS provider. Most DNS providers auto-append the zone name, so you
     * only need to enter the relative part.
     *
     * For subdomains like `mail.example.com`, the zone is `example.com`, so:
     *
     * - SPF `name` would be `mail` (not `@`)
     * - DKIM `name` would be `ark-xyz._domainkey.mail`
     * - Return Path `name` would be `psrp.mail`
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
     * ID of the tenant this domain belongs to
     */
    tenant_id?: string;

    /**
     * Name of the tenant this domain belongs to
     */
    tenant_name?: string;

    /**
     * Timestamp when the domain ownership was verified, or null if not yet verified
     */
    verifiedAt?: string | null;
  }

  export namespace Data {
    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     *
     * **Important:** The `name` field contains the relative hostname that you should
     * enter in your DNS provider. Most DNS providers auto-append the zone name, so you
     * only need to enter the relative part.
     *
     * For subdomains like `mail.example.com`, the zone is `example.com`, so:
     *
     * - SPF `name` would be `mail` (not `@`)
     * - DKIM `name` would be `ark-xyz._domainkey.mail`
     * - Return Path `name` would be `psrp.mail`
     */
    export interface DNSRecords {
      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      dkim?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      returnPath?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      spf?: DomainsAPI.DNSRecord | null;

      /**
       * The DNS zone (registrable domain) where records should be added. This is the
       * root domain that your DNS provider manages. For `mail.example.com`, the zone is
       * `example.com`. For `example.co.uk`, the zone is `example.co.uk`.
       */
      zone?: string;
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

      /**
       * ID of the tenant this domain belongs to (included when filtering by tenant_id)
       */
      tenant_id?: string;

      /**
       * Name of the tenant this domain belongs to (included when filtering by tenant_id)
       */
      tenant_name?: string;
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
     *
     * **Important:** The `name` field contains the relative hostname that you should
     * enter in your DNS provider. Most DNS providers auto-append the zone name, so you
     * only need to enter the relative part.
     *
     * For subdomains like `mail.example.com`, the zone is `example.com`, so:
     *
     * - SPF `name` would be `mail` (not `@`)
     * - DKIM `name` would be `ark-xyz._domainkey.mail`
     * - Return Path `name` would be `psrp.mail`
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
     * ID of the tenant this domain belongs to
     */
    tenant_id?: string;

    /**
     * Name of the tenant this domain belongs to
     */
    tenant_name?: string;

    /**
     * Timestamp when the domain ownership was verified, or null if not yet verified
     */
    verifiedAt?: string | null;
  }

  export namespace Data {
    /**
     * DNS records that must be added to your domain's DNS settings. Null if records
     * are not yet generated.
     *
     * **Important:** The `name` field contains the relative hostname that you should
     * enter in your DNS provider. Most DNS providers auto-append the zone name, so you
     * only need to enter the relative part.
     *
     * For subdomains like `mail.example.com`, the zone is `example.com`, so:
     *
     * - SPF `name` would be `mail` (not `@`)
     * - DKIM `name` would be `ark-xyz._domainkey.mail`
     * - Return Path `name` would be `psrp.mail`
     */
    export interface DNSRecords {
      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      dkim?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      returnPath?: DomainsAPI.DNSRecord | null;

      /**
       * A DNS record that needs to be configured in your domain's DNS settings.
       *
       * The `name` field contains the relative hostname to enter in your DNS provider
       * (which auto-appends the zone). The `fullName` field contains the complete
       * fully-qualified domain name (FQDN) for reference.
       *
       * **Example for subdomain `mail.example.com`:**
       *
       * - `name`: `"mail"` (what you enter in DNS provider)
       * - `fullName`: `"mail.example.com"` (the complete hostname)
       *
       * **Example for root domain `example.com`:**
       *
       * - `name`: `"@"` (DNS shorthand for apex/root)
       * - `fullName`: `"example.com"`
       */
      spf?: DomainsAPI.DNSRecord | null;

      /**
       * The DNS zone (registrable domain) where records should be added. This is the
       * root domain that your DNS provider manages. For `mail.example.com`, the zone is
       * `example.com`. For `example.co.uk`, the zone is `example.co.uk`.
       */
      zone?: string;
    }
  }
}

export interface DomainCreateParams {
  /**
   * Domain name (e.g., "mail.example.com")
   */
  name: string;

  /**
   * ID of the tenant this domain belongs to
   */
  tenant_id: string;
}

export interface DomainListParams {
  /**
   * Filter domains by tenant ID
   */
  tenant_id?: string;
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
    type DomainListParams as DomainListParams,
  };
}
