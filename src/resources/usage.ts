// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as UsageAPI from './usage';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Usage extends APIResource {
  /**
   * Returns aggregated email sending statistics for your entire organization. For
   * per-tenant breakdown, use `GET /usage/tenants`.
   *
   * **Use cases:**
   *
   * - Platform dashboards showing org-wide metrics
   * - Quick health check on overall sending
   * - Monitoring total volume and delivery rates
   *
   * **Response includes:**
   *
   * - `emails` - Aggregated email counts across all tenants
   * - `rates` - Overall delivery and bounce rates
   * - `tenants` - Tenant count summary (total, active, with activity)
   *
   * **Related endpoints:**
   *
   * - `GET /usage/tenants` - Paginated usage per tenant
   * - `GET /usage/export` - Export usage data for billing
   * - `GET /tenants/{tenantId}/usage` - Single tenant usage details
   * - `GET /limits` - Rate limits and send limits
   */
  retrieve(
    query: UsageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrgUsageSummary> {
    return this._client.get('/usage', { query, ...options });
  }

  /**
   * Export email usage data for all tenants in CSV or JSON Lines format. Designed
   * for billing system integration, data warehousing, and analytics.
   *
   * **Jobs to be done:**
   *
   * - Import usage data into billing systems (Stripe, Chargebee, etc.)
   * - Load into data warehouses (Snowflake, BigQuery, etc.)
   * - Process in spreadsheets (Excel, Google Sheets)
   * - Feed into BI tools (Looker, Metabase, etc.)
   *
   * **Export formats:**
   *
   * - `csv` - UTF-8 with BOM for Excel compatibility (default)
   * - `jsonl` - JSON Lines (one JSON object per line, streamable)
   *
   * **CSV columns:** `tenant_id`, `tenant_name`, `external_id`, `status`, `sent`,
   * `delivered`, `soft_failed`, `hard_failed`, `bounced`, `held`, `delivery_rate`,
   * `bounce_rate`, `period_start`, `period_end`
   *
   * **Response headers:**
   *
   * - `Content-Disposition` - Filename for download
   * - `Content-Type` - `text/csv` or `application/x-ndjson`
   */
  export(
    query: UsageExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsageExportResponse> {
    return this._client.get('/usage/export', { query, ...options });
  }

  /**
   * Returns email usage statistics for all tenants in your organization. Results are
   * paginated with page-based navigation.
   *
   * **Jobs to be done:**
   *
   * - Generate monthly billing invoices per tenant
   * - Build admin dashboards showing all customer usage
   * - Identify high-volume or problematic tenants
   * - Track usage against plan limits
   *
   * **Sorting options:**
   *
   * - `sent`, `-sent` - Sort by emails sent (ascending/descending)
   * - `delivered`, `-delivered` - Sort by emails delivered
   * - `bounce_rate`, `-bounce_rate` - Sort by bounce rate
   * - `tenant_name`, `-tenant_name` - Sort alphabetically by tenant name
   *
   * **Filtering:**
   *
   * - `status` - Filter by tenant status (active, suspended, archived)
   * - `minSent` - Only include tenants with at least N emails sent
   *
   * **Auto-pagination:** SDKs support iterating over all pages automatically.
   */
  listTenants(
    query: UsageListTenantsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TenantUsageItemsPageNumberPagination, TenantUsageItem> {
    return this._client.getAPIList('/usage/tenants', PageNumberPagination<TenantUsageItem>, {
      query,
      ...options,
    });
  }
}

export type TenantUsageItemsPageNumberPagination = PageNumberPagination<TenantUsageItem>;

/**
 * Email delivery counts
 */
export interface EmailCounts {
  /**
   * Emails that bounced
   */
  bounced: number;

  /**
   * Emails successfully delivered
   */
  delivered: number;

  /**
   * Emails that hard-failed (permanent failures)
   */
  hard_failed: number;

  /**
   * Emails currently held for review
   */
  held: number;

  /**
   * Total emails sent
   */
  sent: number;

  /**
   * Emails that soft-failed (temporary failures, may be retried)
   */
  soft_failed: number;
}

/**
 * Email delivery rates (as decimals, e.g., 0.95 = 95%)
 */
export interface EmailRates {
  /**
   * Percentage of sent emails that bounced (0-1)
   */
  bounce_rate: number;

  /**
   * Percentage of sent emails that were delivered (0-1)
   */
  delivery_rate: number;
}

/**
 * Org-wide usage summary response
 */
export interface OrgUsageSummary {
  data: OrgUsageSummary.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace OrgUsageSummary {
  export interface Data {
    /**
     * Email delivery counts
     */
    emails: UsageAPI.EmailCounts;

    /**
     * Time period for usage data
     */
    period: UsageAPI.UsagePeriod;

    /**
     * Email delivery rates (as decimals, e.g., 0.95 = 95%)
     */
    rates: UsageAPI.EmailRates;

    tenants: Data.Tenants;
  }

  export namespace Data {
    export interface Tenants {
      /**
       * Number of active tenants
       */
      active: number;

      /**
       * Total number of tenants
       */
      total: number;

      /**
       * Number of tenants with sending activity
       */
      withActivity: number;
    }
  }
}

/**
 * Usage record for a single tenant (camelCase for SDK)
 */
export interface TenantUsageItem {
  /**
   * Email delivery counts
   */
  emails: EmailCounts;

  /**
   * Email delivery rates (as decimals, e.g., 0.95 = 95%)
   */
  rates: EmailRates;

  /**
   * Current tenant status
   */
  status: 'active' | 'suspended' | 'archived';

  /**
   * Unique tenant identifier
   */
  tenantId: string;

  /**
   * Tenant display name
   */
  tenantName: string;

  /**
   * Your external ID for this tenant
   */
  externalId?: string | null;
}

/**
 * Time period for usage data
 */
export interface UsagePeriod {
  /**
   * Period end (inclusive)
   */
  end: string;

  /**
   * Period start (inclusive)
   */
  start: string;
}

export type UsageExportResponse = Array<UsageExportResponse.UsageExportResponseItem>;

export namespace UsageExportResponse {
  /**
   * Single row in usage export (JSON format)
   */
  export interface UsageExportResponseItem {
    /**
     * Bounce rate (0-1)
     */
    bounce_rate: number;

    /**
     * Emails that bounced
     */
    bounced: number;

    /**
     * Emails successfully delivered
     */
    delivered: number;

    /**
     * Delivery rate (0-1)
     */
    delivery_rate: number;

    /**
     * Emails that hard-failed
     */
    hard_failed: number;

    /**
     * Emails currently held
     */
    held: number;

    /**
     * Total emails sent
     */
    sent: number;

    /**
     * Emails that soft-failed
     */
    soft_failed: number;

    /**
     * Current tenant status
     */
    status: 'active' | 'suspended' | 'archived';

    /**
     * Unique tenant identifier
     */
    tenant_id: string;

    /**
     * Tenant display name
     */
    tenant_name: string;

    /**
     * Your external ID for this tenant
     */
    external_id?: string | null;
  }
}

export interface UsageRetrieveParams {
  /**
   * Time period for usage data.
   *
   * **Shortcuts:** `today`, `yesterday`, `this_week`, `last_week`, `this_month`,
   * `last_month`, `last_7_days`, `last_30_days`, `last_90_days`
   *
   * **Month format:** `2024-01` (YYYY-MM)
   *
   * **Custom range:** `2024-01-01..2024-01-15`
   */
  period?: string;

  /**
   * Timezone for period calculations (IANA format)
   */
  timezone?: string;
}

export interface UsageExportParams {
  /**
   * Export format
   */
  format?: 'csv' | 'jsonl';

  /**
   * Only include tenants with at least this many emails sent
   */
  minSent?: number;

  /**
   * Time period for export.
   *
   * **Shortcuts:** `this_month`, `last_month`, `last_30_days`, etc.
   *
   * **Month format:** `2024-01` (YYYY-MM)
   *
   * **Custom range:** `2024-01-01..2024-01-15`
   */
  period?: string;

  /**
   * Filter by tenant status
   */
  status?: 'active' | 'suspended' | 'archived';

  /**
   * Timezone for period calculations (IANA format)
   */
  timezone?: string;
}

export interface UsageListTenantsParams extends PageNumberPaginationParams {
  /**
   * Only include tenants with at least this many emails sent
   */
  minSent?: number;

  /**
   * Time period for usage data. Defaults to current month.
   *
   * **Shortcuts:** `today`, `yesterday`, `this_week`, `last_week`, `this_month`,
   * `last_month`, `last_7_days`, `last_30_days`, `last_90_days`
   *
   * **Month format:** `2024-01` (YYYY-MM)
   *
   * **Custom range:** `2024-01-01..2024-01-15`
   */
  period?: string;

  /**
   * Sort order for results. Prefix with `-` for descending order.
   */
  sort?:
    | 'sent'
    | '-sent'
    | 'delivered'
    | '-delivered'
    | 'bounce_rate'
    | '-bounce_rate'
    | 'delivery_rate'
    | '-delivery_rate'
    | 'tenant_name'
    | '-tenant_name';

  /**
   * Filter by tenant status
   */
  status?: 'active' | 'suspended' | 'archived';

  /**
   * Timezone for period calculations (IANA format). Defaults to UTC.
   */
  timezone?: string;
}

export declare namespace Usage {
  export {
    type EmailCounts as EmailCounts,
    type EmailRates as EmailRates,
    type OrgUsageSummary as OrgUsageSummary,
    type TenantUsageItem as TenantUsageItem,
    type UsagePeriod as UsagePeriod,
    type UsageExportResponse as UsageExportResponse,
    type TenantUsageItemsPageNumberPagination as TenantUsageItemsPageNumberPagination,
    type UsageRetrieveParams as UsageRetrieveParams,
    type UsageExportParams as UsageExportParams,
    type UsageListTenantsParams as UsageListTenantsParams,
  };
}
