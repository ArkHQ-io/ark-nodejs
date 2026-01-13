// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Emails extends APIResource {
  /**
   * Retrieve detailed information about a specific email including delivery status,
   * timestamps, and optionally the email content.
   *
   * Use the `expand` parameter to include additional data like the HTML/text body,
   * headers, or delivery attempts.
   *
   * @example
   * ```ts
   * const email = await client.emails.retrieve('emailId');
   * ```
   */
  retrieve(
    emailID: string,
    query: EmailRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/emails/${emailID}`, { query, ...options });
  }

  /**
   * Retrieve a paginated list of sent emails. Results are ordered by send time,
   * newest first.
   *
   * Use filters to narrow down results by status, recipient, sender, or tag.
   *
   * **Related endpoints:**
   *
   * - `GET /emails/{id}` - Get full details of a specific email
   * - `POST /emails` - Send a new email
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const emailListResponse of client.emails.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: EmailListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EmailListResponsesPageNumberPagination, EmailListResponse> {
    return this._client.getAPIList('/emails', PageNumberPagination<EmailListResponse>, { query, ...options });
  }

  /**
   * Get the history of delivery attempts for an email, including SMTP response codes
   * and timestamps.
   *
   * @example
   * ```ts
   * const response = await client.emails.retrieveDeliveries(
   *   'emailId',
   * );
   * ```
   */
  retrieveDeliveries(emailID: string, options?: RequestOptions): APIPromise<EmailRetrieveDeliveriesResponse> {
    return this._client.get(path`/emails/${emailID}/deliveries`, options);
  }

  /**
   * Retry delivery of a failed or soft-bounced email. Creates a new delivery
   * attempt.
   *
   * Only works for emails that have failed or are in a retryable state.
   *
   * @example
   * ```ts
   * const response = await client.emails.retry('emailId');
   * ```
   */
  retry(emailID: string, options?: RequestOptions): APIPromise<EmailRetryResponse> {
    return this._client.post(path`/emails/${emailID}/retry`, options);
  }

  /**
   * Send a single email message. The email is accepted for immediate delivery and
   * typically delivered within seconds.
   *
   * **Example use case:** Send a password reset email to a user.
   *
   * **Required fields:** `from`, `to`, `subject`, and either `html` or `text`
   *
   * **Idempotency:** Supports `Idempotency-Key` header for safe retries.
   *
   * **Related endpoints:**
   *
   * - `GET /emails/{id}` - Track delivery status
   * - `GET /emails/{id}/deliveries` - View delivery attempts
   * - `POST /emails/{id}/retry` - Retry failed delivery
   *
   * @example
   * ```ts
   * const response = await client.emails.send({
   *   from: 'Acme <hello@acme.com>',
   *   subject: 'Hello World',
   *   to: ['user@example.com'],
   *   html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
   * });
   * ```
   */
  send(params: EmailSendParams, options?: RequestOptions): APIPromise<EmailSendResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/emails', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Send up to 100 emails in a single request. Useful for sending personalized
   * emails to multiple recipients efficiently.
   *
   * Each email in the batch can have different content and recipients. Failed emails
   * don't affect other emails in the batch.
   *
   * **Idempotency:** Supports `Idempotency-Key` header for safe retries.
   *
   * @example
   * ```ts
   * const response = await client.emails.sendBatch({
   *   emails: [
   *     {
   *       to: ['alice@example.com'],
   *       subject: 'Hello Alice',
   *       html: '<p>Hi Alice, your order is ready!</p>',
   *       tag: 'order-ready',
   *     },
   *     {
   *       to: ['bob@example.com'],
   *       subject: 'Hello Bob',
   *       html: '<p>Hi Bob, your order is ready!</p>',
   *       tag: 'order-ready',
   *     },
   *   ],
   *   from: 'notifications@myapp.com',
   * });
   * ```
   */
  sendBatch(params: EmailSendBatchParams, options?: RequestOptions): APIPromise<EmailSendBatchResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/emails/batch', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Send a pre-formatted RFC 2822 MIME message. Use this for advanced use cases or
   * when migrating from systems that generate raw email content.
   *
   * The `data` field should contain the base64-encoded raw email.
   *
   * @example
   * ```ts
   * const response = await client.emails.sendRaw({
   *   data: 'data',
   *   mailFrom: 'dev@stainless.com',
   *   rcptTo: ['dev@stainless.com'],
   * });
   * ```
   */
  sendRaw(body: EmailSendRawParams, options?: RequestOptions): APIPromise<EmailSendRawResponse> {
    return this._client.post('/emails/raw', { body, ...options });
  }
}

export type EmailListResponsesPageNumberPagination = PageNumberPagination<EmailListResponse>;

export interface EmailRetrieveResponse {
  data: EmailRetrieveResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace EmailRetrieveResponse {
  export interface Data {
    /**
     * Internal message ID
     */
    id: string;

    /**
     * Unique message token used to retrieve this email via API. Combined with id to
     * form the full message identifier: msg*{id}*{token} Use this token with GET
     * /emails/{emailId} where emailId = "msg*{id}*{token}"
     */
    token: string;

    /**
     * Sender address
     */
    from: string;

    /**
     * Message direction
     */
    scope: 'outgoing' | 'incoming';

    /**
     * Current delivery status:
     *
     * - `pending` - Email accepted, waiting to be processed
     * - `sent` - Email transmitted to recipient's mail server
     * - `softfail` - Temporary delivery failure, will retry
     * - `hardfail` - Permanent delivery failure
     * - `bounced` - Email bounced back
     * - `held` - Held for manual review
     */
    status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held';

    /**
     * Email subject line
     */
    subject: string;

    /**
     * Unix timestamp when the email was sent
     */
    timestamp: number;

    /**
     * ISO 8601 formatted timestamp
     */
    timestampIso: string;

    /**
     * Recipient address
     */
    to: string;

    /**
     * Delivery attempt history (included if expand=deliveries)
     */
    deliveries?: Array<Data.Delivery>;

    /**
     * Email headers (included if expand=headers)
     */
    headers?: { [key: string]: string };

    /**
     * HTML body content (included if expand=content)
     */
    htmlBody?: string;

    /**
     * SMTP Message-ID header
     */
    messageId?: string;

    /**
     * Plain text body (included if expand=content)
     */
    plainBody?: string;

    /**
     * Whether the message was flagged as spam
     */
    spam?: boolean;

    /**
     * Spam score (if applicable)
     */
    spamScore?: number;

    /**
     * Optional categorization tag
     */
    tag?: string;
  }

  export namespace Data {
    export interface Delivery {
      /**
       * Delivery attempt ID
       */
      id: string;

      /**
       * Delivery status (lowercase)
       */
      status: string;

      /**
       * Unix timestamp
       */
      timestamp: number;

      /**
       * ISO 8601 timestamp
       */
      timestampIso: string;

      /**
       * SMTP response code
       */
      code?: number;

      /**
       * Status details
       */
      details?: string;

      /**
       * SMTP server response from the receiving mail server
       */
      output?: string;

      /**
       * Whether TLS was used
       */
      sentWithSsl?: boolean;
    }
  }
}

export interface EmailListResponse {
  /**
   * Internal message ID
   */
  id: string;

  token: string;

  from: string;

  /**
   * Current delivery status:
   *
   * - `pending` - Email accepted, waiting to be processed
   * - `sent` - Email transmitted to recipient's mail server
   * - `softfail` - Temporary delivery failure, will retry
   * - `hardfail` - Permanent delivery failure
   * - `bounced` - Email bounced back
   * - `held` - Held for manual review
   */
  status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held';

  subject: string;

  timestamp: number;

  timestampIso: string;

  to: string;

  tag?: string;
}

export interface EmailRetrieveDeliveriesResponse {
  data: EmailRetrieveDeliveriesResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace EmailRetrieveDeliveriesResponse {
  export interface Data {
    deliveries: Array<Data.Delivery>;

    /**
     * Internal message ID
     */
    messageId: string;

    /**
     * Message token
     */
    messageToken: string;
  }

  export namespace Data {
    export interface Delivery {
      /**
       * Delivery attempt ID
       */
      id: string;

      /**
       * Delivery status (lowercase)
       */
      status: string;

      /**
       * Unix timestamp
       */
      timestamp: number;

      /**
       * ISO 8601 timestamp
       */
      timestampIso: string;

      /**
       * SMTP response code
       */
      code?: number;

      /**
       * Status details
       */
      details?: string;

      /**
       * SMTP server response from the receiving mail server
       */
      output?: string;

      /**
       * Whether TLS was used
       */
      sentWithSsl?: boolean;
    }
  }
}

export interface EmailRetryResponse {
  data: EmailRetryResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace EmailRetryResponse {
  export interface Data {
    message: string;
  }
}

export interface EmailSendResponse {
  data: EmailSendResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace EmailSendResponse {
  export interface Data {
    /**
     * Unique message ID (format: msg*{id}*{token})
     */
    id: string;

    /**
     * Current delivery status
     */
    status: 'pending' | 'sent';

    /**
     * List of recipient addresses
     */
    to: Array<string>;

    /**
     * SMTP Message-ID header value
     */
    messageId?: string;
  }
}

export interface EmailSendBatchResponse {
  data: EmailSendBatchResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace EmailSendBatchResponse {
  export interface Data {
    /**
     * Successfully accepted emails
     */
    accepted: number;

    /**
     * Failed emails
     */
    failed: number;

    /**
     * Map of recipient email to message info
     */
    messages: { [key: string]: Data.Messages };

    /**
     * Total emails in the batch
     */
    total: number;
  }

  export namespace Data {
    export interface Messages {
      /**
       * Message ID
       */
      id: string;

      token: string;
    }
  }
}

export interface EmailSendRawResponse {
  data: EmailSendRawResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace EmailSendRawResponse {
  export interface Data {
    /**
     * Unique message ID (format: msg*{id}*{token})
     */
    id: string;

    /**
     * Current delivery status
     */
    status: 'pending' | 'sent';

    /**
     * List of recipient addresses
     */
    to: Array<string>;

    /**
     * SMTP Message-ID header value
     */
    messageId?: string;
  }
}

export interface EmailRetrieveParams {
  /**
   * Comma-separated list of fields to include:
   *
   * - `content` - HTML and plain text body
   * - `headers` - Email headers
   * - `deliveries` - Delivery attempt history
   * - `activity` - Opens and clicks
   */
  expand?: string;
}

export interface EmailListParams extends PageNumberPaginationParams {
  /**
   * Return emails sent after this timestamp (Unix seconds or ISO 8601)
   */
  after?: string;

  /**
   * Return emails sent before this timestamp
   */
  before?: string;

  /**
   * Filter by sender email address
   */
  from?: string;

  /**
   * Filter by delivery status:
   *
   * - `pending` - Email accepted, waiting to be processed
   * - `sent` - Email transmitted to recipient's mail server
   * - `softfail` - Temporary delivery failure, will retry
   * - `hardfail` - Permanent delivery failure
   * - `bounced` - Email bounced back
   * - `held` - Held for manual review
   */
  status?: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held';

  /**
   * Filter by tag
   */
  tag?: string;

  /**
   * Filter by recipient email address
   */
  to?: string;
}

export interface EmailSendParams {
  /**
   * Body param: Sender email address. Must be from a verified domain.
   *
   * **Supported formats:**
   *
   * - Email only: `hello@yourdomain.com`
   * - With display name: `Acme <hello@yourdomain.com>`
   * - With quoted name: `"Acme Support" <support@yourdomain.com>`
   *
   * The domain portion must match a verified sending domain in your account.
   */
  from: string;

  /**
   * Body param: Email subject line
   */
  subject: string;

  /**
   * Body param: Recipient email addresses (max 50)
   */
  to: Array<string>;

  /**
   * Body param: File attachments
   */
  attachments?: Array<EmailSendParams.Attachment>;

  /**
   * Body param: BCC recipients
   */
  bcc?: Array<string>;

  /**
   * Body param: CC recipients
   */
  cc?: Array<string>;

  /**
   * Body param: Custom email headers
   */
  headers?: { [key: string]: string };

  /**
   * Body param: HTML body content. Maximum 5MB (5,242,880 characters). Combined with
   * attachments, the total message must not exceed 14MB.
   */
  html?: string;

  /**
   * Body param: Reply-to address
   */
  replyTo?: string;

  /**
   * Body param: Tag for categorization and filtering
   */
  tag?: string;

  /**
   * Body param: Plain text body (auto-generated from HTML if not provided). Maximum
   * 5MB (5,242,880 characters).
   */
  text?: string;

  /**
   * Header param: Unique key for idempotent requests. If a request with this key was
   * already processed, the cached response is returned. Keys expire after 24 hours.
   */
  'Idempotency-Key'?: string;
}

export namespace EmailSendParams {
  export interface Attachment {
    /**
     * Base64-encoded file content
     */
    content: string;

    /**
     * MIME type
     */
    contentType: string;

    /**
     * Attachment filename
     */
    filename: string;
  }
}

export interface EmailSendBatchParams {
  /**
   * Body param:
   */
  emails: Array<EmailSendBatchParams.Email>;

  /**
   * Body param: Sender email for all messages
   */
  from: string;

  /**
   * Header param: Unique key for idempotent requests. If a request with this key was
   * already processed, the cached response is returned. Keys expire after 24 hours.
   */
  'Idempotency-Key'?: string;
}

export namespace EmailSendBatchParams {
  export interface Email {
    subject: string;

    to: Array<string>;

    html?: string;

    tag?: string;

    text?: string;
  }
}

export interface EmailSendRawParams {
  /**
   * Base64-encoded RFC 2822 message
   */
  data: string;

  /**
   * Envelope sender address
   */
  mailFrom: string;

  /**
   * Envelope recipient addresses
   */
  rcptTo: Array<string>;
}

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailRetrieveDeliveriesResponse as EmailRetrieveDeliveriesResponse,
    type EmailRetryResponse as EmailRetryResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailSendBatchResponse as EmailSendBatchResponse,
    type EmailSendRawResponse as EmailSendRawResponse,
    type EmailListResponsesPageNumberPagination as EmailListResponsesPageNumberPagination,
    type EmailRetrieveParams as EmailRetrieveParams,
    type EmailListParams as EmailListParams,
    type EmailSendParams as EmailSendParams,
    type EmailSendBatchParams as EmailSendBatchParams,
    type EmailSendRawParams as EmailSendRawParams,
  };
}
