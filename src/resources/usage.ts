// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as UsageAPI from './usage';
import * as LimitsAPI from './limits';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { OffsetPagination, type OffsetPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Usage extends APIResource {
  /**
   * > **Deprecated:** Use `GET /limits` instead for rate limits and send limits.
   * > This endpoint will be removed in a future version.
   *
   * Returns current usage and limit information for your account.
   *
   * This endpoint is designed for:
   *
   * - **AI agents/MCP servers:** Check constraints before planning batch operations
   * - **Monitoring dashboards:** Display current usage status
   * - **Rate limit awareness:** Know remaining capacity before making requests
   *
   * **Response includes:**
   *
   * - `rateLimit` - API request rate limit (requests per second)
   * - `sendLimit` - Email sending limit (emails per hour)
   * - `billing` - Credit balance and auto-recharge configuration
   *
   * **Notes:**
   *
   * - This request counts against your rate limit
   * - `sendLimit` may be null if Postal is temporarily unavailable
   * - `billing` is null if billing is not configured
   * - Send limit resets at the top of each hour
   *
   * **Migration:**
   *
   * - For rate limits and send limits, use `GET /limits`
   * - For per-tenant usage analytics, use `GET /tenants/{tenantId}/usage`
   * - For bulk tenant usage, use `GET /usage/by-tenant`
   *
   * @deprecated
   */
  retrieve(options?: RequestOptions): APIPromise<UsageRetrieveResponse> {
    return this._client.get('/usage', options);
  }

  /**
   * Export usage data for all tenants in a format suitable for billing systems.
   *
   * **Use cases:**
   *
   * - Import into billing systems (Stripe, Chargebee, etc.)
   * - Generate invoices
   * - Archive usage data
   *
   * **Export formats:**
   *
   * - `csv` - Comma-separated values (default)
   * - `jsonl` - JSON Lines (one JSON object per line)
   * - `json` - JSON array
   *
   * **Response headers:**
   *
   * - `X-Total-Tenants` - Total number of tenants in export
   * - `X-Total-Sent` - Total emails sent across all tenants
   * - `Content-Disposition` - Suggested filename for download
   *
   * This endpoint returns up to 10,000 tenants per request. For organizations with
   * more tenants, use the `/usage/by-tenant` endpoint with pagination.
   *
   * @example
   * ```ts
   * const response = await client.usage.export();
   * ```
   */
  export(
    query: UsageExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsageExportResponse> {
    return this._client.get('/usage/export', { query, ...options });
  }

  /**
   * Returns email usage statistics for all tenants in your organization.
   *
   * **Use cases:**
   *
   * - Generate monthly billing reports
   * - Build admin dashboards showing all customer usage
   * - Identify high-volume or problematic tenants
   *
   * **Sorting options:**
   *
   * - `sent`, `-sent` - Sort by emails sent (ascending/descending)
   * - `delivered`, `-delivered` - Sort by emails delivered
   * - `bounce_rate`, `-bounce_rate` - Sort by bounce rate
   * - `name`, `-name` - Sort alphabetically by tenant name
   *
   * **Filtering:**
   *
   * - `status` - Filter by tenant status (active, suspended, archived)
   * - `min_sent` - Only include tenants with at least N emails sent
   *
   * Results are paginated. Use `limit` and `offset` for pagination.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const usage of client.usage.listByTenant()) {
   *   // ...
   * }
   * ```
   */
  listByTenant(
    query: UsageListByTenantParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BulkTenantUsageTenantsOffsetPagination, BulkTenantUsage.Tenant> {
    return this._client.getAPIList('/usage/by-tenant', OffsetPagination<BulkTenantUsage.Tenant>, {
      query,
      ...options,
    });
  }

  /**
   * Returns time-bucketed email statistics for a specific tenant.
   *
   * **Use cases:**
   *
   * - Build usage charts and graphs
   * - Identify sending patterns
   * - Detect anomalies in delivery rates
   *
   * **Granularity options:**
   *
   * - `hour` - Hourly buckets (best for last 7 days)
   * - `day` - Daily buckets (best for last 30-90 days)
   * - `week` - Weekly buckets (best for last 6 months)
   * - `month` - Monthly buckets (best for year-over-year)
   *
   * The response includes a data point for each time bucket with all email metrics.
   *
   * @example
   * ```ts
   * const response =
   *   await client.usage.retrieveTenantTimeseries(
   *     'cm6abc123def456',
   *   );
   * ```
   */
  retrieveTenantTimeseries(
    tenantID: string,
    query: UsageRetrieveTenantTimeseriesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsageRetrieveTenantTimeseriesResponse> {
    return this._client.get(path`/tenants/${tenantID}/usage/timeseries`, { query, ...options });
  }

  /**
   * Returns email sending statistics for a specific tenant over a time period.
   *
   * **Use cases:**
   *
   * - Display usage dashboard to your customers
   * - Calculate per-tenant billing
   * - Monitor tenant health and delivery rates
   *
   * **Period formats:**
   *
   * - Shortcuts: `today`, `yesterday`, `this_week`, `last_week`, `this_month`,
   *   `last_month`, `last_7_days`, `last_30_days`, `last_90_days`
   * - Month: `2024-01` (full month)
   * - Date range: `2024-01-01..2024-01-31`
   * - Single day: `2024-01-15`
   *
   * **Response includes:**
   *
   * - `emails` - Counts for sent, delivered, soft_failed, hard_failed, bounced, held
   * - `rates` - Delivery rate and bounce rate as decimals (0.95 = 95%)
   *
   * @example
   * ```ts
   * const response = await client.usage.retrieveTenantUsage(
   *   'cm6abc123def456',
   * );
   * ```
   */
  retrieveTenantUsage(
    tenantID: string,
    query: UsageRetrieveTenantUsageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsageRetrieveTenantUsageResponse> {
    return this._client.get(path`/tenants/${tenantID}/usage`, { query, ...options });
  }
}

export type BulkTenantUsageTenantsOffsetPagination = OffsetPagination<BulkTenantUsage.Tenant>;

/**
 * Bulk tenant usage data with pagination
 */
export interface BulkTenantUsage {
  /**
   * Pagination information for usage queries
   */
  pagination: BulkTenantUsage.Pagination;

  /**
   * Time period for usage data
   */
  period: UsagePeriod;

  /**
   * Aggregate summary across all tenants
   */
  summary: BulkTenantUsage.Summary;

  /**
   * Array of tenant usage records
   */
  tenants: Array<BulkTenantUsage.Tenant>;
}

export namespace BulkTenantUsage {
  /**
   * Pagination information for usage queries
   */
  export interface Pagination {
    /**
     * Whether more pages are available
     */
    has_more: boolean;

    /**
     * Maximum items per page
     */
    limit: number;

    /**
     * Number of items skipped
     */
    offset: number;

    /**
     * Total number of tenants matching the query
     */
    total: number;
  }

  /**
   * Aggregate summary across all tenants
   */
  export interface Summary {
    /**
     * Total emails delivered across all tenants
     */
    total_delivered: number;

    /**
     * Total emails sent across all tenants
     */
    total_sent: number;

    /**
     * Total number of tenants in the query
     */
    total_tenants: number;
  }

  /**
   * Usage record for a single tenant in bulk response
   */
  export interface Tenant {
    /**
     * Email delivery counts
     */
    emails: UsageAPI.EmailCounts;

    /**
     * Email delivery rates (as decimals, e.g., 0.95 = 95%)
     */
    rates: UsageAPI.EmailRates;

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
 * Tenant usage statistics
 */
export interface TenantUsage {
  /**
   * Email delivery counts
   */
  emails: EmailCounts;

  /**
   * Time period for usage data
   */
  period: UsagePeriod;

  /**
   * Email delivery rates (as decimals, e.g., 0.95 = 95%)
   */
  rates: EmailRates;

  /**
   * Unique tenant identifier
   */
  tenant_id: string;

  /**
   * Tenant display name
   */
  tenant_name: string;

  /**
   * Your external ID for this tenant (from metadata)
   */
  external_id?: string | null;
}

/**
 * Timeseries usage statistics
 */
export interface TenantUsageTimeseries {
  /**
   * Array of time-bucketed data points
   */
  data: Array<TenantUsageTimeseries.Data>;

  /**
   * Time bucket granularity
   */
  granularity: 'hour' | 'day' | 'week' | 'month';

  /**
   * Time period for usage data
   */
  period: UsagePeriod;

  /**
   * Unique tenant identifier
   */
  tenant_id: string;

  /**
   * Tenant display name
   */
  tenant_name: string;
}

export namespace TenantUsageTimeseries {
  /**
   * Single timeseries data point
   */
  export interface Data {
    /**
     * Bounces in this bucket
     */
    bounced: number;

    /**
     * Emails delivered in this bucket
     */
    delivered: number;

    /**
     * Hard failures in this bucket
     */
    hard_failed: number;

    /**
     * Emails held in this bucket
     */
    held: number;

    /**
     * Emails sent in this bucket
     */
    sent: number;

    /**
     * Soft failures in this bucket
     */
    soft_failed: number;

    /**
     * Start of time bucket
     */
    timestamp: string;
  }
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

/**
 * Account usage and limits response
 */
export interface UsageRetrieveResponse {
  /**
   * Current usage and limit information
   */
  data: LimitsAPI.LimitsData;

  meta: Shared.APIMeta;

  success: true;
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

/**
 * Timeseries usage data for a tenant
 */
export interface UsageRetrieveTenantTimeseriesResponse {
  /**
   * Timeseries usage statistics
   */
  data: TenantUsageTimeseries;

  meta: Shared.APIMeta;

  success: true;
}

/**
 * Usage statistics for a single tenant
 */
export interface UsageRetrieveTenantUsageResponse {
  /**
   * Tenant usage statistics
   */
  data: TenantUsage;

  meta: Shared.APIMeta;

  success: true;
}

export interface UsageExportParams {
  /**
   * Export format
   */
  format?: 'csv' | 'jsonl' | 'json';

  /**
   * Only include tenants with at least this many emails sent
   */
  min_sent?: number;

  /**
   * Time period for export. Defaults to current month.
   */
  period?: string;

  /**
   * Filter by tenant status
   */
  status?: 'active' | 'suspended' | 'archived';

  /**
   * Timezone for period calculations (IANA format). Defaults to UTC.
   */
  timezone?: string;
}

export interface UsageListByTenantParams extends OffsetPaginationParams {
  /**
   * Only include tenants with at least this many emails sent
   */
  min_sent?: number;

  /**
   * Time period for usage data. Defaults to current month.
   */
  period?: string;

  /**
   * Sort order for results. Prefix with `-` for descending order.
   */
  sort?: 'sent' | '-sent' | 'delivered' | '-delivered' | 'bounce_rate' | '-bounce_rate' | 'name' | '-name';

  /**
   * Filter by tenant status
   */
  status?: 'active' | 'suspended' | 'archived';

  /**
   * Timezone for period calculations (IANA format). Defaults to UTC.
   */
  timezone?: string;
}

export interface UsageRetrieveTenantTimeseriesParams {
  /**
   * Time bucket size for data points
   */
  granularity?: 'hour' | 'day' | 'week' | 'month';

  /**
   * Time period for timeseries data. Defaults to current month.
   */
  period?: string;

  /**
   * Timezone for period calculations (IANA format). Defaults to UTC.
   */
  timezone?: string;
}

export interface UsageRetrieveTenantUsageParams {
  /**
   * Time period for usage data. Defaults to current month.
   *
   * **Formats:**
   *
   * - Shortcuts: `today`, `yesterday`, `this_week`, `last_week`, `this_month`,
   *   `last_month`, `last_7_days`, `last_30_days`, `last_90_days`
   * - Month: `2024-01`
   * - Range: `2024-01-01..2024-01-31`
   * - Day: `2024-01-15`
   */
  period?: string;

  /**
   * Timezone for period calculations (IANA format). Defaults to UTC.
   */
  timezone?: string;
}

export declare namespace Usage {
  export {
    type BulkTenantUsage as BulkTenantUsage,
    type EmailCounts as EmailCounts,
    type EmailRates as EmailRates,
    type TenantUsage as TenantUsage,
    type TenantUsageTimeseries as TenantUsageTimeseries,
    type UsagePeriod as UsagePeriod,
    type UsageRetrieveResponse as UsageRetrieveResponse,
    type UsageExportResponse as UsageExportResponse,
    type UsageRetrieveTenantTimeseriesResponse as UsageRetrieveTenantTimeseriesResponse,
    type UsageRetrieveTenantUsageResponse as UsageRetrieveTenantUsageResponse,
    type BulkTenantUsageTenantsOffsetPagination as BulkTenantUsageTenantsOffsetPagination,
    type UsageExportParams as UsageExportParams,
    type UsageListByTenantParams as UsageListByTenantParams,
    type UsageRetrieveTenantTimeseriesParams as UsageRetrieveTenantTimeseriesParams,
    type UsageRetrieveTenantUsageParams as UsageRetrieveTenantUsageParams,
  };
}
