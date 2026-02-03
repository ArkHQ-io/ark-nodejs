// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Limits extends APIResource {
  /**
   * Returns current rate limit and send limit information for your account.
   *
   * This endpoint is the recommended way to check your account's operational limits.
   * Use `/usage` endpoints for historical usage analytics.
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
   */
  retrieve(options?: RequestOptions): APIPromise<LimitRetrieveResponse> {
    return this._client.get('/limits', options);
  }
}

/**
 * Current usage and limit information
 */
export interface LimitsData {
  /**
   * Billing and credit information
   */
  billing: LimitsData.Billing | null;

  /**
   * API rate limit status
   */
  rateLimit: LimitsData.RateLimit;

  /**
   * Email send limit status (hourly cap)
   */
  sendLimit: LimitsData.SendLimit | null;
}

export namespace LimitsData {
  /**
   * Billing and credit information
   */
  export interface Billing {
    /**
     * Auto-recharge configuration
     */
    autoRecharge: Billing.AutoRecharge;

    /**
     * Current credit balance as formatted string (e.g., "25.50")
     */
    creditBalance: string;

    /**
     * Current credit balance in cents for precise calculations
     */
    creditBalanceCents: number;

    /**
     * Whether a payment method is configured
     */
    hasPaymentMethod: boolean;
  }

  export namespace Billing {
    /**
     * Auto-recharge configuration
     */
    export interface AutoRecharge {
      /**
       * Amount to recharge when triggered
       */
      amount: string;

      /**
       * Whether auto-recharge is enabled
       */
      enabled: boolean;

      /**
       * Balance threshold that triggers recharge
       */
      threshold: string;
    }
  }

  /**
   * API rate limit status
   */
  export interface RateLimit {
    /**
     * Maximum requests allowed per period
     */
    limit: number;

    /**
     * Time period for the limit
     */
    period: 'second';

    /**
     * Requests remaining in current window
     */
    remaining: number;

    /**
     * Unix timestamp when the limit resets
     */
    reset: number;
  }

  /**
   * Email send limit status (hourly cap)
   */
  export interface SendLimit {
    /**
     * Whether approaching the limit (>90%)
     */
    approaching: boolean;

    /**
     * Whether the limit has been exceeded
     */
    exceeded: boolean;

    /**
     * Maximum emails allowed per hour (null = unlimited)
     */
    limit: number | null;

    /**
     * Time period for the limit
     */
    period: 'hour';

    /**
     * Emails remaining in current period (null if unlimited)
     */
    remaining: number | null;

    /**
     * ISO timestamp when the limit window resets (top of next hour)
     */
    resetsAt: string;

    /**
     * Usage as a percentage (null if unlimited)
     */
    usagePercent: number | null;

    /**
     * Emails sent in current period
     */
    used: number;
  }
}

/**
 * Account rate limits and send limits response
 */
export interface LimitRetrieveResponse {
  /**
   * Current usage and limit information
   */
  data: LimitsData;

  meta: Shared.APIMeta;

  success: true;
}

export declare namespace Limits {
  export { type LimitsData as LimitsData, type LimitRetrieveResponse as LimitRetrieveResponse };
}
