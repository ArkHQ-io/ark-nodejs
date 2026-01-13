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
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookTestParams as WebhookTestParams,
  };
}
