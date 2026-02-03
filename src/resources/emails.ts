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
   * const email = await client.emails.retrieve('aBc123XyZ');
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
   * - `GET /emails/{emailId}` - Get full details of a specific email
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
   * Get the complete delivery history for an email, including SMTP response codes,
   * timestamps, and current retry state.
   *
   * ## Response Fields
   *
   * ### Status
   *
   * The current status of the email:
   *
   * - `pending` - Awaiting first delivery attempt
   * - `sent` - Successfully delivered to recipient server
   * - `softfail` - Temporary failure, automatic retry scheduled
   * - `hardfail` - Permanent failure, will not retry
   * - `held` - Held for manual review
   * - `bounced` - Bounced by recipient server
   *
   * ### Retry State
   *
   * When the email is in the delivery queue (`pending` or `softfail` status),
   * `retryState` provides information about the retry schedule:
   *
   * - `attempt` - Current attempt number (0 = first attempt)
   * - `maxAttempts` - Maximum attempts before hard-fail (typically 18)
   * - `attemptsRemaining` - Attempts left before hard-fail
   * - `nextRetryAt` - When the next retry is scheduled (Unix timestamp)
   * - `processing` - Whether the email is currently being processed
   * - `manual` - Whether this was triggered by a manual retry
   *
   * When the email has finished processing (`sent`, `hardfail`, `held`, `bounced`),
   * `retryState` is `null`.
   *
   * ### Can Retry Manually
   *
   * Indicates whether you can call `POST /emails/{emailId}/retry` to manually retry
   * the email. This is `true` when the raw message content is still available (not
   * expired due to retention policy).
   *
   * @example
   * ```ts
   * const response = await client.emails.retrieveDeliveries(
   *   'aBc123XyZ',
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
   * const response = await client.emails.retry('aBc123XyZ');
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
   * - `GET /emails/{emailId}` - Track delivery status
   * - `GET /emails/{emailId}/deliveries` - View delivery attempts
   * - `POST /emails/{emailId}/retry` - Retry failed delivery
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

export interface EmailRetrieveResponse {
  data: EmailRetrieveResponse.Data;

  meta: Shared.APIMeta;

  success: true;
}

export namespace EmailRetrieveResponse {
  export interface Data {
    /**
     * Unique message identifier (token)
     */
    id: string;

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
     * Opens and clicks tracking data (included if expand=activity)
     */
    activity?: Data.Activity;

    /**
     * File attachments (included if expand=attachments)
     */
    attachments?: Array<Data.Attachment>;

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
     * Complete raw MIME message, base64 encoded (included if expand=raw). Decode this
     * to get the original RFC 2822 formatted email.
     */
    rawMessage?: string;

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
    /**
     * Opens and clicks tracking data (included if expand=activity)
     */
    export interface Activity {
      /**
       * List of link click events
       */
      clicks?: Array<Activity.Click>;

      /**
       * List of email open events
       */
      opens?: Array<Activity.Open>;
    }

    export namespace Activity {
      export interface Click {
        /**
         * IP address of the clicker
         */
        ipAddress?: string;

        /**
         * Unix timestamp of the click event
         */
        timestamp?: number;

        /**
         * ISO 8601 timestamp of the click event
         */
        timestampIso?: string;

        /**
         * URL that was clicked
         */
        url?: string;

        /**
         * User agent of the email client
         */
        userAgent?: string;
      }

      export interface Open {
        /**
         * IP address of the opener
         */
        ipAddress?: string;

        /**
         * Unix timestamp of the open event
         */
        timestamp?: number;

        /**
         * ISO 8601 timestamp of the open event
         */
        timestampIso?: string;

        /**
         * User agent of the email client
         */
        userAgent?: string;
      }
    }

    /**
     * An email attachment retrieved from a sent message
     */
    export interface Attachment {
      /**
       * MIME type of the attachment
       */
      contentType: string;

      /**
       * Base64 encoded attachment content. Decode this to get the raw file bytes.
       */
      data: string;

      /**
       * Original filename of the attachment
       */
      filename: string;

      /**
       * SHA256 hash of the attachment content for verification
       */
      hash: string;

      /**
       * Size of the attachment in bytes
       */
      size: number;
    }

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
       * Bounce classification category (present for failed deliveries). Helps understand
       * why delivery failed for analytics and automated handling.
       */
      classification?:
        | 'invalid_recipient'
        | 'mailbox_full'
        | 'message_too_large'
        | 'spam_block'
        | 'policy_violation'
        | 'no_mailbox'
        | 'not_accepting_mail'
        | 'temporarily_unavailable'
        | 'protocol_error'
        | 'tls_required'
        | 'connection_error'
        | 'dns_error'
        | 'unclassified'
        | null;

      /**
       * Numeric bounce classification code for programmatic handling. Codes:
       * 10=invalid_recipient, 11=no_mailbox, 12=not_accepting_mail, 20=mailbox_full,
       * 21=message_too_large, 30=spam_block, 31=policy_violation, 32=tls_required,
       * 40=connection_error, 41=dns_error, 42=temporarily_unavailable,
       * 50=protocol_error, 99=unclassified
       */
      classificationCode?: number | null;

      /**
       * SMTP response code
       */
      code?: number;

      /**
       * Human-readable delivery summary. Format varies by status:
       *
       * - **sent**: `Message for {recipient} accepted by {ip}:{port} ({hostname})`
       * - **softfail/hardfail**:
       *   `{code} {classification}: Delivery to {recipient} failed at {ip}:{port} ({hostname})`
       */
      details?: string;

      /**
       * Raw SMTP response from the receiving mail server
       */
      output?: string;

      /**
       * Hostname of the remote mail server that processed the delivery. Present for all
       * delivery attempts (successful and failed).
       */
      remoteHost?: string | null;

      /**
       * Whether TLS was used
       */
      sentWithSsl?: boolean;

      /**
       * RFC 3463 enhanced status code from SMTP response (e.g., "5.1.1", "4.2.2"). First
       * digit: 2=success, 4=temporary, 5=permanent. Second digit: category (1=address,
       * 2=mailbox, 7=security, etc.).
       */
      smtpEnhancedCode?: string | null;
    }
  }
}

export interface EmailListResponse {
  /**
   * Unique message identifier (token)
   */
  id: string;

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
    /**
     * Message identifier (token)
     */
    id: string;

    /**
     * Whether the message can be manually retried via `POST /emails/{emailId}/retry`.
     * `true` when the raw message content is still available (not expired). Messages
     * older than the retention period cannot be retried.
     */
    canRetryManually: boolean;

    /**
     * Chronological list of delivery attempts for this message. Each attempt includes
     * SMTP response codes and timestamps.
     */
    deliveries: Array<Data.Delivery>;

    /**
     * Information about the current retry state of a message that is queued for
     * delivery. Only present when the message is in the delivery queue.
     */
    retryState: Data.RetryState | null;

    /**
     * Current message status (lowercase). Possible values:
     *
     * - `pending` - Initial state, awaiting first delivery attempt
     * - `sent` - Successfully delivered
     * - `softfail` - Temporary failure, will retry automatically
     * - `hardfail` - Permanent failure, will not retry
     * - `held` - Held for manual review (suppression list, etc.)
     * - `bounced` - Bounced by recipient server
     */
    status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'held' | 'bounced';
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
       * Bounce classification category (present for failed deliveries). Helps understand
       * why delivery failed for analytics and automated handling.
       */
      classification?:
        | 'invalid_recipient'
        | 'mailbox_full'
        | 'message_too_large'
        | 'spam_block'
        | 'policy_violation'
        | 'no_mailbox'
        | 'not_accepting_mail'
        | 'temporarily_unavailable'
        | 'protocol_error'
        | 'tls_required'
        | 'connection_error'
        | 'dns_error'
        | 'unclassified'
        | null;

      /**
       * Numeric bounce classification code for programmatic handling. Codes:
       * 10=invalid_recipient, 11=no_mailbox, 12=not_accepting_mail, 20=mailbox_full,
       * 21=message_too_large, 30=spam_block, 31=policy_violation, 32=tls_required,
       * 40=connection_error, 41=dns_error, 42=temporarily_unavailable,
       * 50=protocol_error, 99=unclassified
       */
      classificationCode?: number | null;

      /**
       * SMTP response code
       */
      code?: number;

      /**
       * Human-readable delivery summary. Format varies by status:
       *
       * - **sent**: `Message for {recipient} accepted by {ip}:{port} ({hostname})`
       * - **softfail/hardfail**:
       *   `{code} {classification}: Delivery to {recipient} failed at {ip}:{port} ({hostname})`
       */
      details?: string;

      /**
       * Raw SMTP response from the receiving mail server
       */
      output?: string;

      /**
       * Hostname of the remote mail server that processed the delivery. Present for all
       * delivery attempts (successful and failed).
       */
      remoteHost?: string | null;

      /**
       * Whether TLS was used
       */
      sentWithSsl?: boolean;

      /**
       * RFC 3463 enhanced status code from SMTP response (e.g., "5.1.1", "4.2.2"). First
       * digit: 2=success, 4=temporary, 5=permanent. Second digit: category (1=address,
       * 2=mailbox, 7=security, etc.).
       */
      smtpEnhancedCode?: string | null;
    }

    /**
     * Information about the current retry state of a message that is queued for
     * delivery. Only present when the message is in the delivery queue.
     */
    export interface RetryState {
      /**
       * Current attempt number (0-indexed). The first delivery attempt is 0, the first
       * retry is 1, and so on.
       */
      attempt: number;

      /**
       * Number of attempts remaining before the message is hard-failed. Calculated as
       * `maxAttempts - attempt`.
       */
      attemptsRemaining: number;

      /**
       * Whether this queue entry was created by a manual retry request. Manual retries
       * bypass certain hold conditions like suppression lists.
       */
      manual: boolean;

      /**
       * Maximum number of delivery attempts before the message is hard-failed.
       * Configured at the server level.
       */
      maxAttempts: number;

      /**
       * Whether the message is currently being processed by a delivery worker. When
       * `true`, the message is actively being sent.
       */
      processing: boolean;

      /**
       * Unix timestamp of when the next retry attempt is scheduled. `null` if the
       * message is ready for immediate processing or currently being processed.
       */
      nextRetryAt?: number | null;

      /**
       * ISO 8601 formatted timestamp of the next retry attempt. `null` if the message is
       * ready for immediate processing.
       */
      nextRetryAtIso?: string | null;
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
    /**
     * Email identifier (token)
     */
    id: string;

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
     * Unique message identifier (token)
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
       * Message identifier (token)
       */
      id: string;
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
     * Unique message identifier (token)
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

export interface EmailRetrieveParams {
  /**
   * Comma-separated list of fields to include:
   *
   * - `full` - Include all expanded fields in a single request
   * - `content` - HTML and plain text body
   * - `headers` - Email headers
   * - `deliveries` - Delivery attempt history
   * - `activity` - Opens and clicks tracking data
   * - `attachments` - File attachments with content (base64 encoded)
   * - `raw` - Complete raw MIME message (base64 encoded)
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
