// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Webhooks extends APIResource {
  /**
   * Create a platform webhook to receive email event notifications from all tenants.
   *
   * Platform webhooks receive events from **all tenants** in your organization. Each
   * webhook payload includes a `tenant_id` field to identify which tenant the event
   * belongs to.
   *
   * **Available events:**
   *
   * - `MessageSent` - Email accepted by recipient server
   * - `MessageDeliveryFailed` - Delivery permanently failed
   * - `MessageDelayed` - Delivery temporarily failed, will retry
   * - `MessageBounced` - Email bounced
   * - `MessageHeld` - Email held for review
   * - `MessageLinkClicked` - Recipient clicked a link
   * - `MessageLoaded` - Recipient opened the email
   * - `DomainDNSError` - Domain DNS issue detected
   *
   * **Webhook payload includes:**
   *
   * - `event` - The event type
   * - `tenant_id` - The tenant that sent the email
   * - `timestamp` - Unix timestamp of the event
   * - `payload` - Event-specific data (message details, status, etc.)
   *
   * @example
   * ```ts
   * const webhook = await client.platform.webhooks.create({
   *   name: 'Central Event Processor',
   *   url: 'https://myplatform.com/webhooks/email-events',
   *   events: [
   *     'MessageSent',
   *     'MessageDeliveryFailed',
   *     'MessageBounced',
   *   ],
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/platform/webhooks', { body, ...options });
  }

  /**
   * Get detailed information about a specific platform webhook.
   *
   * @example
   * ```ts
   * const webhook = await client.platform.webhooks.retrieve(
   *   'pwh_abc123def456',
   * );
   * ```
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<WebhookRetrieveResponse> {
    return this._client.get(path`/platform/webhooks/${webhookID}`, options);
  }

  /**
   * Update a platform webhook's configuration.
   *
   * You can update:
   *
   * - `name` - Display name for the webhook
   * - `url` - The endpoint URL (must be HTTPS)
   * - `events` - Array of event types to receive (empty array = all events)
   * - `enabled` - Enable or disable the webhook
   *
   * @example
   * ```ts
   * const webhook = await client.platform.webhooks.update(
   *   'pwh_abc123def456',
   * );
   * ```
   */
  update(
    webhookID: string,
    body: WebhookUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebhookUpdateResponse> {
    return this._client.patch(path`/platform/webhooks/${webhookID}`, { body, ...options });
  }

  /**
   * Get all platform webhook endpoints configured for your organization.
   *
   * Platform webhooks receive events from **all tenants** in your organization,
   * unlike tenant webhooks which only receive events for a specific tenant. This is
   * useful for centralized event processing and monitoring.
   *
   * @example
   * ```ts
   * const webhooks = await client.platform.webhooks.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/platform/webhooks', options);
  }

  /**
   * Delete a platform webhook. This stops all event delivery to the webhook URL.
   * This action cannot be undone.
   *
   * @example
   * ```ts
   * const webhook = await client.platform.webhooks.delete(
   *   'pwh_abc123def456',
   * );
   * ```
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return this._client.delete(path`/platform/webhooks/${webhookID}`, options);
  }

  /**
   * Get a paginated list of platform webhook delivery attempts.
   *
   * Filter by:
   *
   * - `webhookId` - Specific webhook
   * - `tenantId` - Specific tenant
   * - `event` - Specific event type
   * - `success` - Successful (2xx) or failed deliveries
   * - `before`/`after` - Time range (Unix timestamps)
   *
   * Deliveries are returned in reverse chronological order.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhookListDeliveriesResponse of client.platform.webhooks.listDeliveries()) {
   *   // ...
   * }
   * ```
   */
  listDeliveries(
    query: WebhookListDeliveriesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookListDeliveriesResponsesPageNumberPagination, WebhookListDeliveriesResponse> {
    return this._client.getAPIList(
      '/platform/webhooks/deliveries',
      PageNumberPagination<WebhookListDeliveriesResponse>,
      { query, ...options },
    );
  }

  /**
   * Replay a previous platform webhook delivery.
   *
   * This re-sends the original payload with a new timestamp and delivery ID. Useful
   * for recovering from temporary endpoint failures.
   *
   * @example
   * ```ts
   * const response =
   *   await client.platform.webhooks.replayDelivery(
   *     'pwd_abc123def456',
   *   );
   * ```
   */
  replayDelivery(deliveryID: string, options?: RequestOptions): APIPromise<WebhookReplayDeliveryResponse> {
    return this._client.post(path`/platform/webhooks/deliveries/${deliveryID}/replay`, options);
  }

  /**
   * Get detailed information about a specific platform webhook delivery.
   *
   * Returns the complete request payload, headers, response, and timing info.
   *
   * @example
   * ```ts
   * const response =
   *   await client.platform.webhooks.retrieveDelivery(
   *     'pwd_abc123def456',
   *   );
   * ```
   */
  retrieveDelivery(
    deliveryID: string,
    options?: RequestOptions,
  ): APIPromise<WebhookRetrieveDeliveryResponse> {
    return this._client.get(path`/platform/webhooks/deliveries/${deliveryID}`, options);
  }

  /**
   * Send a test payload to your platform webhook endpoint.
   *
   * Use this to:
   *
   * - Verify your webhook URL is accessible
   * - Test your payload handling code
   * - Ensure your server responds correctly
   *
   * The test payload is marked with `_test: true` so you can distinguish test events
   * from real events.
   *
   * @example
   * ```ts
   * const response = await client.platform.webhooks.test(
   *   'pwh_abc123def456',
   *   { event: 'MessageSent' },
   * );
   * ```
   */
  test(
    webhookID: string,
    body: WebhookTestParams,
    options?: RequestOptions,
  ): APIPromise<WebhookTestResponse> {
    return this._client.post(path`/platform/webhooks/${webhookID}/test`, { body, ...options });
  }
}

export type WebhookListDeliveriesResponsesPageNumberPagination =
  PageNumberPagination<WebhookListDeliveriesResponse>;

export interface WebhookCreateResponse {
  data: WebhookCreateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookCreateResponse {
  export interface Data {
    /**
     * Platform webhook ID
     */
    id: string;

    createdAt: string;

    /**
     * Whether the webhook is active
     */
    enabled: boolean;

    /**
     * Subscribed events (empty = all events)
     */
    events: Array<
      | 'MessageSent'
      | 'MessageDelayed'
      | 'MessageDeliveryFailed'
      | 'MessageHeld'
      | 'MessageBounced'
      | 'MessageLinkClicked'
      | 'MessageLoaded'
      | 'DomainDNSError'
    >;

    /**
     * Webhook name for identification
     */
    name: string;

    updatedAt: string;

    /**
     * Webhook endpoint URL
     */
    url: string;
  }
}

export interface WebhookRetrieveResponse {
  data: WebhookRetrieveResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookRetrieveResponse {
  export interface Data {
    /**
     * Platform webhook ID
     */
    id: string;

    createdAt: string;

    /**
     * Whether the webhook is active
     */
    enabled: boolean;

    /**
     * Subscribed events (empty = all events)
     */
    events: Array<
      | 'MessageSent'
      | 'MessageDelayed'
      | 'MessageDeliveryFailed'
      | 'MessageHeld'
      | 'MessageBounced'
      | 'MessageLinkClicked'
      | 'MessageLoaded'
      | 'DomainDNSError'
    >;

    /**
     * Webhook name for identification
     */
    name: string;

    updatedAt: string;

    /**
     * Webhook endpoint URL
     */
    url: string;
  }
}

export interface WebhookUpdateResponse {
  data: WebhookUpdateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookUpdateResponse {
  export interface Data {
    /**
     * Platform webhook ID
     */
    id: string;

    createdAt: string;

    /**
     * Whether the webhook is active
     */
    enabled: boolean;

    /**
     * Subscribed events (empty = all events)
     */
    events: Array<
      | 'MessageSent'
      | 'MessageDelayed'
      | 'MessageDeliveryFailed'
      | 'MessageHeld'
      | 'MessageBounced'
      | 'MessageLinkClicked'
      | 'MessageLoaded'
      | 'DomainDNSError'
    >;

    /**
     * Webhook name for identification
     */
    name: string;

    updatedAt: string;

    /**
     * Webhook endpoint URL
     */
    url: string;
  }
}

export interface WebhookListResponse {
  data: Array<WebhookListResponse.Data>;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookListResponse {
  export interface Data {
    /**
     * Platform webhook ID
     */
    id: string;

    createdAt: string;

    enabled: boolean;

    events: Array<string>;

    name: string;

    url: string;
  }
}

export interface WebhookDeleteResponse {
  data: WebhookDeleteResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookDeleteResponse {
  export interface Data {
    message: string;
  }
}

/**
 * Summary of a platform webhook delivery attempt
 */
export interface WebhookListDeliveriesResponse {
  /**
   * Unique delivery ID
   */
  id: string;

  /**
   * Attempt number (1 for first attempt, higher for retries)
   */
  attempt: number;

  /**
   * Event type
   */
  event:
    | 'MessageSent'
    | 'MessageDelayed'
    | 'MessageDeliveryFailed'
    | 'MessageHeld'
    | 'MessageBounced'
    | 'MessageLinkClicked'
    | 'MessageLoaded'
    | 'DomainDNSError';

  /**
   * HTTP status code returned by your endpoint (null if connection failed)
   */
  statusCode: number | null;

  /**
   * Whether delivery was successful (2xx response)
   */
  success: boolean;

  /**
   * Tenant that triggered the event
   */
  tenantId: string;

  /**
   * When the delivery was attempted
   */
  timestamp: string;

  /**
   * Endpoint URL the delivery was sent to
   */
  url: string;

  /**
   * Platform webhook ID
   */
  webhookId: string;

  /**
   * Whether this delivery will be retried
   */
  willRetry: boolean;
}

/**
 * Result of replaying a platform webhook delivery
 */
export interface WebhookReplayDeliveryResponse {
  data: WebhookReplayDeliveryResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookReplayDeliveryResponse {
  export interface Data {
    /**
     * Request duration in milliseconds
     */
    duration: number;

    /**
     * ID of the new delivery created by the replay
     */
    newDeliveryId: string;

    /**
     * ID of the original delivery that was replayed
     */
    originalDeliveryId: string;

    /**
     * HTTP status code from your endpoint
     */
    statusCode: number | null;

    /**
     * Whether the replay was successful
     */
    success: boolean;

    /**
     * When the replay was executed
     */
    timestamp: string;
  }
}

export interface WebhookRetrieveDeliveryResponse {
  data: WebhookRetrieveDeliveryResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookRetrieveDeliveryResponse {
  export interface Data {
    /**
     * Unique delivery ID
     */
    id: string;

    /**
     * Attempt number
     */
    attempt: number;

    /**
     * Event type
     */
    event: string;

    /**
     * Request details
     */
    request: Data.Request;

    /**
     * Response details
     */
    response: Data.Response;

    /**
     * HTTP status code from your endpoint
     */
    statusCode: number | null;

    /**
     * Whether delivery was successful
     */
    success: boolean;

    /**
     * Tenant that triggered the event
     */
    tenantId: string;

    /**
     * When delivery was attempted
     */
    timestamp: string;

    /**
     * Endpoint URL
     */
    url: string;

    /**
     * Platform webhook ID
     */
    webhookId: string;

    /**
     * Platform webhook name
     */
    webhookName: string;

    /**
     * Whether this will be retried
     */
    willRetry: boolean;
  }

  export namespace Data {
    /**
     * Request details
     */
    export interface Request {
      /**
       * Request headers including signature
       */
      headers?: { [key: string]: string };

      /**
       * The complete webhook payload that was sent
       */
      payload?: { [key: string]: unknown };
    }

    /**
     * Response details
     */
    export interface Response {
      /**
       * Response body (truncated if too large)
       */
      body?: string | null;

      /**
       * Response time in milliseconds
       */
      duration?: number;
    }
  }
}

export interface WebhookTestResponse {
  data: WebhookTestResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookTestResponse {
  export interface Data {
    /**
     * Request duration in milliseconds
     */
    durationMs: number;

    /**
     * HTTP status code from the webhook endpoint
     */
    statusCode: number;

    /**
     * Whether the webhook endpoint responded with a 2xx status
     */
    success: boolean;

    /**
     * Error message if the request failed
     */
    error?: string | null;
  }
}

export interface WebhookCreateParams {
  /**
   * Display name for the webhook
   */
  name: string;

  /**
   * Webhook endpoint URL (must be HTTPS)
   */
  url: string;

  /**
   * Events to subscribe to. Empty array means all events.
   */
  events?: Array<
    | 'MessageSent'
    | 'MessageDelayed'
    | 'MessageDeliveryFailed'
    | 'MessageHeld'
    | 'MessageBounced'
    | 'MessageLinkClicked'
    | 'MessageLoaded'
    | 'DomainDNSError'
  >;
}

export interface WebhookUpdateParams {
  /**
   * Enable or disable the webhook
   */
  enabled?: boolean;

  /**
   * Events to subscribe to. Empty array means all events.
   */
  events?: Array<
    | 'MessageSent'
    | 'MessageDelayed'
    | 'MessageDeliveryFailed'
    | 'MessageHeld'
    | 'MessageBounced'
    | 'MessageLinkClicked'
    | 'MessageLoaded'
    | 'DomainDNSError'
  >;

  /**
   * Display name for the webhook
   */
  name?: string;

  /**
   * Webhook endpoint URL (must be HTTPS)
   */
  url?: string;
}

export interface WebhookListDeliveriesParams extends PageNumberPaginationParams {
  /**
   * Only deliveries after this Unix timestamp
   */
  after?: number;

  /**
   * Only deliveries before this Unix timestamp
   */
  before?: number;

  /**
   * Filter by event type
   */
  event?:
    | 'MessageSent'
    | 'MessageDelayed'
    | 'MessageDeliveryFailed'
    | 'MessageHeld'
    | 'MessageBounced'
    | 'MessageLinkClicked'
    | 'MessageLoaded'
    | 'DomainDNSError';

  /**
   * Filter by delivery success
   */
  success?: boolean;

  /**
   * Filter by tenant ID
   */
  tenantId?: string;

  /**
   * Filter by platform webhook ID
   */
  webhookId?: string;
}

export interface WebhookTestParams {
  /**
   * Event type to simulate
   */
  event:
    | 'MessageSent'
    | 'MessageDelayed'
    | 'MessageDeliveryFailed'
    | 'MessageHeld'
    | 'MessageBounced'
    | 'MessageLinkClicked'
    | 'MessageLoaded'
    | 'DomainDNSError';
}

export declare namespace Webhooks {
  export {
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookListDeliveriesResponse as WebhookListDeliveriesResponse,
    type WebhookReplayDeliveryResponse as WebhookReplayDeliveryResponse,
    type WebhookRetrieveDeliveryResponse as WebhookRetrieveDeliveryResponse,
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookListDeliveriesResponsesPageNumberPagination as WebhookListDeliveriesResponsesPageNumberPagination,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListDeliveriesParams as WebhookListDeliveriesParams,
    type WebhookTestParams as WebhookTestParams,
  };
}
