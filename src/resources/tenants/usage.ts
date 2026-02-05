// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as UsageAPI from '../usage';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Usage extends APIResource {
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
   * const usage = await client.tenants.usage.retrieve(
   *   'cm6abc123def456',
   * );
   * ```
   */
  retrieve(
    tenantID: string,
    query: UsageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsageRetrieveResponse> {
    return this._client.get(path`/tenants/${tenantID}/usage`, { query, ...options });
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
   *   await client.tenants.usage.retrieveTimeseries(
   *     'cm6abc123def456',
   *   );
   * ```
   */
  retrieveTimeseries(
    tenantID: string,
    query: UsageRetrieveTimeseriesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsageRetrieveTimeseriesResponse> {
    return this._client.get(path`/tenants/${tenantID}/usage/timeseries`, { query, ...options });
  }
}

/**
 * Tenant usage statistics
 */
export interface TenantUsage {
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
  period: UsageAPI.UsagePeriod;

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
 * Usage statistics for a single tenant
 */
export interface UsageRetrieveResponse {
  /**
   * Tenant usage statistics
   */
  data: TenantUsage;

  meta: Shared.APIMeta;

  success: true;
}

/**
 * Timeseries usage data for a tenant
 */
export interface UsageRetrieveTimeseriesResponse {
  /**
   * Timeseries usage statistics
   */
  data: TenantUsageTimeseries;

  meta: Shared.APIMeta;

  success: true;
}

export interface UsageRetrieveParams {
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

export interface UsageRetrieveTimeseriesParams {
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

export declare namespace Usage {
  export {
    type TenantUsage as TenantUsage,
    type TenantUsageTimeseries as TenantUsageTimeseries,
    type UsageRetrieveResponse as UsageRetrieveResponse,
    type UsageRetrieveTimeseriesResponse as UsageRetrieveTimeseriesResponse,
    type UsageRetrieveParams as UsageRetrieveParams,
    type UsageRetrieveTimeseriesParams as UsageRetrieveTimeseriesParams,
  };
}
