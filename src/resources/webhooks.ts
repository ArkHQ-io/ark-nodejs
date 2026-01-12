// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DomainsAPI from './domains';
import * as TrackingAPI from './tracking';
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
   * const webhookResponse = await client.webhooks.create({
   *   events: [
   *     'MessageSent',
   *     'MessageDeliveryFailed',
   *     'MessageBounced',
   *   ],
   *   name: 'My App Webhook',
   *   url: 'https://myapp.com/webhooks/email',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookResponse> {
    return this._client.post('/webhooks', { body, ...options });
  }

  /**
   * Get webhook details
   *
   * @example
   * ```ts
   * const webhookResponse = await client.webhooks.retrieve(
   *   'webhookId',
   * );
   * ```
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<WebhookResponse> {
    return this._client.get(path`/webhooks/${webhookID}`, options);
  }

  /**
   * Update a webhook
   *
   * @example
   * ```ts
   * const webhookResponse = await client.webhooks.update(
   *   'webhookId',
   * );
   * ```
   */
  update(
    webhookID: string,
    body: WebhookUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebhookResponse> {
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
   * const successResponse = await client.webhooks.delete(
   *   'webhookId',
   * );
   * ```
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<DomainsAPI.SuccessResponse> {
    return this._client.delete(path`/webhooks/${webhookID}`, options);
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

export interface WebhookResponse {
  data: WebhookResponse.Data;

  meta: TrackingAPI.APIMeta;

  success: true;
}

export namespace WebhookResponse {
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

    /**
     * Whether the webhook payloads are signed (always true for new webhooks)
     */
    signed?: boolean;
  }
}

export interface WebhookListResponse {
  data: WebhookListResponse.Data;

  meta: TrackingAPI.APIMeta;

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

      /**
       * Whether webhook payloads are signed
       */
      signed?: boolean;
    }
  }
}

export interface WebhookTestResponse {
  data: WebhookTestResponse.Data;

  meta: TrackingAPI.APIMeta;

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
   * Events to subscribe to:
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
   * HTTPS endpoint URL
   */
  url: string;

  /**
   * Subscribe to all events (ignores events array)
   */
  allEvents?: boolean;

  enabled?: boolean;
}

export interface WebhookUpdateParams {
  allEvents?: boolean;

  enabled?: boolean;

  events?: Array<string>;

  name?: string;

  url?: string;
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
    type WebhookResponse as WebhookResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookTestParams as WebhookTestParams,
  };
}
