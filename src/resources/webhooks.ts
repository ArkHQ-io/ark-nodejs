// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Webhooks extends APIResource {
  /**
   * Create a webhook endpoint to receive email event notifications.
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
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   name: 'My App Webhook',
   *   url: 'https://myapp.com/webhooks/email',
   *   events: [
   *     'MessageSent',
   *     'MessageDeliveryFailed',
   *     'MessageBounced',
   *   ],
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/webhooks', { body, ...options });
  }

  /**
   * Get webhook details
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.retrieve('webhookId');
   * ```
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<WebhookRetrieveResponse> {
    return this._client.get(path`/webhooks/${webhookID}`, options);
  }

  /**
   * Update a webhook
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.update('webhookId');
   * ```
   */
  update(
    webhookID: string,
    body: WebhookUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebhookUpdateResponse> {
    return this._client.patch(path`/webhooks/${webhookID}`, { body, ...options });
  }

  /**
   * Get all configured webhook endpoints
   *
   * @example
   * ```ts
   * const webhooks = await client.webhooks.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/webhooks', options);
  }

  /**
   * Delete a webhook
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.delete('webhookId');
   * ```
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return this._client.delete(path`/webhooks/${webhookID}`, options);
  }

  /**
   * Get a paginated list of delivery attempts for a specific webhook.
   *
   * Use this to:
   *
   * - Monitor webhook health and delivery success rate
   * - Debug failed deliveries
   * - Find specific events to replay
   *
   * **Filtering:**
   *
   * - Filter by success/failure to find problematic deliveries
   * - Filter by event type to find specific events
   * - Filter by time range for debugging recent issues
   *
   * **Retry behavior:** Failed deliveries are automatically retried with exponential
   * backoff over ~3 days. Check `willRetry` to see if more attempts are scheduled.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.listDeliveries(
   *   'webhookId',
   * );
   * ```
   */
  listDeliveries(
    webhookID: string,
    query: WebhookListDeliveriesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookListDeliveriesResponse> {
    return this._client.get(path`/webhooks/${webhookID}/deliveries`, { query, ...options });
  }

  /**
   * Re-send a webhook delivery to your endpoint.
   *
   * **Use cases:**
   *
   * - Recover from transient failures after fixing your endpoint
   * - Test endpoint changes with real historical data
   * - Retry deliveries that failed due to downtime
   *
   * **How it works:**
   *
   * 1. Fetches the original payload from the delivery
   * 2. Generates a new timestamp and signature
   * 3. Sends to your webhook URL immediately
   * 4. Returns the result (does not queue for retry if it fails)
   *
   * **Note:** The webhook must be enabled to replay deliveries.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.replayDelivery(
   *   'deliveryId',
   *   { webhookId: 'webhookId' },
   * );
   * ```
   */
  replayDelivery(
    deliveryID: string,
    params: WebhookReplayDeliveryParams,
    options?: RequestOptions,
  ): APIPromise<WebhookReplayDeliveryResponse> {
    const { webhookId } = params;
    return this._client.post(path`/webhooks/${webhookId}/deliveries/${deliveryID}/replay`, options);
  }

  /**
   * Get detailed information about a specific webhook delivery attempt.
   *
   * Returns:
   *
   * - The complete request payload that was sent
   * - Request headers including the signature
   * - Response status code and body from your endpoint
   * - Timing information
   *
   * Use this to debug why a delivery failed or verify what data was sent.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.retrieveDelivery(
   *   'deliveryId',
   *   { webhookId: 'webhookId' },
   * );
   * ```
   */
  retrieveDelivery(
    deliveryID: string,
    params: WebhookRetrieveDeliveryParams,
    options?: RequestOptions,
  ): APIPromise<WebhookRetrieveDeliveryResponse> {
    const { webhookId } = params;
    return this._client.get(path`/webhooks/${webhookId}/deliveries/${deliveryID}`, options);
  }

  /**
   * Send a test payload to your webhook endpoint and verify it receives the data
   * correctly.
   *
   * Use this to:
   *
   * - Verify your webhook URL is accessible
   * - Test your signature verification code
   * - Ensure your server handles the payload format correctly
   *
   * **Test payload format:** The test payload is identical to real webhook payloads,
   * containing sample data for the specified event type. Your webhook should respond
   * with a 2xx status code.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.test('webhookId', {
   *   event: 'MessageSent',
   * });
   * ```
   */
  test(
    webhookID: string,
    body: WebhookTestParams,
    options?: RequestOptions,
  ): APIPromise<WebhookTestResponse> {
    return this._client.post(path`/webhooks/${webhookID}/test`, { body, ...options });
  }
}

export interface WebhookCreateResponse {
  data: WebhookCreateResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookCreateResponse {
  export interface Data {
    /**
     * Webhook ID
     */
    id: string;

    /**
     * Whether subscribed to all events
     */
    allEvents: boolean;

    createdAt: string;

    /**
     * Whether the webhook is active
     */
    enabled: boolean;

    /**
     * Subscribed events
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

    /**
     * Webhook endpoint URL
     */
    url: string;

    uuid: string;
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
     * Webhook ID
     */
    id: string;

    /**
     * Whether subscribed to all events
     */
    allEvents: boolean;

    createdAt: string;

    /**
     * Whether the webhook is active
     */
    enabled: boolean;

    /**
     * Subscribed events
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

    /**
     * Webhook endpoint URL
     */
    url: string;

    uuid: string;
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
     * Webhook ID
     */
    id: string;

    /**
     * Whether subscribed to all events
     */
    allEvents: boolean;

    createdAt: string;

    /**
     * Whether the webhook is active
     */
    enabled: boolean;

    /**
     * Subscribed events
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

    /**
     * Webhook endpoint URL
     */
    url: string;

    uuid: string;
  }
}

export interface WebhookListResponse {
  data: WebhookListResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookListResponse {
  export interface Data {
    webhooks: Array<Data.Webhook>;
  }

  export namespace Data {
    export interface Webhook {
      /**
       * Webhook ID
       */
      id: string;

      enabled: boolean;

      events: Array<string>;

      name: string;

      url: string;
    }
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
 * Paginated list of webhook delivery attempts
 */
export interface WebhookListDeliveriesResponse {
  data: Array<WebhookListDeliveriesResponse.Data>;

  meta: Shared.APIMeta;

  /**
   * Current page number
   */
  page: number;

  /**
   * Items per page
   */
  perPage: number;

  /**
   * Total number of deliveries matching the filter
   */
  total: number;

  /**
   * Total number of pages
   */
  totalPages: number;
}

export namespace WebhookListDeliveriesResponse {
  /**
   * Summary of a webhook delivery attempt
   */
  export interface Data {
    /**
     * Unique delivery ID (UUID)
     */
    id: string;

    /**
     * Attempt number (1 for first attempt, increments with retries)
     */
    attempt: number;

    /**
     * Event type that triggered this delivery
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
     * HTTP status code returned by the endpoint (null if connection failed)
     */
    statusCode: number | null;

    /**
     * Whether the delivery was successful (2xx response)
     */
    success: boolean;

    /**
     * When this delivery attempt occurred
     */
    timestamp: string;

    /**
     * URL the webhook was delivered to
     */
    url: string;

    /**
     * ID of the webhook this delivery belongs to
     */
    webhookId: string;

    /**
     * Whether this delivery will be retried (true if failed and retries remaining)
     */
    willRetry: boolean;
  }
}

/**
 * Result of replaying a webhook delivery
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
     * Whether the replay was successful (2xx response from endpoint)
     */
    success: boolean;

    /**
     * When the replay was executed
     */
    timestamp: string;
  }
}

/**
 * Detailed information about a webhook delivery attempt
 */
export interface WebhookRetrieveDeliveryResponse {
  /**
   * Full details of a webhook delivery including request and response
   */
  data: WebhookRetrieveDeliveryResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace WebhookRetrieveDeliveryResponse {
  /**
   * Full details of a webhook delivery including request and response
   */
  export interface Data {
    /**
     * Unique delivery ID (UUID)
     */
    id: string;

    /**
     * Attempt number for this delivery
     */
    attempt: number;

    /**
     * Event type that triggered this delivery
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
     * The request that was sent to your endpoint
     */
    request: Data.Request;

    /**
     * The response received from your endpoint
     */
    response: Data.Response;

    /**
     * HTTP status code returned by the endpoint
     */
    statusCode: number | null;

    /**
     * Whether the delivery was successful (2xx response)
     */
    success: boolean;

    /**
     * When this delivery attempt occurred
     */
    timestamp: string;

    /**
     * URL the webhook was delivered to
     */
    url: string;

    /**
     * ID of the webhook this delivery belongs to
     */
    webhookId: string;

    /**
     * Name of the webhook for easy identification
     */
    webhookName: string;

    /**
     * Whether this delivery will be retried
     */
    willRetry: boolean;
  }

  export namespace Data {
    /**
     * The request that was sent to your endpoint
     */
    export interface Request {
      /**
       * HTTP headers that were sent with the request
       */
      headers: { [key: string]: string };

      /**
       * The complete webhook payload that was sent
       */
      payload: { [key: string]: unknown };
    }

    /**
     * The response received from your endpoint
     */
    export interface Response {
      /**
       * HTTP status code from your endpoint
       */
      statusCode: number | null;

      /**
       * Response body from your endpoint (may be truncated)
       */
      body?: string | null;
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
    duration: number;

    /**
     * Event type that was tested
     */
    event: string;

    /**
     * HTTP status code from the webhook endpoint
     */
    statusCode: number | null;

    /**
     * Whether the webhook endpoint responded with a 2xx status
     */
    success: boolean;

    /**
     * Response body from the webhook endpoint (truncated if too long)
     */
    body?: string | null;

    /**
     * Error message if the request failed
     */
    error?: string | null;
  }
}

export interface WebhookCreateParams {
  /**
   * Webhook name for identification
   */
  name: string;

  /**
   * HTTPS endpoint URL
   */
  url: string;

  /**
   * Subscribe to all events (ignores events array, accepts null)
   */
  allEvents?: boolean | null;

  /**
   * Whether the webhook is enabled (accepts null)
   */
  enabled?: boolean | null;

  /**
   * Events to subscribe to (accepts null):
   *
   * - `MessageSent` - Email successfully delivered to recipient's server
   * - `MessageDelayed` - Temporary delivery failure, will retry
   * - `MessageDeliveryFailed` - Permanent delivery failure
   * - `MessageHeld` - Email held for manual review
   * - `MessageBounced` - Email bounced back
   * - `MessageLinkClicked` - Recipient clicked a tracked link
   * - `MessageLoaded` - Recipient opened the email (tracking pixel loaded)
   * - `DomainDNSError` - DNS configuration issue detected
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
  > | null;
}

export interface WebhookUpdateParams {
  allEvents?: boolean | null;

  enabled?: boolean | null;

  events?: Array<string> | null;

  name?: string | null;

  url?: string | null;
}

export interface WebhookListDeliveriesParams {
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
   * Page number (default 1)
   */
  page?: number;

  /**
   * Items per page (default 30, max 100)
   */
  perPage?: number;

  /**
   * Filter by delivery success (true = 2xx response, false = non-2xx or error)
   */
  success?: boolean;
}

export interface WebhookReplayDeliveryParams {
  /**
   * Webhook ID or UUID
   */
  webhookId: string;
}

export interface WebhookRetrieveDeliveryParams {
  /**
   * Webhook ID or UUID
   */
  webhookId: string;
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
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListDeliveriesParams as WebhookListDeliveriesParams,
    type WebhookReplayDeliveryParams as WebhookReplayDeliveryParams,
    type WebhookRetrieveDeliveryParams as WebhookRetrieveDeliveryParams,
    type WebhookTestParams as WebhookTestParams,
  };
}
