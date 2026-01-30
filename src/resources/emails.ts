// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { PageNumberPagination, type PageNumberPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Emails extends APIResource {
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
   *   metadata: { user_id: 'usr_123', campaign: 'onboarding' },
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
   * **Important:** The `rawMessage` field must be base64-encoded. Your raw MIME
   * message (with headers like From, To, Subject, Content-Type, followed by a blank
   * line and the body) must be encoded to base64 before sending.
   *
   * @example
   * ```ts
   * const response = await client.emails.sendRaw({
   *   from: 'Acme <hello@acme.com>',
   *   rawMessage: 'x',
   *   to: ['user@example.com'],
   * });
   * ```
   */
  sendRaw(body: EmailSendRawParams, options?: RequestOptions): APIPromise<EmailSendRawResponse> {
    return this._client.post('/emails/raw', { body, ...options });
  }
}

export type EmailListResponsesPageNumberPagination = PageNumberPagination<EmailListResponse>;

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

    /**
     * Whether this email was sent in sandbox mode. Only present (and true) for sandbox
     * emails sent from @arkhq.io addresses.
     */
    sandbox?: boolean;
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

    /**
     * Whether this batch was sent in sandbox mode. Only present (and true) for sandbox
     * emails sent from @arkhq.io addresses.
     */
    sandbox?: boolean;
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

    /**
     * Whether this email was sent in sandbox mode. Only present (and true) for sandbox
     * emails sent from @arkhq.io addresses.
     */
    sandbox?: boolean;
  }
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
   * Body param: Sender email address. Must be from a verified domain OR use sandbox
   * mode.
   *
   * **Supported formats:**
   *
   * - Email only: `hello@yourdomain.com`
   * - With display name: `Acme <hello@yourdomain.com>`
   * - With quoted name: `"Acme Support" <support@yourdomain.com>`
   *
   * The domain portion must match a verified sending domain in your account.
   *
   * **Sandbox mode:** Use `sandbox@arkhq.io` to send test emails without domain
   * verification. Sandbox emails can only be sent to organization members and are
   * limited to 10 per day.
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
   * Body param: File attachments (accepts null)
   */
  attachments?: Array<EmailSendParams.Attachment> | null;

  /**
   * Body param: BCC recipients (accepts null)
   */
  bcc?: Array<string> | null;

  /**
   * Body param: CC recipients (accepts null)
   */
  cc?: Array<string> | null;

  /**
   * Body param: Custom email headers (accepts null)
   */
  headers?: { [key: string]: string } | null;

  /**
   * Body param: HTML body content (accepts null). Maximum 5MB (5,242,880
   * characters). Combined with attachments, the total message must not exceed 14MB.
   */
  html?: string | null;

  /**
   * Body param: Custom key-value pairs attached to an email for webhook correlation.
   *
   * When you send an email with metadata, these key-value pairs are:
   *
   * - **Stored** with the message
   * - **Returned** in all webhook event payloads (MessageSent, MessageBounced, etc.)
   * - **Never visible** to email recipients
   *
   * This is useful for correlating webhook events with your internal systems (e.g.,
   * user IDs, order IDs, campaign identifiers).
   *
   * **Validation Rules:**
   *
   * - Maximum 10 keys per email
   * - Keys: 1-40 characters, must start with a letter, only alphanumeric and
   *   underscores (`^[a-zA-Z][a-zA-Z0-9_]*$`)
   * - Values: 1-500 characters, no control characters (newlines, tabs, etc.)
   * - Total size: 4KB maximum (JSON-encoded)
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Body param: Reply-to address (accepts null)
   */
  replyTo?: string | null;

  /**
   * Body param: Tag for categorization and filtering (accepts null)
   */
  tag?: string | null;

  /**
   * Body param: Plain text body (accepts null, auto-generated from HTML if not
   * provided). Maximum 5MB (5,242,880 characters).
   */
  text?: string | null;

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
   * Body param
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

    html?: string | null;

    /**
     * Custom key-value pairs attached to an email for webhook correlation.
     *
     * When you send an email with metadata, these key-value pairs are:
     *
     * - **Stored** with the message
     * - **Returned** in all webhook event payloads (MessageSent, MessageBounced, etc.)
     * - **Never visible** to email recipients
     *
     * This is useful for correlating webhook events with your internal systems (e.g.,
     * user IDs, order IDs, campaign identifiers).
     *
     * **Validation Rules:**
     *
     * - Maximum 10 keys per email
     * - Keys: 1-40 characters, must start with a letter, only alphanumeric and
     *   underscores (`^[a-zA-Z][a-zA-Z0-9_]*$`)
     * - Values: 1-500 characters, no control characters (newlines, tabs, etc.)
     * - Total size: 4KB maximum (JSON-encoded)
     */
    metadata?: { [key: string]: string } | null;

    /**
     * Tag for categorization and filtering
     */
    tag?: string | null;

    text?: string | null;
  }
}

export interface EmailSendRawParams {
  /**
   * Sender email address. Must be from a verified domain.
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
   * Base64-encoded RFC 2822 MIME message.
   *
   * **You must base64-encode your raw email before sending.** The raw email should
   * include headers (From, To, Subject, Content-Type, etc.) followed by a blank line
   * and the message body.
   */
  rawMessage: string;

  /**
   * Recipient email addresses
   */
  to: Array<string>;

  /**
   * Whether this is a bounce message (accepts null)
   */
  bounce?: boolean | null;
}

export declare namespace Emails {
  export {
    type EmailListResponse as EmailListResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailSendBatchResponse as EmailSendBatchResponse,
    type EmailSendRawResponse as EmailSendRawResponse,
    type EmailListResponsesPageNumberPagination as EmailListResponsesPageNumberPagination,
    type EmailListParams as EmailListParams,
    type EmailSendParams as EmailSendParams,
    type EmailSendBatchParams as EmailSendBatchParams,
    type EmailSendRawParams as EmailSendRawParams,
  };
}
