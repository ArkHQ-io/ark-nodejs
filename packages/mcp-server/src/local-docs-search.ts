// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/emails/{emailId}',
    httpMethod: 'get',
    summary: 'Get email details',
    description:
      'Retrieve detailed information about a specific email including\ndelivery status, timestamps, and optionally the email content.\n\nUse the `expand` parameter to include additional data like the\nHTML/text body, headers, or delivery attempts.\n',
    stainlessPath: '(resource) emails > (method) retrieve',
    qualified: 'client.emails.retrieve',
    params: ['emailId: string;', 'expand?: string;'],
    response:
      "{ data: { id: string; from: string; scope: 'outgoing' | 'incoming'; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'; subject: string; tenantId: string; timestamp: number; timestampIso: string; to: string; activity?: { clicks?: object[]; opens?: object[]; }; attachments?: { contentType: string; data: string; filename: string; hash: string; size: number; }[]; deliveries?: { id: string; status: string; timestamp: number; timestampIso: string; classification?: string; classificationCode?: number; code?: number; details?: string; output?: string; remoteHost?: string; sentWithSsl?: boolean; smtpEnhancedCode?: string; }[]; headers?: object; htmlBody?: string; messageId?: string; plainBody?: string; rawMessage?: string; spam?: boolean; spamScore?: number; tag?: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## retrieve\n\n`client.emails.retrieve(emailId: string, expand?: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/emails/{emailId}`\n\nRetrieve detailed information about a specific email including\ndelivery status, timestamps, and optionally the email content.\n\nUse the `expand` parameter to include additional data like the\nHTML/text body, headers, or delivery attempts.\n\n\n### Parameters\n\n- `emailId: string`\n\n- `expand?: string`\n  Comma-separated list of fields to include:\n- `full` - Include all expanded fields in a single request\n- `content` - HTML and plain text body\n- `headers` - Email headers\n- `deliveries` - Delivery attempt history\n- `activity` - Opens and clicks tracking data\n- `attachments` - File attachments with content (base64 encoded)\n- `raw` - Complete raw MIME message (base64 encoded)\n\n\n### Returns\n\n- `{ data: { id: string; from: string; scope: 'outgoing' | 'incoming'; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'; subject: string; tenantId: string; timestamp: number; timestampIso: string; to: string; activity?: { clicks?: object[]; opens?: object[]; }; attachments?: { contentType: string; data: string; filename: string; hash: string; size: number; }[]; deliveries?: { id: string; status: string; timestamp: number; timestampIso: string; classification?: string; classificationCode?: number; code?: number; details?: string; output?: string; remoteHost?: string; sentWithSsl?: boolean; smtpEnhancedCode?: string; }[]; headers?: object; htmlBody?: string; messageId?: string; plainBody?: string; rawMessage?: string; spam?: boolean; spamScore?: number; tag?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; from: string; scope: 'outgoing' | 'incoming'; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'; subject: string; tenantId: string; timestamp: number; timestampIso: string; to: string; activity?: { clicks?: { ipAddress?: string; timestamp?: number; timestampIso?: string; url?: string; userAgent?: string; }[]; opens?: { ipAddress?: string; timestamp?: number; timestampIso?: string; userAgent?: string; }[]; }; attachments?: { contentType: string; data: string; filename: string; hash: string; size: number; }[]; deliveries?: { id: string; status: string; timestamp: number; timestampIso: string; classification?: string; classificationCode?: number; code?: number; details?: string; output?: string; remoteHost?: string; sentWithSsl?: boolean; smtpEnhancedCode?: string; }[]; headers?: object; htmlBody?: string; messageId?: string; plainBody?: string; rawMessage?: string; spam?: boolean; spamScore?: number; tag?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst email = await client.emails.retrieve('aBc123XyZ');\n\nconsole.log(email);\n```",
  },
  {
    name: 'list',
    endpoint: '/emails',
    httpMethod: 'get',
    summary: 'List sent emails',
    description:
      'Retrieve a paginated list of sent emails. Results are ordered by\nsend time, newest first.\n\nUse filters to narrow down results by status, recipient, sender, or tag.\n\n**Related endpoints:**\n- `GET /emails/{emailId}` - Get full details of a specific email\n- `POST /emails` - Send a new email\n',
    stainlessPath: '(resource) emails > (method) list',
    qualified: 'client.emails.list',
    params: [
      'after?: string;',
      'before?: string;',
      'from?: string;',
      'page?: number;',
      'perPage?: number;',
      "status?: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held';",
      'tag?: string;',
      'to?: string;',
    ],
    response:
      "{ id: string; from: string; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'; subject: string; tenantId: string; timestamp: number; timestampIso: string; to: string; tag?: string; }",
    markdown:
      "## list\n\n`client.emails.list(after?: string, before?: string, from?: string, page?: number, perPage?: number, status?: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held', tag?: string, to?: string): { id: string; from: string; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'; subject: string; tenantId: string; timestamp: number; timestampIso: string; to: string; tag?: string; }`\n\n**get** `/emails`\n\nRetrieve a paginated list of sent emails. Results are ordered by\nsend time, newest first.\n\nUse filters to narrow down results by status, recipient, sender, or tag.\n\n**Related endpoints:**\n- `GET /emails/{emailId}` - Get full details of a specific email\n- `POST /emails` - Send a new email\n\n\n### Parameters\n\n- `after?: string`\n  Return emails sent after this timestamp (Unix seconds or ISO 8601)\n\n- `before?: string`\n  Return emails sent before this timestamp\n\n- `from?: string`\n  Filter by sender email address\n\n- `page?: number`\n  Page number (starts at 1)\n\n- `perPage?: number`\n  Results per page (max 100)\n\n- `status?: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'`\n  Filter by delivery status:\n- `pending` - Email accepted, waiting to be processed\n- `sent` - Email transmitted to recipient's mail server\n- `softfail` - Temporary delivery failure, will retry\n- `hardfail` - Permanent delivery failure\n- `bounced` - Email bounced back\n- `held` - Held for manual review\n\n- `tag?: string`\n  Filter by tag\n\n- `to?: string`\n  Filter by recipient email address\n\n### Returns\n\n- `{ id: string; from: string; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'; subject: string; tenantId: string; timestamp: number; timestampIso: string; to: string; tag?: string; }`\n\n  - `id: string`\n  - `from: string`\n  - `status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'bounced' | 'held'`\n  - `subject: string`\n  - `tenantId: string`\n  - `timestamp: number`\n  - `timestampIso: string`\n  - `to: string`\n  - `tag?: string`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\n// Automatically fetches more pages as needed.\nfor await (const emailListResponse of client.emails.list()) {\n  console.log(emailListResponse);\n}\n```",
  },
  {
    name: 'retrieve_deliveries',
    endpoint: '/emails/{emailId}/deliveries',
    httpMethod: 'get',
    summary: 'Get delivery attempts',
    description:
      'Get the complete delivery history for an email, including SMTP response codes,\ntimestamps, and current retry state.\n\n## Response Fields\n\n### Status\nThe current status of the email:\n- `pending` - Awaiting first delivery attempt\n- `sent` - Successfully delivered to recipient server\n- `softfail` - Temporary failure, automatic retry scheduled\n- `hardfail` - Permanent failure, will not retry\n- `held` - Held for manual review\n- `bounced` - Bounced by recipient server\n\n### Retry State\nWhen the email is in the delivery queue (`pending` or `softfail` status),\n`retryState` provides information about the retry schedule:\n- `attempt` - Current attempt number (0 = first attempt)\n- `maxAttempts` - Maximum attempts before hard-fail (typically 18)\n- `attemptsRemaining` - Attempts left before hard-fail\n- `nextRetryAt` - When the next retry is scheduled (Unix timestamp)\n- `processing` - Whether the email is currently being processed\n- `manual` - Whether this was triggered by a manual retry\n\nWhen the email has finished processing (`sent`, `hardfail`, `held`, `bounced`),\n`retryState` is `null`.\n\n### Can Retry Manually\nIndicates whether you can call `POST /emails/{emailId}/retry` to manually retry\nthe email. This is `true` when the raw message content is still available\n(not expired due to retention policy).\n',
    stainlessPath: '(resource) emails > (method) retrieve_deliveries',
    qualified: 'client.emails.retrieveDeliveries',
    params: ['emailId: string;'],
    response:
      "{ data: { id: string; canRetryManually: boolean; deliveries: { id: string; status: string; timestamp: number; timestampIso: string; classification?: string; classificationCode?: number; code?: number; details?: string; output?: string; remoteHost?: string; sentWithSsl?: boolean; smtpEnhancedCode?: string; }[]; retryState: { attempt: number; attemptsRemaining: number; manual: boolean; maxAttempts: number; processing: boolean; nextRetryAt?: number; nextRetryAtIso?: string; }; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'held' | 'bounced'; tenantId: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## retrieve_deliveries\n\n`client.emails.retrieveDeliveries(emailId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/emails/{emailId}/deliveries`\n\nGet the complete delivery history for an email, including SMTP response codes,\ntimestamps, and current retry state.\n\n## Response Fields\n\n### Status\nThe current status of the email:\n- `pending` - Awaiting first delivery attempt\n- `sent` - Successfully delivered to recipient server\n- `softfail` - Temporary failure, automatic retry scheduled\n- `hardfail` - Permanent failure, will not retry\n- `held` - Held for manual review\n- `bounced` - Bounced by recipient server\n\n### Retry State\nWhen the email is in the delivery queue (`pending` or `softfail` status),\n`retryState` provides information about the retry schedule:\n- `attempt` - Current attempt number (0 = first attempt)\n- `maxAttempts` - Maximum attempts before hard-fail (typically 18)\n- `attemptsRemaining` - Attempts left before hard-fail\n- `nextRetryAt` - When the next retry is scheduled (Unix timestamp)\n- `processing` - Whether the email is currently being processed\n- `manual` - Whether this was triggered by a manual retry\n\nWhen the email has finished processing (`sent`, `hardfail`, `held`, `bounced`),\n`retryState` is `null`.\n\n### Can Retry Manually\nIndicates whether you can call `POST /emails/{emailId}/retry` to manually retry\nthe email. This is `true` when the raw message content is still available\n(not expired due to retention policy).\n\n\n### Parameters\n\n- `emailId: string`\n\n### Returns\n\n- `{ data: { id: string; canRetryManually: boolean; deliveries: { id: string; status: string; timestamp: number; timestampIso: string; classification?: string; classificationCode?: number; code?: number; details?: string; output?: string; remoteHost?: string; sentWithSsl?: boolean; smtpEnhancedCode?: string; }[]; retryState: { attempt: number; attemptsRemaining: number; manual: boolean; maxAttempts: number; processing: boolean; nextRetryAt?: number; nextRetryAtIso?: string; }; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'held' | 'bounced'; tenantId: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; canRetryManually: boolean; deliveries: { id: string; status: string; timestamp: number; timestampIso: string; classification?: string; classificationCode?: number; code?: number; details?: string; output?: string; remoteHost?: string; sentWithSsl?: boolean; smtpEnhancedCode?: string; }[]; retryState: { attempt: number; attemptsRemaining: number; manual: boolean; maxAttempts: number; processing: boolean; nextRetryAt?: number; nextRetryAtIso?: string; }; status: 'pending' | 'sent' | 'softfail' | 'hardfail' | 'held' | 'bounced'; tenantId: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.emails.retrieveDeliveries('aBc123XyZ');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retry',
    endpoint: '/emails/{emailId}/retry',
    httpMethod: 'post',
    summary: 'Retry email delivery',
    description:
      'Retry delivery of a failed or soft-bounced email. Creates a new\ndelivery attempt.\n\nOnly works for emails that have failed or are in a retryable state.\n',
    stainlessPath: '(resource) emails > (method) retry',
    qualified: 'client.emails.retry',
    params: ['emailId: string;'],
    response:
      '{ data: { id: string; message: string; tenantId: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retry\n\n`client.emails.retry(emailId: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/emails/{emailId}/retry`\n\nRetry delivery of a failed or soft-bounced email. Creates a new\ndelivery attempt.\n\nOnly works for emails that have failed or are in a retryable state.\n\n\n### Parameters\n\n- `emailId: string`\n\n### Returns\n\n- `{ data: { id: string; message: string; tenantId: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; message: string; tenantId: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.emails.retry('aBc123XyZ');\n\nconsole.log(response);\n```",
  },
  {
    name: 'send',
    endpoint: '/emails',
    httpMethod: 'post',
    summary: 'Send an email',
    description:
      'Send a single email message. The email is accepted for immediate delivery\nand typically delivered within seconds.\n\n**Example use case:** Send a password reset email to a user.\n\n**Required fields:** `from`, `to`, `subject`, and either `html` or `text`\n\n**Idempotency:** Supports `Idempotency-Key` header for safe retries.\n\n**Related endpoints:**\n- `GET /emails/{emailId}` - Track delivery status\n- `GET /emails/{emailId}/deliveries` - View delivery attempts\n- `POST /emails/{emailId}/retry` - Retry failed delivery\n',
    stainlessPath: '(resource) emails > (method) send',
    qualified: 'client.emails.send',
    params: [
      'from: string;',
      'subject: string;',
      'to: string[];',
      'attachments?: { content: string; contentType: string; filename: string; }[];',
      'bcc?: string[];',
      'cc?: string[];',
      'headers?: object;',
      'html?: string;',
      'metadata?: object;',
      'replyTo?: string;',
      'tag?: string;',
      'tenantId?: string;',
      'text?: string;',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ data: { id: string; status: 'pending' | 'sent'; tenantId: string; to: string[]; messageId?: string; sandbox?: boolean; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## send\n\n`client.emails.send(from: string, subject: string, to: string[], attachments?: { content: string; contentType: string; filename: string; }[], bcc?: string[], cc?: string[], headers?: object, html?: string, metadata?: object, replyTo?: string, tag?: string, tenantId?: string, text?: string, Idempotency-Key?: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/emails`\n\nSend a single email message. The email is accepted for immediate delivery\nand typically delivered within seconds.\n\n**Example use case:** Send a password reset email to a user.\n\n**Required fields:** `from`, `to`, `subject`, and either `html` or `text`\n\n**Idempotency:** Supports `Idempotency-Key` header for safe retries.\n\n**Related endpoints:**\n- `GET /emails/{emailId}` - Track delivery status\n- `GET /emails/{emailId}/deliveries` - View delivery attempts\n- `POST /emails/{emailId}/retry` - Retry failed delivery\n\n\n### Parameters\n\n- `from: string`\n  Sender email address. Must be from a verified domain OR use sandbox mode.\n\n**Supported formats:**\n- Email only: `hello@yourdomain.com`\n- With display name: `Acme <hello@yourdomain.com>`\n- With quoted name: `\"Acme Support\" <support@yourdomain.com>`\n\nThe domain portion must match a verified sending domain in your account.\n\n**Sandbox mode:** Use `sandbox@arkhq.io` to send test emails without domain verification.\nSandbox emails can only be sent to organization members and are limited to 10 per day.\n\n\n- `subject: string`\n  Email subject line\n\n- `to: string[]`\n  Recipient email addresses (max 50)\n\n- `attachments?: { content: string; contentType: string; filename: string; }[]`\n  File attachments (accepts null)\n\n- `bcc?: string[]`\n  BCC recipients (accepts null)\n\n- `cc?: string[]`\n  CC recipients (accepts null)\n\n- `headers?: object`\n  Custom email headers (accepts null)\n\n- `html?: string`\n  HTML body content (accepts null).\nMaximum 5MB (5,242,880 characters). Combined with attachments,\nthe total message must not exceed 14MB.\n\n\n- `metadata?: object`\n  Custom key-value pairs attached to an email for webhook correlation.\n\nWhen you send an email with metadata, these key-value pairs are:\n- **Stored** with the message\n- **Returned** in all webhook event payloads (MessageSent, MessageBounced, etc.)\n- **Never visible** to email recipients\n\nThis is useful for correlating webhook events with your internal systems\n(e.g., user IDs, order IDs, campaign identifiers).\n\n**Validation Rules:**\n- Maximum 10 keys per email\n- Keys: 1-40 characters, must start with a letter, only alphanumeric and underscores (`^[a-zA-Z][a-zA-Z0-9_]*$`)\n- Values: 1-500 characters, no control characters (newlines, tabs, etc.)\n- Total size: 4KB maximum (JSON-encoded)\n\n\n- `replyTo?: string`\n  Reply-to address (accepts null)\n\n- `tag?: string`\n  Tag for categorization and filtering (accepts null)\n\n- `tenantId?: string`\n  The tenant ID to send this email from. Determines which tenant's\nconfiguration (domains, webhooks, tracking) is used.\n\n- If your API key is scoped to a specific tenant, this must match that tenant or be omitted.\n- If your API key is org-level, specify the tenant to send from.\n- If omitted, the organization's default tenant is used.\n\n\n- `text?: string`\n  Plain text body (accepts null, auto-generated from HTML if not provided).\nMaximum 5MB (5,242,880 characters).\n\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ data: { id: string; status: 'pending' | 'sent'; tenantId: string; to: string[]; messageId?: string; sandbox?: boolean; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; status: 'pending' | 'sent'; tenantId: string; to: string[]; messageId?: string; sandbox?: boolean; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.emails.send({\n  from: 'Acme <hello@acme.com>',\n  subject: 'Hello World',\n  to: ['user@example.com'],\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'send_batch',
    endpoint: '/emails/batch',
    httpMethod: 'post',
    summary: 'Send multiple emails',
    description:
      "Send up to 100 emails in a single request. Useful for sending\npersonalized emails to multiple recipients efficiently.\n\nEach email in the batch can have different content and recipients.\nFailed emails don't affect other emails in the batch.\n\n**Idempotency:** Supports `Idempotency-Key` header for safe retries.\n",
    stainlessPath: '(resource) emails > (method) send_batch',
    qualified: 'client.emails.sendBatch',
    params: [
      'emails: { subject: string; to: string[]; html?: string; metadata?: object; tag?: string; text?: string; }[];',
      'from: string;',
      'tenantId?: string;',
      'Idempotency-Key?: string;',
    ],
    response:
      '{ data: { accepted: number; failed: number; messages: object; tenantId: string; total: number; sandbox?: boolean; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## send_batch\n\n`client.emails.sendBatch(emails: { subject: string; to: string[]; html?: string; metadata?: object; tag?: string; text?: string; }[], from: string, tenantId?: string, Idempotency-Key?: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/emails/batch`\n\nSend up to 100 emails in a single request. Useful for sending\npersonalized emails to multiple recipients efficiently.\n\nEach email in the batch can have different content and recipients.\nFailed emails don't affect other emails in the batch.\n\n**Idempotency:** Supports `Idempotency-Key` header for safe retries.\n\n\n### Parameters\n\n- `emails: { subject: string; to: string[]; html?: string; metadata?: object; tag?: string; text?: string; }[]`\n\n- `from: string`\n  Sender email for all messages\n\n- `tenantId?: string`\n  The tenant ID to send this batch from. Determines which tenant's\nconfiguration (domains, webhooks, tracking) is used.\n\n- If your API key is scoped to a specific tenant, this must match that tenant or be omitted.\n- If your API key is org-level, specify the tenant to send from.\n- If omitted, the organization's default tenant is used.\n\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ data: { accepted: number; failed: number; messages: object; tenantId: string; total: number; sandbox?: boolean; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { accepted: number; failed: number; messages: object; tenantId: string; total: number; sandbox?: boolean; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.emails.sendBatch({ emails: [{ subject: 'Hello Alice', to: ['alice@example.com'] }, { subject: 'Hello Bob', to: ['bob@example.com'] }], from: 'notifications@myapp.com' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'send_raw',
    endpoint: '/emails/raw',
    httpMethod: 'post',
    summary: 'Send raw MIME email',
    description:
      'Send a pre-formatted RFC 2822 MIME message. Use this for advanced\nuse cases or when migrating from systems that generate raw email content.\n\n**Important:** The `rawMessage` field must be base64-encoded. Your raw MIME\nmessage (with headers like From, To, Subject, Content-Type, followed by a\nblank line and the body) must be encoded to base64 before sending.\n',
    stainlessPath: '(resource) emails > (method) send_raw',
    qualified: 'client.emails.sendRaw',
    params: [
      'from: string;',
      'rawMessage: string;',
      'to: string[];',
      'bounce?: boolean;',
      'tenantId?: string;',
    ],
    response:
      "{ data: { id: string; status: 'pending' | 'sent'; tenantId: string; to: string[]; messageId?: string; sandbox?: boolean; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## send_raw\n\n`client.emails.sendRaw(from: string, rawMessage: string, to: string[], bounce?: boolean, tenantId?: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/emails/raw`\n\nSend a pre-formatted RFC 2822 MIME message. Use this for advanced\nuse cases or when migrating from systems that generate raw email content.\n\n**Important:** The `rawMessage` field must be base64-encoded. Your raw MIME\nmessage (with headers like From, To, Subject, Content-Type, followed by a\nblank line and the body) must be encoded to base64 before sending.\n\n\n### Parameters\n\n- `from: string`\n  Sender email address. Must be from a verified domain.\n\n**Supported formats:**\n- Email only: `hello@yourdomain.com`\n- With display name: `Acme <hello@yourdomain.com>`\n- With quoted name: `\"Acme Support\" <support@yourdomain.com>`\n\nThe domain portion must match a verified sending domain in your account.\n\n\n- `rawMessage: string`\n  Base64-encoded RFC 2822 MIME message.\n\n**You must base64-encode your raw email before sending.** The raw email\nshould include headers (From, To, Subject, Content-Type, etc.) followed\nby a blank line and the message body.\n\n\n- `to: string[]`\n  Recipient email addresses\n\n- `bounce?: boolean`\n  Whether this is a bounce message (accepts null)\n\n- `tenantId?: string`\n  The tenant ID to send this email from. Determines which tenant's\nconfiguration (domains, webhooks, tracking) is used.\n\n- If your API key is scoped to a specific tenant, this must match that tenant or be omitted.\n- If your API key is org-level, specify the tenant to send from.\n- If omitted, the organization's default tenant is used.\n\n\n### Returns\n\n- `{ data: { id: string; status: 'pending' | 'sent'; tenantId: string; to: string[]; messageId?: string; sandbox?: boolean; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; status: 'pending' | 'sent'; tenantId: string; to: string[]; messageId?: string; sandbox?: boolean; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.emails.sendRaw({\n  from: 'Acme <hello@acme.com>',\n  rawMessage: 'x',\n  to: ['user@example.com'],\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/logs/{requestId}',
    httpMethod: 'get',
    summary: 'Get API request log details',
    description:
      'Retrieve detailed information about a specific API request log,\nincluding the full request and response bodies.\n\n**Body decryption:** Request and response bodies are stored encrypted\nand automatically decrypted when retrieved. Bodies larger than 25KB\nare truncated at storage time with a `... [truncated]` marker.\n\n**Use cases:**\n- Debug a specific failed request\n- Review the exact payload sent/received\n- Share request details with support\n\n**Related endpoints:**\n- `GET /logs` - List logs with filters\n',
    stainlessPath: '(resource) logs > (method) retrieve',
    qualified: 'client.logs.retrieve',
    params: ['requestId: string;'],
    response: '{ data: object; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.logs.retrieve(requestId: string): { data: log_entry_detail; meta: api_meta; success: true; }`\n\n**get** `/logs/{requestId}`\n\nRetrieve detailed information about a specific API request log,\nincluding the full request and response bodies.\n\n**Body decryption:** Request and response bodies are stored encrypted\nand automatically decrypted when retrieved. Bodies larger than 25KB\nare truncated at storage time with a `... [truncated]` marker.\n\n**Use cases:**\n- Debug a specific failed request\n- Review the exact payload sent/received\n- Share request details with support\n\n**Related endpoints:**\n- `GET /logs` - List logs with filters\n\n\n### Parameters\n\n- `requestId: string`\n\n### Returns\n\n- `{ data: object; meta: { requestId: string; }; success: true; }`\n  Detailed API request log with request/response bodies\n\n  - `data: { context: { idempotencyKey?: string; ipAddress?: string; queryParams?: object; userAgent?: string; }; credential: { id: string; keyPrefix?: string; }; durationMs: number; endpoint: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; path: string; rateLimit: { limit?: number; limited?: boolean; remaining?: number; reset?: number; }; requestId: string; statusCode: number; timestamp: string; email?: { id?: string; recipientCount?: number; }; error?: { code?: string; message?: string; }; sdk?: { name?: string; version?: string; }; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst log = await client.logs.retrieve('req_V8GGcdWYzgeWIHiI');\n\nconsole.log(log);\n```",
  },
  {
    name: 'list',
    endpoint: '/logs',
    httpMethod: 'get',
    summary: 'List API request logs',
    description:
      'Retrieve a paginated list of API request logs for debugging and monitoring.\nResults are ordered by timestamp, newest first.\n\n**Use cases:**\n- Debug integration issues by reviewing recent requests\n- Monitor error rates and response times\n- Audit API usage patterns\n\n**Filters:**\n- `status` - Filter by success or error category\n- `statusCode` - Filter by exact HTTP status code\n- `endpoint` - Filter by endpoint name (e.g., `emails.send`)\n- `credentialId` - Filter by API key\n- `startDate`/`endDate` - Filter by date range\n\n**Note:** Request and response bodies are only included when\nretrieving a single log entry with `GET /logs/{requestId}`.\n\n**Related endpoints:**\n- `GET /logs/{requestId}` - Get full log details with request/response bodies\n',
    stainlessPath: '(resource) logs > (method) list',
    qualified: 'client.logs.list',
    params: [
      'credentialId?: string;',
      'endDate?: string;',
      'endpoint?: string;',
      'page?: number;',
      'perPage?: number;',
      'requestId?: string;',
      'startDate?: string;',
      "status?: 'success' | 'error';",
      'statusCode?: number;',
    ],
    response:
      "{ context: { idempotencyKey?: string; ipAddress?: string; queryParams?: object; userAgent?: string; }; credential: { id: string; keyPrefix?: string; }; durationMs: number; endpoint: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; path: string; rateLimit: { limit?: number; limited?: boolean; remaining?: number; reset?: number; }; requestId: string; statusCode: number; timestamp: string; email?: { id?: string; recipientCount?: number; }; error?: { code?: string; message?: string; }; sdk?: { name?: string; version?: string; }; }",
    markdown:
      "## list\n\n`client.logs.list(credentialId?: string, endDate?: string, endpoint?: string, page?: number, perPage?: number, requestId?: string, startDate?: string, status?: 'success' | 'error', statusCode?: number): { context: object; credential: object; durationMs: number; endpoint: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; path: string; rateLimit: object; requestId: string; statusCode: number; timestamp: string; email?: object; error?: object; sdk?: object; }`\n\n**get** `/logs`\n\nRetrieve a paginated list of API request logs for debugging and monitoring.\nResults are ordered by timestamp, newest first.\n\n**Use cases:**\n- Debug integration issues by reviewing recent requests\n- Monitor error rates and response times\n- Audit API usage patterns\n\n**Filters:**\n- `status` - Filter by success or error category\n- `statusCode` - Filter by exact HTTP status code\n- `endpoint` - Filter by endpoint name (e.g., `emails.send`)\n- `credentialId` - Filter by API key\n- `startDate`/`endDate` - Filter by date range\n\n**Note:** Request and response bodies are only included when\nretrieving a single log entry with `GET /logs/{requestId}`.\n\n**Related endpoints:**\n- `GET /logs/{requestId}` - Get full log details with request/response bodies\n\n\n### Parameters\n\n- `credentialId?: string`\n  Filter by API credential ID\n\n- `endDate?: string`\n  Filter logs before this date (ISO 8601 format)\n\n- `endpoint?: string`\n  Filter by endpoint name\n\n- `page?: number`\n  Page number\n\n- `perPage?: number`\n  Results per page (max 100)\n\n- `requestId?: string`\n  Filter by request ID (partial match)\n\n- `startDate?: string`\n  Filter logs after this date (ISO 8601 format)\n\n- `status?: 'success' | 'error'`\n  Filter by status category:\n- `success` - Status codes < 400\n- `error` - Status codes >= 400\n\n- `statusCode?: number`\n  Filter by exact HTTP status code (100-599)\n\n### Returns\n\n- `{ context: { idempotencyKey?: string; ipAddress?: string; queryParams?: object; userAgent?: string; }; credential: { id: string; keyPrefix?: string; }; durationMs: number; endpoint: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; path: string; rateLimit: { limit?: number; limited?: boolean; remaining?: number; reset?: number; }; requestId: string; statusCode: number; timestamp: string; email?: { id?: string; recipientCount?: number; }; error?: { code?: string; message?: string; }; sdk?: { name?: string; version?: string; }; }`\n  API request log entry (list view)\n\n  - `context: { idempotencyKey?: string; ipAddress?: string; queryParams?: object; userAgent?: string; }`\n  - `credential: { id: string; keyPrefix?: string; }`\n  - `durationMs: number`\n  - `endpoint: string`\n  - `method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'`\n  - `path: string`\n  - `rateLimit: { limit?: number; limited?: boolean; remaining?: number; reset?: number; }`\n  - `requestId: string`\n  - `statusCode: number`\n  - `timestamp: string`\n  - `email?: { id?: string; recipientCount?: number; }`\n  - `error?: { code?: string; message?: string; }`\n  - `sdk?: { name?: string; version?: string; }`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\n// Automatically fetches more pages as needed.\nfor await (const logEntry of client.logs.list()) {\n  console.log(logEntry);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/usage',
    httpMethod: 'get',
    summary: 'Get org-wide usage summary',
    description:
      'Returns aggregated email sending statistics for your entire organization.\nFor per-tenant breakdown, use `GET /usage/tenants`.\n\n**Use cases:**\n- Platform dashboards showing org-wide metrics\n- Quick health check on overall sending\n- Monitoring total volume and delivery rates\n\n**Response includes:**\n- `emails` - Aggregated email counts across all tenants\n- `rates` - Overall delivery and bounce rates\n- `tenants` - Tenant count summary (total, active, with activity)\n\n**Related endpoints:**\n- `GET /usage/tenants` - Paginated usage per tenant\n- `GET /usage/export` - Export usage data for billing\n- `GET /tenants/{tenantId}/usage` - Single tenant usage details\n- `GET /limits` - Rate limits and send limits\n',
    stainlessPath: '(resource) usage > (method) retrieve',
    qualified: 'client.usage.retrieve',
    params: ['period?: string;', 'timezone?: string;'],
    response:
      '{ data: { emails: object; period: object; rates: object; tenants: { active: number; total: number; withActivity: number; }; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.usage.retrieve(period?: string, timezone?: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/usage`\n\nReturns aggregated email sending statistics for your entire organization.\nFor per-tenant breakdown, use `GET /usage/tenants`.\n\n**Use cases:**\n- Platform dashboards showing org-wide metrics\n- Quick health check on overall sending\n- Monitoring total volume and delivery rates\n\n**Response includes:**\n- `emails` - Aggregated email counts across all tenants\n- `rates` - Overall delivery and bounce rates\n- `tenants` - Tenant count summary (total, active, with activity)\n\n**Related endpoints:**\n- `GET /usage/tenants` - Paginated usage per tenant\n- `GET /usage/export` - Export usage data for billing\n- `GET /tenants/{tenantId}/usage` - Single tenant usage details\n- `GET /limits` - Rate limits and send limits\n\n\n### Parameters\n\n- `period?: string`\n  Time period for usage data.\n\n**Shortcuts:** `today`, `yesterday`, `this_week`, `last_week`,\n`this_month`, `last_month`, `last_7_days`, `last_30_days`, `last_90_days`\n\n**Month format:** `2024-01` (YYYY-MM)\n\n**Custom range:** `2024-01-01..2024-01-15`\n\n\n- `timezone?: string`\n  Timezone for period calculations (IANA format)\n\n### Returns\n\n- `{ data: { emails: object; period: object; rates: object; tenants: { active: number; total: number; withActivity: number; }; }; meta: { requestId: string; }; success: true; }`\n  Org-wide usage summary response\n\n  - `data: { emails: { bounced: number; delivered: number; hard_failed: number; held: number; sent: number; soft_failed: number; }; period: { end: string; start: string; }; rates: { bounce_rate: number; delivery_rate: number; }; tenants: { active: number; total: number; withActivity: number; }; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst orgUsageSummary = await client.usage.retrieve();\n\nconsole.log(orgUsageSummary);\n```",
  },
  {
    name: 'export',
    endpoint: '/usage/export',
    httpMethod: 'get',
    summary: 'Export tenant usage data',
    description:
      'Export email usage data for all tenants in CSV or JSON Lines format.\nDesigned for billing system integration, data warehousing, and analytics.\n\n**Jobs to be done:**\n- Import usage data into billing systems (Stripe, Chargebee, etc.)\n- Load into data warehouses (Snowflake, BigQuery, etc.)\n- Process in spreadsheets (Excel, Google Sheets)\n- Feed into BI tools (Looker, Metabase, etc.)\n\n**Export formats:**\n- `csv` - UTF-8 with BOM for Excel compatibility (default)\n- `jsonl` - JSON Lines (one JSON object per line, streamable)\n\n**CSV columns:**\n`tenant_id`, `tenant_name`, `external_id`, `status`, `sent`, `delivered`,\n`soft_failed`, `hard_failed`, `bounced`, `held`, `delivery_rate`,\n`bounce_rate`, `period_start`, `period_end`\n\n**Response headers:**\n- `Content-Disposition` - Filename for download\n- `Content-Type` - `text/csv` or `application/x-ndjson`\n',
    stainlessPath: '(resource) usage > (method) export',
    qualified: 'client.usage.export',
    params: [
      "format?: 'csv' | 'jsonl';",
      'minSent?: number;',
      'period?: string;',
      "status?: 'active' | 'suspended' | 'archived';",
      'timezone?: string;',
    ],
    response:
      "{ bounce_rate: number; bounced: number; delivered: number; delivery_rate: number; hard_failed: number; held: number; sent: number; soft_failed: number; status: 'active' | 'suspended' | 'archived'; tenant_id: string; tenant_name: string; external_id?: string; }[]",
    markdown:
      "## export\n\n`client.usage.export(format?: 'csv' | 'jsonl', minSent?: number, period?: string, status?: 'active' | 'suspended' | 'archived', timezone?: string): { bounce_rate: number; bounced: number; delivered: number; delivery_rate: number; hard_failed: number; held: number; sent: number; soft_failed: number; status: 'active' | 'suspended' | 'archived'; tenant_id: string; tenant_name: string; external_id?: string; }[]`\n\n**get** `/usage/export`\n\nExport email usage data for all tenants in CSV or JSON Lines format.\nDesigned for billing system integration, data warehousing, and analytics.\n\n**Jobs to be done:**\n- Import usage data into billing systems (Stripe, Chargebee, etc.)\n- Load into data warehouses (Snowflake, BigQuery, etc.)\n- Process in spreadsheets (Excel, Google Sheets)\n- Feed into BI tools (Looker, Metabase, etc.)\n\n**Export formats:**\n- `csv` - UTF-8 with BOM for Excel compatibility (default)\n- `jsonl` - JSON Lines (one JSON object per line, streamable)\n\n**CSV columns:**\n`tenant_id`, `tenant_name`, `external_id`, `status`, `sent`, `delivered`,\n`soft_failed`, `hard_failed`, `bounced`, `held`, `delivery_rate`,\n`bounce_rate`, `period_start`, `period_end`\n\n**Response headers:**\n- `Content-Disposition` - Filename for download\n- `Content-Type` - `text/csv` or `application/x-ndjson`\n\n\n### Parameters\n\n- `format?: 'csv' | 'jsonl'`\n  Export format\n\n- `minSent?: number`\n  Only include tenants with at least this many emails sent\n\n- `period?: string`\n  Time period for export.\n\n**Shortcuts:** `this_month`, `last_month`, `last_30_days`, etc.\n\n**Month format:** `2024-01` (YYYY-MM)\n\n**Custom range:** `2024-01-01..2024-01-15`\n\n\n- `status?: 'active' | 'suspended' | 'archived'`\n  Filter by tenant status\n\n- `timezone?: string`\n  Timezone for period calculations (IANA format)\n\n### Returns\n\n- `{ bounce_rate: number; bounced: number; delivered: number; delivery_rate: number; hard_failed: number; held: number; sent: number; soft_failed: number; status: 'active' | 'suspended' | 'archived'; tenant_id: string; tenant_name: string; external_id?: string; }[]`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.usage.export();\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_tenants',
    endpoint: '/usage/tenants',
    httpMethod: 'get',
    summary: 'List usage for all tenants',
    description:
      'Returns email usage statistics for all tenants in your organization.\nResults are paginated with page-based navigation.\n\n**Jobs to be done:**\n- Generate monthly billing invoices per tenant\n- Build admin dashboards showing all customer usage\n- Identify high-volume or problematic tenants\n- Track usage against plan limits\n\n**Sorting options:**\n- `sent`, `-sent` - Sort by emails sent (ascending/descending)\n- `delivered`, `-delivered` - Sort by emails delivered\n- `bounce_rate`, `-bounce_rate` - Sort by bounce rate\n- `tenant_name`, `-tenant_name` - Sort alphabetically by tenant name\n\n**Filtering:**\n- `status` - Filter by tenant status (active, suspended, archived)\n- `minSent` - Only include tenants with at least N emails sent\n\n**Auto-pagination:** SDKs support iterating over all pages automatically.\n',
    stainlessPath: '(resource) usage > (method) list_tenants',
    qualified: 'client.usage.listTenants',
    params: [
      'minSent?: number;',
      'page?: number;',
      'period?: string;',
      'perPage?: number;',
      'sort?: string;',
      "status?: 'active' | 'suspended' | 'archived';",
      'timezone?: string;',
    ],
    response:
      "{ emails: { bounced: number; delivered: number; hard_failed: number; held: number; sent: number; soft_failed: number; }; rates: { bounce_rate: number; delivery_rate: number; }; status: 'active' | 'suspended' | 'archived'; tenantId: string; tenantName: string; externalId?: string; }",
    markdown:
      "## list_tenants\n\n`client.usage.listTenants(minSent?: number, page?: number, period?: string, perPage?: number, sort?: string, status?: 'active' | 'suspended' | 'archived', timezone?: string): { emails: email_counts; rates: email_rates; status: 'active' | 'suspended' | 'archived'; tenantId: string; tenantName: string; externalId?: string; }`\n\n**get** `/usage/tenants`\n\nReturns email usage statistics for all tenants in your organization.\nResults are paginated with page-based navigation.\n\n**Jobs to be done:**\n- Generate monthly billing invoices per tenant\n- Build admin dashboards showing all customer usage\n- Identify high-volume or problematic tenants\n- Track usage against plan limits\n\n**Sorting options:**\n- `sent`, `-sent` - Sort by emails sent (ascending/descending)\n- `delivered`, `-delivered` - Sort by emails delivered\n- `bounce_rate`, `-bounce_rate` - Sort by bounce rate\n- `tenant_name`, `-tenant_name` - Sort alphabetically by tenant name\n\n**Filtering:**\n- `status` - Filter by tenant status (active, suspended, archived)\n- `minSent` - Only include tenants with at least N emails sent\n\n**Auto-pagination:** SDKs support iterating over all pages automatically.\n\n\n### Parameters\n\n- `minSent?: number`\n  Only include tenants with at least this many emails sent\n\n- `page?: number`\n  Page number (1-indexed)\n\n- `period?: string`\n  Time period for usage data. Defaults to current month.\n\n**Shortcuts:** `today`, `yesterday`, `this_week`, `last_week`,\n`this_month`, `last_month`, `last_7_days`, `last_30_days`, `last_90_days`\n\n**Month format:** `2024-01` (YYYY-MM)\n\n**Custom range:** `2024-01-01..2024-01-15`\n\n\n- `perPage?: number`\n  Results per page (max 100)\n\n- `sort?: string`\n  Sort order for results. Prefix with `-` for descending order.\n\n- `status?: 'active' | 'suspended' | 'archived'`\n  Filter by tenant status\n\n- `timezone?: string`\n  Timezone for period calculations (IANA format). Defaults to UTC.\n\n### Returns\n\n- `{ emails: { bounced: number; delivered: number; hard_failed: number; held: number; sent: number; soft_failed: number; }; rates: { bounce_rate: number; delivery_rate: number; }; status: 'active' | 'suspended' | 'archived'; tenantId: string; tenantName: string; externalId?: string; }`\n  Usage record for a single tenant (camelCase for SDK)\n\n  - `emails: { bounced: number; delivered: number; hard_failed: number; held: number; sent: number; soft_failed: number; }`\n  - `rates: { bounce_rate: number; delivery_rate: number; }`\n  - `status: 'active' | 'suspended' | 'archived'`\n  - `tenantId: string`\n  - `tenantName: string`\n  - `externalId?: string`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\n// Automatically fetches more pages as needed.\nfor await (const tenantUsageItem of client.usage.listTenants()) {\n  console.log(tenantUsageItem);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/limits',
    httpMethod: 'get',
    summary: 'Get account rate limits and send limits',
    description:
      "Returns current rate limit and send limit information for your account.\n\nThis endpoint is the recommended way to check your account's operational limits.\nUse `/usage` endpoints for historical usage analytics.\n\n**Response includes:**\n- `rateLimit` - API request rate limit (requests per second)\n- `sendLimit` - Email sending limit (emails per hour)\n- `billing` - Credit balance and auto-recharge configuration\n\n**Notes:**\n- This request counts against your rate limit\n- `sendLimit` may be null if the service is temporarily unavailable\n- `billing` is null if billing is not configured\n- Send limit resets at the top of each hour\n",
    stainlessPath: '(resource) limits > (method) retrieve',
    qualified: 'client.limits.retrieve',
    response:
      '{ data: { billing: object; rateLimit: object; sendLimit: object; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.limits.retrieve(): { data: limits_data; meta: api_meta; success: true; }`\n\n**get** `/limits`\n\nReturns current rate limit and send limit information for your account.\n\nThis endpoint is the recommended way to check your account's operational limits.\nUse `/usage` endpoints for historical usage analytics.\n\n**Response includes:**\n- `rateLimit` - API request rate limit (requests per second)\n- `sendLimit` - Email sending limit (emails per hour)\n- `billing` - Credit balance and auto-recharge configuration\n\n**Notes:**\n- This request counts against your rate limit\n- `sendLimit` may be null if the service is temporarily unavailable\n- `billing` is null if billing is not configured\n- Send limit resets at the top of each hour\n\n\n### Returns\n\n- `{ data: { billing: object; rateLimit: object; sendLimit: object; }; meta: { requestId: string; }; success: true; }`\n  Account rate limits and send limits response\n\n  - `data: { billing: { autoRecharge: { amount: string; enabled: boolean; threshold: string; }; creditBalance: string; creditBalanceCents: number; hasPaymentMethod: boolean; }; rateLimit: { limit: number; period: 'second'; remaining: number; reset: number; }; sendLimit: { approaching: boolean; exceeded: boolean; limit: number; period: 'hour'; remaining: number; resetsAt: string; usagePercent: number; used: number; }; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst limit = await client.limits.retrieve();\n\nconsole.log(limit);\n```",
  },
  {
    name: 'create',
    endpoint: '/tenants',
    httpMethod: 'post',
    summary: 'Create a tenant',
    description:
      'Create a new tenant.\n\nReturns the created tenant with a unique `id`. Store this ID in your database\nto reference this tenant later.\n',
    stainlessPath: '(resource) tenants > (method) create',
    qualified: 'client.tenants.create',
    params: ['name: string;', 'metadata?: object;'],
    response:
      "{ data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## create\n\n`client.tenants.create(name: string, metadata?: object): { data: tenant; meta: api_meta; success: true; }`\n\n**post** `/tenants`\n\nCreate a new tenant.\n\nReturns the created tenant with a unique `id`. Store this ID in your database\nto reference this tenant later.\n\n\n### Parameters\n\n- `name: string`\n  Display name for the tenant (e.g., your customer's company name)\n\n- `metadata?: object`\n  Custom key-value pairs. Useful for storing references to your internal systems.\n\n**Limits:**\n- Max 50 keys\n- Key names max 40 characters\n- String values max 500 characters\n- Total size max 8KB\n\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tenant = await client.tenants.create({ name: 'Acme Corp' });\n\nconsole.log(tenant);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tenants/{tenantId}',
    httpMethod: 'get',
    summary: 'Get a tenant',
    description: 'Get a tenant by ID.',
    stainlessPath: '(resource) tenants > (method) retrieve',
    qualified: 'client.tenants.retrieve',
    params: ['tenantId: string;'],
    response:
      "{ data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## retrieve\n\n`client.tenants.retrieve(tenantId: string): { data: tenant; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}`\n\nGet a tenant by ID.\n\n### Parameters\n\n- `tenantId: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tenant = await client.tenants.retrieve('cm6abc123def456');\n\nconsole.log(tenant);\n```",
  },
  {
    name: 'update',
    endpoint: '/tenants/{tenantId}',
    httpMethod: 'patch',
    summary: 'Update a tenant',
    description:
      "Update a tenant's name, metadata, or status. At least one field is required.\n\nMetadata is replaced entirely—include all keys you want to keep.\n",
    stainlessPath: '(resource) tenants > (method) update',
    qualified: 'client.tenants.update',
    params: [
      'tenantId: string;',
      'metadata?: object;',
      'name?: string;',
      "status?: 'active' | 'suspended' | 'archived';",
    ],
    response:
      "{ data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## update\n\n`client.tenants.update(tenantId: string, metadata?: object, name?: string, status?: 'active' | 'suspended' | 'archived'): { data: tenant; meta: api_meta; success: true; }`\n\n**patch** `/tenants/{tenantId}`\n\nUpdate a tenant's name, metadata, or status. At least one field is required.\n\nMetadata is replaced entirely—include all keys you want to keep.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `metadata?: object`\n  Custom key-value pairs. Useful for storing references to your internal systems.\n\n**Limits:**\n- Max 50 keys\n- Key names max 40 characters\n- String values max 500 characters\n- Total size max 8KB\n\n\n- `name?: string`\n  Display name for the tenant\n\n- `status?: 'active' | 'suspended' | 'archived'`\n  Tenant status\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tenant = await client.tenants.update('cm6abc123def456');\n\nconsole.log(tenant);\n```",
  },
  {
    name: 'list',
    endpoint: '/tenants',
    httpMethod: 'get',
    summary: 'List all tenants',
    description: 'List all tenants with pagination. Filter by `status` if needed.\n',
    stainlessPath: '(resource) tenants > (method) list',
    qualified: 'client.tenants.list',
    params: ['page?: number;', 'perPage?: number;', "status?: 'active' | 'suspended' | 'archived';"],
    response:
      "{ id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }",
    markdown:
      "## list\n\n`client.tenants.list(page?: number, perPage?: number, status?: 'active' | 'suspended' | 'archived'): { id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }`\n\n**get** `/tenants`\n\nList all tenants with pagination. Filter by `status` if needed.\n\n\n### Parameters\n\n- `page?: number`\n  Page number (1-indexed)\n\n- `perPage?: number`\n  Number of items per page (max 100)\n\n- `status?: 'active' | 'suspended' | 'archived'`\n  Filter by tenant status\n\n### Returns\n\n- `{ id: string; createdAt: string; metadata: object; name: string; status: 'active' | 'suspended' | 'archived'; updatedAt: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `metadata: object`\n  - `name: string`\n  - `status: 'active' | 'suspended' | 'archived'`\n  - `updatedAt: string`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\n// Automatically fetches more pages as needed.\nfor await (const tenant of client.tenants.list()) {\n  console.log(tenant);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/tenants/{tenantId}',
    httpMethod: 'delete',
    summary: 'Delete a tenant',
    description: 'Permanently delete a tenant. This cannot be undone.\n',
    stainlessPath: '(resource) tenants > (method) delete',
    qualified: 'client.tenants.delete',
    params: ['tenantId: string;'],
    response: '{ data: { deleted: true; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## delete\n\n`client.tenants.delete(tenantId: string): { data: object; meta: api_meta; success: true; }`\n\n**delete** `/tenants/{tenantId}`\n\nPermanently delete a tenant. This cannot be undone.\n\n\n### Parameters\n\n- `tenantId: string`\n\n### Returns\n\n- `{ data: { deleted: true; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { deleted: true; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tenant = await client.tenants.delete('cm6abc123def456');\n\nconsole.log(tenant);\n```",
  },
  {
    name: 'create',
    endpoint: '/tenants/{tenantId}/credentials',
    httpMethod: 'post',
    summary: 'Create a credential for a tenant',
    description:
      'Create a new SMTP or API credential for a tenant. The credential can be used\nto send emails via Ark on behalf of the tenant.\n\n**Important:** The credential key is only returned once at creation time.\nStore it securely - you cannot retrieve it again.\n\n**Credential Types:**\n- `smtp` - For SMTP-based email sending. Returns both `key` and `smtpUsername`.\n- `api` - For API-based email sending. Returns only `key`.\n',
    stainlessPath: '(resource) tenants.credentials > (method) create',
    qualified: 'client.tenants.credentials.create',
    params: ['tenantId: string;', 'name: string;', "type: 'smtp' | 'api';"],
    response:
      "{ data: { id: number; createdAt: string; hold: boolean; key: string; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; smtpUsername?: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## create\n\n`client.tenants.credentials.create(tenantId: string, name: string, type: 'smtp' | 'api'): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/credentials`\n\nCreate a new SMTP or API credential for a tenant. The credential can be used\nto send emails via Ark on behalf of the tenant.\n\n**Important:** The credential key is only returned once at creation time.\nStore it securely - you cannot retrieve it again.\n\n**Credential Types:**\n- `smtp` - For SMTP-based email sending. Returns both `key` and `smtpUsername`.\n- `api` - For API-based email sending. Returns only `key`.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `name: string`\n  Name for the credential. Can only contain letters, numbers,\nhyphens, and underscores. Max 50 characters.\n\n\n- `type: 'smtp' | 'api'`\n  Type of credential:\n- `smtp` - For SMTP-based email sending\n- `api` - For API-based email sending\n\n### Returns\n\n- `{ data: { id: number; createdAt: string; hold: boolean; key: string; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; smtpUsername?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: number; createdAt: string; hold: boolean; key: string; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; smtpUsername?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst credential = await client.tenants.credentials.create('cm6abc123def456', { name: 'production-smtp', type: 'smtp' });\n\nconsole.log(credential);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tenants/{tenantId}/credentials/{credentialId}',
    httpMethod: 'get',
    summary: 'Get a credential',
    description:
      'Get details of a specific credential.\n\n**Revealing the key:** By default, the credential key is not returned.\nPass `reveal=true` to include the key in the response. Use this sparingly\nand only when you need to retrieve the key (e.g., for configuration).\n',
    stainlessPath: '(resource) tenants.credentials > (method) retrieve',
    qualified: 'client.tenants.credentials.retrieve',
    params: ['tenantId: string;', 'credentialId: number;', 'reveal?: boolean;'],
    response:
      "{ data: { id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; key?: string; smtpUsername?: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## retrieve\n\n`client.tenants.credentials.retrieve(tenantId: string, credentialId: number, reveal?: boolean): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/credentials/{credentialId}`\n\nGet details of a specific credential.\n\n**Revealing the key:** By default, the credential key is not returned.\nPass `reveal=true` to include the key in the response. Use this sparingly\nand only when you need to retrieve the key (e.g., for configuration).\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `credentialId: number`\n\n- `reveal?: boolean`\n  Set to `true` to include the credential key in the response\n\n### Returns\n\n- `{ data: { id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; key?: string; smtpUsername?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; key?: string; smtpUsername?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst credential = await client.tenants.credentials.retrieve(123, { tenantId: 'cm6abc123def456' });\n\nconsole.log(credential);\n```",
  },
  {
    name: 'update',
    endpoint: '/tenants/{tenantId}/credentials/{credentialId}',
    httpMethod: 'patch',
    summary: 'Update a credential',
    description:
      "Update a credential's name or hold status.\n\n**Hold Status:**\n- When `hold: true`, the credential is disabled and cannot be used to send emails.\n- When `hold: false`, the credential is active and can send emails.\n- Use this to temporarily disable a credential without deleting it.\n",
    stainlessPath: '(resource) tenants.credentials > (method) update',
    qualified: 'client.tenants.credentials.update',
    params: ['tenantId: string;', 'credentialId: number;', 'hold?: boolean;', 'name?: string;'],
    response:
      "{ data: { id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; key?: string; smtpUsername?: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## update\n\n`client.tenants.credentials.update(tenantId: string, credentialId: number, hold?: boolean, name?: string): { data: object; meta: api_meta; success: true; }`\n\n**patch** `/tenants/{tenantId}/credentials/{credentialId}`\n\nUpdate a credential's name or hold status.\n\n**Hold Status:**\n- When `hold: true`, the credential is disabled and cannot be used to send emails.\n- When `hold: false`, the credential is active and can send emails.\n- Use this to temporarily disable a credential without deleting it.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `credentialId: number`\n\n- `hold?: boolean`\n  Set to `true` to disable the credential (put on hold).\nSet to `false` to enable the credential (release from hold).\n\n\n- `name?: string`\n  New name for the credential\n\n### Returns\n\n- `{ data: { id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; key?: string; smtpUsername?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; key?: string; smtpUsername?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst credential = await client.tenants.credentials.update(123, { tenantId: 'cm6abc123def456' });\n\nconsole.log(credential);\n```",
  },
  {
    name: 'list',
    endpoint: '/tenants/{tenantId}/credentials',
    httpMethod: 'get',
    summary: 'List credentials for a tenant',
    description:
      'List all SMTP and API credentials for a tenant. Credentials are used to send\nemails via Ark on behalf of the tenant.\n\n**Security:** Credential keys are not returned in the list response. Use the\nretrieve endpoint with `reveal=true` to get the key.\n',
    stainlessPath: '(resource) tenants.credentials > (method) list',
    qualified: 'client.tenants.credentials.list',
    params: ['tenantId: string;', 'page?: number;', 'perPage?: number;', "type?: 'smtp' | 'api';"],
    response:
      "{ id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; }",
    markdown:
      "## list\n\n`client.tenants.credentials.list(tenantId: string, page?: number, perPage?: number, type?: 'smtp' | 'api'): { id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; }`\n\n**get** `/tenants/{tenantId}/credentials`\n\nList all SMTP and API credentials for a tenant. Credentials are used to send\nemails via Ark on behalf of the tenant.\n\n**Security:** Credential keys are not returned in the list response. Use the\nretrieve endpoint with `reveal=true` to get the key.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `page?: number`\n  Page number (1-indexed)\n\n- `perPage?: number`\n  Number of items per page (max 100)\n\n- `type?: 'smtp' | 'api'`\n  Filter by credential type\n\n### Returns\n\n- `{ id: number; createdAt: string; hold: boolean; lastUsedAt: string; name: string; type: 'smtp' | 'api'; updatedAt: string; }`\n\n  - `id: number`\n  - `createdAt: string`\n  - `hold: boolean`\n  - `lastUsedAt: string`\n  - `name: string`\n  - `type: 'smtp' | 'api'`\n  - `updatedAt: string`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\n// Automatically fetches more pages as needed.\nfor await (const credentialListResponse of client.tenants.credentials.list('cm6abc123def456')) {\n  console.log(credentialListResponse);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/tenants/{tenantId}/credentials/{credentialId}',
    httpMethod: 'delete',
    summary: 'Delete a credential',
    description:
      'Permanently delete (revoke) a credential. The credential can no longer be\nused to send emails.\n\n**Warning:** This action is irreversible. If you want to temporarily disable\na credential, use the update endpoint to set `hold: true` instead.\n',
    stainlessPath: '(resource) tenants.credentials > (method) delete',
    qualified: 'client.tenants.credentials.delete',
    params: ['tenantId: string;', 'credentialId: number;'],
    response: '{ data: { deleted: true; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## delete\n\n`client.tenants.credentials.delete(tenantId: string, credentialId: number): { data: object; meta: api_meta; success: true; }`\n\n**delete** `/tenants/{tenantId}/credentials/{credentialId}`\n\nPermanently delete (revoke) a credential. The credential can no longer be\nused to send emails.\n\n**Warning:** This action is irreversible. If you want to temporarily disable\na credential, use the update endpoint to set `hold: true` instead.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `credentialId: number`\n\n### Returns\n\n- `{ data: { deleted: true; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { deleted: true; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst credential = await client.tenants.credentials.delete(123, { tenantId: 'cm6abc123def456' });\n\nconsole.log(credential);\n```",
  },
  {
    name: 'create',
    endpoint: '/tenants/{tenantId}/domains',
    httpMethod: 'post',
    summary: 'Add a sending domain',
    description:
      'Add a new sending domain to a tenant. Returns DNS records that must\nbe configured before the domain can be verified.\n\nEach tenant gets their own isolated mail server for domain isolation.\n\n**Required DNS records:**\n- **SPF** - TXT record for sender authentication\n- **DKIM** - TXT record for email signing\n- **Return Path** - CNAME for bounce handling\n\nAfter adding DNS records, call `POST /tenants/{tenantId}/domains/{domainId}/verify` to verify.\n',
    stainlessPath: '(resource) tenants.domains > (method) create',
    qualified: 'client.tenants.domains.create',
    params: ['tenantId: string;', 'name: string;'],
    response:
      '{ data: { id: number; createdAt: string; dnsRecords: { dkim?: dns_record; returnPath?: dns_record; spf?: dns_record; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## create\n\n`client.tenants.domains.create(tenantId: string, name: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/domains`\n\nAdd a new sending domain to a tenant. Returns DNS records that must\nbe configured before the domain can be verified.\n\nEach tenant gets their own isolated mail server for domain isolation.\n\n**Required DNS records:**\n- **SPF** - TXT record for sender authentication\n- **DKIM** - TXT record for email signing\n- **Return Path** - CNAME for bounce handling\n\nAfter adding DNS records, call `POST /tenants/{tenantId}/domains/{domainId}/verify` to verify.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `name: string`\n  Domain name (e.g., \"mail.example.com\")\n\n### Returns\n\n- `{ data: { id: number; createdAt: string; dnsRecords: { dkim?: dns_record; returnPath?: dns_record; spf?: dns_record; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: number; createdAt: string; dnsRecords: { dkim?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; returnPath?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; spf?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst domain = await client.tenants.domains.create('cm6abc123def456', { name: 'notifications.myapp.com' });\n\nconsole.log(domain);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tenants/{tenantId}/domains/{domainId}',
    httpMethod: 'get',
    summary: 'Get domain details',
    description: 'Get detailed information about a domain including DNS record status.',
    stainlessPath: '(resource) tenants.domains > (method) retrieve',
    qualified: 'client.tenants.domains.retrieve',
    params: ['tenantId: string;', 'domainId: string;'],
    response:
      '{ data: { id: number; createdAt: string; dnsRecords: { dkim?: dns_record; returnPath?: dns_record; spf?: dns_record; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.tenants.domains.retrieve(tenantId: string, domainId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/domains/{domainId}`\n\nGet detailed information about a domain including DNS record status.\n\n### Parameters\n\n- `tenantId: string`\n\n- `domainId: string`\n\n### Returns\n\n- `{ data: { id: number; createdAt: string; dnsRecords: { dkim?: dns_record; returnPath?: dns_record; spf?: dns_record; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: number; createdAt: string; dnsRecords: { dkim?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; returnPath?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; spf?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst domain = await client.tenants.domains.retrieve('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(domain);\n```",
  },
  {
    name: 'list',
    endpoint: '/tenants/{tenantId}/domains',
    httpMethod: 'get',
    summary: 'List tenant domains',
    description: 'Get all sending domains for a specific tenant with their verification status.\n',
    stainlessPath: '(resource) tenants.domains > (method) list',
    qualified: 'client.tenants.domains.list',
    params: ['tenantId: string;'],
    response:
      '{ data: { domains: { id: number; name: string; verified: boolean; tenant_id?: string; tenant_name?: string; }[]; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## list\n\n`client.tenants.domains.list(tenantId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/domains`\n\nGet all sending domains for a specific tenant with their verification status.\n\n\n### Parameters\n\n- `tenantId: string`\n\n### Returns\n\n- `{ data: { domains: { id: number; name: string; verified: boolean; tenant_id?: string; tenant_name?: string; }[]; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { domains: { id: number; name: string; verified: boolean; tenant_id?: string; tenant_name?: string; }[]; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst domains = await client.tenants.domains.list('cm6abc123def456');\n\nconsole.log(domains);\n```",
  },
  {
    name: 'delete',
    endpoint: '/tenants/{tenantId}/domains/{domainId}',
    httpMethod: 'delete',
    summary: 'Delete a domain',
    description:
      'Remove a sending domain from a tenant. You will no longer be able to send emails\nfrom this domain.\n\n**Warning:** This action cannot be undone.\n',
    stainlessPath: '(resource) tenants.domains > (method) delete',
    qualified: 'client.tenants.domains.delete',
    params: ['tenantId: string;', 'domainId: string;'],
    response: '{ data: { message: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## delete\n\n`client.tenants.domains.delete(tenantId: string, domainId: string): { data: object; meta: api_meta; success: true; }`\n\n**delete** `/tenants/{tenantId}/domains/{domainId}`\n\nRemove a sending domain from a tenant. You will no longer be able to send emails\nfrom this domain.\n\n**Warning:** This action cannot be undone.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `domainId: string`\n\n### Returns\n\n- `{ data: { message: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { message: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst domain = await client.tenants.domains.delete('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(domain);\n```",
  },
  {
    name: 'verify',
    endpoint: '/tenants/{tenantId}/domains/{domainId}/verify',
    httpMethod: 'post',
    summary: 'Verify domain DNS',
    description:
      "Check if DNS records are correctly configured and verify the domain.\nReturns the current status of each required DNS record.\n\nCall this after you've added the DNS records shown when creating the domain.\n",
    stainlessPath: '(resource) tenants.domains > (method) verify',
    qualified: 'client.tenants.domains.verify',
    params: ['tenantId: string;', 'domainId: string;'],
    response:
      '{ data: { id: number; createdAt: string; dnsRecords: { dkim?: dns_record; returnPath?: dns_record; spf?: dns_record; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## verify\n\n`client.tenants.domains.verify(tenantId: string, domainId: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/domains/{domainId}/verify`\n\nCheck if DNS records are correctly configured and verify the domain.\nReturns the current status of each required DNS record.\n\nCall this after you've added the DNS records shown when creating the domain.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `domainId: string`\n\n### Returns\n\n- `{ data: { id: number; createdAt: string; dnsRecords: { dkim?: dns_record; returnPath?: dns_record; spf?: dns_record; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: number; createdAt: string; dnsRecords: { dkim?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; returnPath?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; spf?: { fullName: string; name: string; type: 'TXT' | 'CNAME' | 'MX'; value: string; status?: 'OK' | 'Missing' | 'Invalid'; }; zone?: string; }; name: string; uuid: string; verified: boolean; tenant_id?: string; tenant_name?: string; verifiedAt?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.tenants.domains.verify('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/tenants/{tenantId}/suppressions',
    httpMethod: 'post',
    summary: 'Add to suppression list',
    description:
      "Add an email address to the tenant's suppression list. The address will\nnot receive any emails from this tenant until removed.\n",
    stainlessPath: '(resource) tenants.suppressions > (method) create',
    qualified: 'client.tenants.suppressions.create',
    params: ['tenantId: string;', 'address: string;', 'reason?: string;'],
    response:
      '{ data: { id: string; address: string; createdAt: string; reason?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## create\n\n`client.tenants.suppressions.create(tenantId: string, address: string, reason?: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/suppressions`\n\nAdd an email address to the tenant's suppression list. The address will\nnot receive any emails from this tenant until removed.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `address: string`\n  Email address to suppress\n\n- `reason?: string`\n  Reason for suppression (accepts null)\n\n### Returns\n\n- `{ data: { id: string; address: string; createdAt: string; reason?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; address: string; createdAt: string; reason?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst suppression = await client.tenants.suppressions.create('cm6abc123def456', { address: 'user@example.com' });\n\nconsole.log(suppression);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tenants/{tenantId}/suppressions/{email}',
    httpMethod: 'get',
    summary: 'Check if address is suppressed',
    description: "Check if a specific email address is on the tenant's suppression list.",
    stainlessPath: '(resource) tenants.suppressions > (method) retrieve',
    qualified: 'client.tenants.suppressions.retrieve',
    params: ['tenantId: string;', 'email: string;'],
    response:
      '{ data: { address: string; suppressed: boolean; createdAt?: string; reason?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.tenants.suppressions.retrieve(tenantId: string, email: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/suppressions/{email}`\n\nCheck if a specific email address is on the tenant's suppression list.\n\n### Parameters\n\n- `tenantId: string`\n\n- `email: string`\n\n### Returns\n\n- `{ data: { address: string; suppressed: boolean; createdAt?: string; reason?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { address: string; suppressed: boolean; createdAt?: string; reason?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst suppression = await client.tenants.suppressions.retrieve('user@example.com', { tenantId: 'cm6abc123def456' });\n\nconsole.log(suppression);\n```",
  },
  {
    name: 'list',
    endpoint: '/tenants/{tenantId}/suppressions',
    httpMethod: 'get',
    summary: 'List suppressed addresses',
    description:
      "Get all email addresses on the tenant's suppression list. These addresses\nwill not receive any emails from this tenant.\n",
    stainlessPath: '(resource) tenants.suppressions > (method) list',
    qualified: 'client.tenants.suppressions.list',
    params: ['tenantId: string;', 'page?: number;', 'perPage?: number;'],
    response: '{ id: string; address: string; createdAt: string; reason?: string; }',
    markdown:
      "## list\n\n`client.tenants.suppressions.list(tenantId: string, page?: number, perPage?: number): { id: string; address: string; createdAt: string; reason?: string; }`\n\n**get** `/tenants/{tenantId}/suppressions`\n\nGet all email addresses on the tenant's suppression list. These addresses\nwill not receive any emails from this tenant.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `page?: number`\n\n- `perPage?: number`\n\n### Returns\n\n- `{ id: string; address: string; createdAt: string; reason?: string; }`\n\n  - `id: string`\n  - `address: string`\n  - `createdAt: string`\n  - `reason?: string`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\n// Automatically fetches more pages as needed.\nfor await (const suppressionListResponse of client.tenants.suppressions.list('cm6abc123def456')) {\n  console.log(suppressionListResponse);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/tenants/{tenantId}/suppressions/{email}',
    httpMethod: 'delete',
    summary: 'Remove from suppression list',
    description:
      "Remove an email address from the tenant's suppression list. The address\nwill be able to receive emails from this tenant again.\n",
    stainlessPath: '(resource) tenants.suppressions > (method) delete',
    qualified: 'client.tenants.suppressions.delete',
    params: ['tenantId: string;', 'email: string;'],
    response: '{ data: { message: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## delete\n\n`client.tenants.suppressions.delete(tenantId: string, email: string): { data: object; meta: api_meta; success: true; }`\n\n**delete** `/tenants/{tenantId}/suppressions/{email}`\n\nRemove an email address from the tenant's suppression list. The address\nwill be able to receive emails from this tenant again.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `email: string`\n\n### Returns\n\n- `{ data: { message: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { message: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst suppression = await client.tenants.suppressions.delete('user@example.com', { tenantId: 'cm6abc123def456' });\n\nconsole.log(suppression);\n```",
  },
  {
    name: 'create',
    endpoint: '/tenants/{tenantId}/webhooks',
    httpMethod: 'post',
    summary: 'Create a webhook',
    description:
      'Create a webhook endpoint to receive email event notifications for a tenant.\n\n**Available events:**\n- `MessageSent` - Email accepted by recipient server\n- `MessageDeliveryFailed` - Delivery permanently failed\n- `MessageDelayed` - Delivery temporarily failed, will retry\n- `MessageBounced` - Email bounced\n- `MessageHeld` - Email held for review\n- `MessageLinkClicked` - Recipient clicked a link\n- `MessageLoaded` - Recipient opened the email\n- `DomainDNSError` - Domain DNS issue detected\n',
    stainlessPath: '(resource) tenants.webhooks > (method) create',
    qualified: 'client.tenants.webhooks.create',
    params: [
      'tenantId: string;',
      'name: string;',
      'url: string;',
      'allEvents?: boolean;',
      'enabled?: boolean;',
      'events?: string[];',
    ],
    response:
      '{ data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## create\n\n`client.tenants.webhooks.create(tenantId: string, name: string, url: string, allEvents?: boolean, enabled?: boolean, events?: string[]): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/webhooks`\n\nCreate a webhook endpoint to receive email event notifications for a tenant.\n\n**Available events:**\n- `MessageSent` - Email accepted by recipient server\n- `MessageDeliveryFailed` - Delivery permanently failed\n- `MessageDelayed` - Delivery temporarily failed, will retry\n- `MessageBounced` - Email bounced\n- `MessageHeld` - Email held for review\n- `MessageLinkClicked` - Recipient clicked a link\n- `MessageLoaded` - Recipient opened the email\n- `DomainDNSError` - Domain DNS issue detected\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `name: string`\n  Webhook name for identification\n\n- `url: string`\n  HTTPS endpoint URL\n\n- `allEvents?: boolean`\n  Subscribe to all events (ignores events array, accepts null)\n\n- `enabled?: boolean`\n  Whether the webhook is enabled (accepts null)\n\n- `events?: string[]`\n  Events to subscribe to (accepts null):\n- `MessageSent` - Email successfully delivered to recipient's server\n- `MessageDelayed` - Temporary delivery failure, will retry\n- `MessageDeliveryFailed` - Permanent delivery failure\n- `MessageHeld` - Email held for manual review\n- `MessageBounced` - Email bounced back\n- `MessageLinkClicked` - Recipient clicked a tracked link\n- `MessageLoaded` - Recipient opened the email (tracking pixel loaded)\n- `DomainDNSError` - DNS configuration issue detected\n\n\n### Returns\n\n- `{ data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.tenants.webhooks.create('cm6abc123def456', { name: 'My App Webhook', url: 'https://myapp.com/webhooks/email' });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tenants/{tenantId}/webhooks/{webhookId}',
    httpMethod: 'get',
    summary: 'Get webhook details',
    description: 'Get webhook details',
    stainlessPath: '(resource) tenants.webhooks > (method) retrieve',
    qualified: 'client.tenants.webhooks.retrieve',
    params: ['tenantId: string;', 'webhookId: string;'],
    response:
      '{ data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.tenants.webhooks.retrieve(tenantId: string, webhookId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/webhooks/{webhookId}`\n\nGet webhook details\n\n### Parameters\n\n- `tenantId: string`\n\n- `webhookId: string`\n\n### Returns\n\n- `{ data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.tenants.webhooks.retrieve('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'update',
    endpoint: '/tenants/{tenantId}/webhooks/{webhookId}',
    httpMethod: 'patch',
    summary: 'Update a webhook',
    description: 'Update a webhook',
    stainlessPath: '(resource) tenants.webhooks > (method) update',
    qualified: 'client.tenants.webhooks.update',
    params: [
      'tenantId: string;',
      'webhookId: string;',
      'allEvents?: boolean;',
      'enabled?: boolean;',
      'events?: string[];',
      'name?: string;',
      'url?: string;',
    ],
    response:
      '{ data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## update\n\n`client.tenants.webhooks.update(tenantId: string, webhookId: string, allEvents?: boolean, enabled?: boolean, events?: string[], name?: string, url?: string): { data: object; meta: api_meta; success: true; }`\n\n**patch** `/tenants/{tenantId}/webhooks/{webhookId}`\n\nUpdate a webhook\n\n### Parameters\n\n- `tenantId: string`\n\n- `webhookId: string`\n\n- `allEvents?: boolean`\n\n- `enabled?: boolean`\n\n- `events?: string[]`\n\n- `name?: string`\n\n- `url?: string`\n\n### Returns\n\n- `{ data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; allEvents: boolean; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; uuid: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.tenants.webhooks.update('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/tenants/{tenantId}/webhooks',
    httpMethod: 'get',
    summary: 'List webhooks',
    description: 'Get all configured webhook endpoints for a tenant.',
    stainlessPath: '(resource) tenants.webhooks > (method) list',
    qualified: 'client.tenants.webhooks.list',
    params: ['tenantId: string;'],
    response:
      '{ data: { webhooks: { id: string; enabled: boolean; events: string[]; name: string; url: string; }[]; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## list\n\n`client.tenants.webhooks.list(tenantId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/webhooks`\n\nGet all configured webhook endpoints for a tenant.\n\n### Parameters\n\n- `tenantId: string`\n\n### Returns\n\n- `{ data: { webhooks: { id: string; enabled: boolean; events: string[]; name: string; url: string; }[]; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { webhooks: { id: string; enabled: boolean; events: string[]; name: string; url: string; }[]; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhooks = await client.tenants.webhooks.list('cm6abc123def456');\n\nconsole.log(webhooks);\n```",
  },
  {
    name: 'delete',
    endpoint: '/tenants/{tenantId}/webhooks/{webhookId}',
    httpMethod: 'delete',
    summary: 'Delete a webhook',
    description: 'Delete a webhook',
    stainlessPath: '(resource) tenants.webhooks > (method) delete',
    qualified: 'client.tenants.webhooks.delete',
    params: ['tenantId: string;', 'webhookId: string;'],
    response: '{ data: { message: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## delete\n\n`client.tenants.webhooks.delete(tenantId: string, webhookId: string): { data: object; meta: api_meta; success: true; }`\n\n**delete** `/tenants/{tenantId}/webhooks/{webhookId}`\n\nDelete a webhook\n\n### Parameters\n\n- `tenantId: string`\n\n- `webhookId: string`\n\n### Returns\n\n- `{ data: { message: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { message: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.tenants.webhooks.delete('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list_deliveries',
    endpoint: '/tenants/{tenantId}/webhooks/{webhookId}/deliveries',
    httpMethod: 'get',
    summary: 'List webhook deliveries',
    description:
      'Get a paginated list of delivery attempts for a specific webhook.\n\nUse this to:\n- Monitor webhook health and delivery success rate\n- Debug failed deliveries\n- Find specific events to replay\n\n**Filtering:**\n- Filter by success/failure to find problematic deliveries\n- Filter by event type to find specific events\n- Filter by time range for debugging recent issues\n\n**Retry behavior:**\nFailed deliveries are automatically retried with exponential backoff over ~3 days.\nCheck `willRetry` to see if more attempts are scheduled.\n',
    stainlessPath: '(resource) tenants.webhooks > (method) list_deliveries',
    qualified: 'client.tenants.webhooks.listDeliveries',
    params: [
      'tenantId: string;',
      'webhookId: string;',
      'after?: number;',
      'before?: number;',
      'event?: string;',
      'page?: number;',
      'perPage?: number;',
      'success?: boolean;',
    ],
    response:
      '{ data: { id: string; attempt: number; event: string; statusCode: number; success: boolean; timestamp: string; url: string; webhookId: string; willRetry: boolean; }[]; meta: { requestId: string; }; page: number; perPage: number; total: number; totalPages: number; }',
    markdown:
      "## list_deliveries\n\n`client.tenants.webhooks.listDeliveries(tenantId: string, webhookId: string, after?: number, before?: number, event?: string, page?: number, perPage?: number, success?: boolean): { data: object[]; meta: api_meta; page: number; perPage: number; total: number; totalPages: number; }`\n\n**get** `/tenants/{tenantId}/webhooks/{webhookId}/deliveries`\n\nGet a paginated list of delivery attempts for a specific webhook.\n\nUse this to:\n- Monitor webhook health and delivery success rate\n- Debug failed deliveries\n- Find specific events to replay\n\n**Filtering:**\n- Filter by success/failure to find problematic deliveries\n- Filter by event type to find specific events\n- Filter by time range for debugging recent issues\n\n**Retry behavior:**\nFailed deliveries are automatically retried with exponential backoff over ~3 days.\nCheck `willRetry` to see if more attempts are scheduled.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `webhookId: string`\n\n- `after?: number`\n  Only deliveries after this Unix timestamp\n\n- `before?: number`\n  Only deliveries before this Unix timestamp\n\n- `event?: string`\n  Filter by event type\n\n- `page?: number`\n  Page number (default 1)\n\n- `perPage?: number`\n  Items per page (default 30, max 100)\n\n- `success?: boolean`\n  Filter by delivery success (true = 2xx response, false = non-2xx or error)\n\n### Returns\n\n- `{ data: { id: string; attempt: number; event: string; statusCode: number; success: boolean; timestamp: string; url: string; webhookId: string; willRetry: boolean; }[]; meta: { requestId: string; }; page: number; perPage: number; total: number; totalPages: number; }`\n  Paginated list of webhook delivery attempts\n\n  - `data: { id: string; attempt: number; event: string; statusCode: number; success: boolean; timestamp: string; url: string; webhookId: string; willRetry: boolean; }[]`\n  - `meta: { requestId: string; }`\n  - `page: number`\n  - `perPage: number`\n  - `total: number`\n  - `totalPages: number`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.tenants.webhooks.listDeliveries('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'replay_delivery',
    endpoint: '/tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}/replay',
    httpMethod: 'post',
    summary: 'Replay a webhook delivery',
    description:
      'Re-send a webhook delivery to your endpoint.\n\n**Use cases:**\n- Recover from transient failures after fixing your endpoint\n- Test endpoint changes with real historical data\n- Retry deliveries that failed due to downtime\n\n**How it works:**\n1. Fetches the original payload from the delivery\n2. Generates a new timestamp and signature\n3. Sends to your webhook URL immediately\n4. Returns the result (does not queue for retry if it fails)\n\n**Note:** The webhook must be enabled to replay deliveries.\n',
    stainlessPath: '(resource) tenants.webhooks > (method) replay_delivery',
    qualified: 'client.tenants.webhooks.replayDelivery',
    params: ['tenantId: string;', 'webhookId: string;', 'deliveryId: string;'],
    response:
      '{ data: { duration: number; newDeliveryId: string; originalDeliveryId: string; statusCode: number; success: boolean; timestamp: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## replay_delivery\n\n`client.tenants.webhooks.replayDelivery(tenantId: string, webhookId: string, deliveryId: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}/replay`\n\nRe-send a webhook delivery to your endpoint.\n\n**Use cases:**\n- Recover from transient failures after fixing your endpoint\n- Test endpoint changes with real historical data\n- Retry deliveries that failed due to downtime\n\n**How it works:**\n1. Fetches the original payload from the delivery\n2. Generates a new timestamp and signature\n3. Sends to your webhook URL immediately\n4. Returns the result (does not queue for retry if it fails)\n\n**Note:** The webhook must be enabled to replay deliveries.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `webhookId: string`\n\n- `deliveryId: string`\n\n### Returns\n\n- `{ data: { duration: number; newDeliveryId: string; originalDeliveryId: string; statusCode: number; success: boolean; timestamp: string; }; meta: { requestId: string; }; success: true; }`\n  Result of replaying a webhook delivery\n\n  - `data: { duration: number; newDeliveryId: string; originalDeliveryId: string; statusCode: number; success: boolean; timestamp: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.tenants.webhooks.replayDelivery('whr_abc123def456', { tenantId: 'cm6abc123def456', webhookId: '123' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_delivery',
    endpoint: '/tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}',
    httpMethod: 'get',
    summary: 'Get webhook delivery details',
    description:
      'Get detailed information about a specific webhook delivery attempt.\n\nReturns:\n- The complete request payload that was sent\n- Request headers including the signature\n- Response status code and body from your endpoint\n- Timing information\n\nUse this to debug why a delivery failed or verify what data was sent.\n',
    stainlessPath: '(resource) tenants.webhooks > (method) retrieve_delivery',
    qualified: 'client.tenants.webhooks.retrieveDelivery',
    params: ['tenantId: string;', 'webhookId: string;', 'deliveryId: string;'],
    response:
      '{ data: { id: string; attempt: number; event: string; request: { headers: object; payload: object; }; response: { statusCode: number; body?: string; }; statusCode: number; success: boolean; timestamp: string; url: string; webhookId: string; webhookName: string; willRetry: boolean; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve_delivery\n\n`client.tenants.webhooks.retrieveDelivery(tenantId: string, webhookId: string, deliveryId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}`\n\nGet detailed information about a specific webhook delivery attempt.\n\nReturns:\n- The complete request payload that was sent\n- Request headers including the signature\n- Response status code and body from your endpoint\n- Timing information\n\nUse this to debug why a delivery failed or verify what data was sent.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `webhookId: string`\n\n- `deliveryId: string`\n\n### Returns\n\n- `{ data: { id: string; attempt: number; event: string; request: { headers: object; payload: object; }; response: { statusCode: number; body?: string; }; statusCode: number; success: boolean; timestamp: string; url: string; webhookId: string; webhookName: string; willRetry: boolean; }; meta: { requestId: string; }; success: true; }`\n  Detailed information about a webhook delivery attempt\n\n  - `data: { id: string; attempt: number; event: string; request: { headers: object; payload: object; }; response: { statusCode: number; body?: string; }; statusCode: number; success: boolean; timestamp: string; url: string; webhookId: string; webhookName: string; willRetry: boolean; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.tenants.webhooks.retrieveDelivery('whr_abc123def456', { tenantId: 'cm6abc123def456', webhookId: '123' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'test',
    endpoint: '/tenants/{tenantId}/webhooks/{webhookId}/test',
    httpMethod: 'post',
    summary: 'Test a webhook',
    description:
      'Send a test payload to your webhook endpoint and verify it receives the data correctly.\n\nUse this to:\n- Verify your webhook URL is accessible\n- Test your signature verification code\n- Ensure your server handles the payload format correctly\n\n**Test payload format:**\nThe test payload is identical to real webhook payloads, containing sample data\nfor the specified event type. Your webhook should respond with a 2xx status code.\n',
    stainlessPath: '(resource) tenants.webhooks > (method) test',
    qualified: 'client.tenants.webhooks.test',
    params: ['tenantId: string;', 'webhookId: string;', 'event: string;'],
    response:
      '{ data: { duration: number; event: string; statusCode: number; success: boolean; body?: string; error?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## test\n\n`client.tenants.webhooks.test(tenantId: string, webhookId: string, event: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/webhooks/{webhookId}/test`\n\nSend a test payload to your webhook endpoint and verify it receives the data correctly.\n\nUse this to:\n- Verify your webhook URL is accessible\n- Test your signature verification code\n- Ensure your server handles the payload format correctly\n\n**Test payload format:**\nThe test payload is identical to real webhook payloads, containing sample data\nfor the specified event type. Your webhook should respond with a 2xx status code.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `webhookId: string`\n\n- `event: string`\n  Event type to simulate\n\n### Returns\n\n- `{ data: { duration: number; event: string; statusCode: number; success: boolean; body?: string; error?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { duration: number; event: string; statusCode: number; success: boolean; body?: string; error?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.tenants.webhooks.test('123', { tenantId: 'cm6abc123def456', event: 'MessageSent' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/tenants/{tenantId}/tracking',
    httpMethod: 'post',
    summary: 'Create track domain',
    description:
      'Create a new track domain for open/click tracking for a tenant.\n\nAfter creation, you must configure a CNAME record pointing to\nthe provided DNS value before tracking will work.\n',
    stainlessPath: '(resource) tenants.tracking > (method) create',
    qualified: 'client.tenants.tracking.create',
    params: [
      'tenantId: string;',
      'domainId: number;',
      'name: string;',
      'sslEnabled?: boolean;',
      'trackClicks?: boolean;',
      'trackOpens?: boolean;',
    ],
    response:
      "{ data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: object; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## create\n\n`client.tenants.tracking.create(tenantId: string, domainId: number, name: string, sslEnabled?: boolean, trackClicks?: boolean, trackOpens?: boolean): { data: track_domain; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/tracking`\n\nCreate a new track domain for open/click tracking for a tenant.\n\nAfter creation, you must configure a CNAME record pointing to\nthe provided DNS value before tracking will work.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `domainId: number`\n  ID of the sending domain to attach this track domain to\n\n- `name: string`\n  Subdomain name (e.g., 'track' for track.yourdomain.com)\n\n- `sslEnabled?: boolean`\n  Enable SSL for tracking URLs (accepts null, defaults to true)\n\n- `trackClicks?: boolean`\n  Enable click tracking (accepts null, defaults to true)\n\n- `trackOpens?: boolean`\n  Enable open tracking (tracking pixel, accepts null, defaults to true)\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: object; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: { name?: string; type?: string; value?: string; }; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tracking = await client.tenants.tracking.create('cm6abc123def456', { domainId: 123, name: 'track' });\n\nconsole.log(tracking);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tenants/{tenantId}/tracking/{trackingId}',
    httpMethod: 'get',
    summary: 'Get track domain',
    description: 'Get details of a specific track domain including DNS configuration.',
    stainlessPath: '(resource) tenants.tracking > (method) retrieve',
    qualified: 'client.tenants.tracking.retrieve',
    params: ['tenantId: string;', 'trackingId: string;'],
    response:
      "{ data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: object; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## retrieve\n\n`client.tenants.tracking.retrieve(tenantId: string, trackingId: string): { data: track_domain; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/tracking/{trackingId}`\n\nGet details of a specific track domain including DNS configuration.\n\n### Parameters\n\n- `tenantId: string`\n\n- `trackingId: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: object; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: { name?: string; type?: string; value?: string; }; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tracking = await client.tenants.tracking.retrieve('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(tracking);\n```",
  },
  {
    name: 'update',
    endpoint: '/tenants/{tenantId}/tracking/{trackingId}',
    httpMethod: 'patch',
    summary: 'Update track domain',
    description:
      'Update track domain settings.\n\nUse this to:\n- Enable/disable click tracking\n- Enable/disable open tracking\n- Enable/disable SSL\n- Set excluded click domains\n',
    stainlessPath: '(resource) tenants.tracking > (method) update',
    qualified: 'client.tenants.tracking.update',
    params: [
      'tenantId: string;',
      'trackingId: string;',
      'excludedClickDomains?: string;',
      'sslEnabled?: boolean;',
      'trackClicks?: boolean;',
      'trackOpens?: boolean;',
    ],
    response:
      "{ data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: object; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## update\n\n`client.tenants.tracking.update(tenantId: string, trackingId: string, excludedClickDomains?: string, sslEnabled?: boolean, trackClicks?: boolean, trackOpens?: boolean): { data: track_domain; meta: api_meta; success: true; }`\n\n**patch** `/tenants/{tenantId}/tracking/{trackingId}`\n\nUpdate track domain settings.\n\nUse this to:\n- Enable/disable click tracking\n- Enable/disable open tracking\n- Enable/disable SSL\n- Set excluded click domains\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `trackingId: string`\n\n- `excludedClickDomains?: string`\n  Comma-separated list of domains to exclude from click tracking (accepts null)\n\n- `sslEnabled?: boolean`\n  Enable or disable SSL for tracking URLs (accepts null)\n\n- `trackClicks?: boolean`\n  Enable or disable click tracking (accepts null)\n\n- `trackOpens?: boolean`\n  Enable or disable open tracking (accepts null)\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: object; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: { name?: string; type?: string; value?: string; }; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tracking = await client.tenants.tracking.update('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(tracking);\n```",
  },
  {
    name: 'list',
    endpoint: '/tenants/{tenantId}/tracking',
    httpMethod: 'get',
    summary: 'List track domains',
    description:
      'List all track domains configured for a tenant.\nTrack domains enable open and click tracking for emails.\n',
    stainlessPath: '(resource) tenants.tracking > (method) list',
    qualified: 'client.tenants.tracking.list',
    params: ['tenantId: string;'],
    response: '{ data: { trackDomains: object[]; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## list\n\n`client.tenants.tracking.list(tenantId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/tracking`\n\nList all track domains configured for a tenant.\nTrack domains enable open and click tracking for emails.\n\n\n### Parameters\n\n- `tenantId: string`\n\n### Returns\n\n- `{ data: { trackDomains: object[]; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { trackDomains: { id: string; createdAt: string; dnsOk: boolean; domainId: string; fullName: string; name: string; sslEnabled: boolean; trackClicks: boolean; trackOpens: boolean; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: { name?: string; type?: string; value?: string; }; dnsStatus?: 'ok' | 'missing' | 'invalid'; excludedClickDomains?: string; updatedAt?: string; }[]; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst trackings = await client.tenants.tracking.list('cm6abc123def456');\n\nconsole.log(trackings);\n```",
  },
  {
    name: 'delete',
    endpoint: '/tenants/{tenantId}/tracking/{trackingId}',
    httpMethod: 'delete',
    summary: 'Delete track domain',
    description: 'Delete a track domain. This will disable tracking for any emails using this domain.',
    stainlessPath: '(resource) tenants.tracking > (method) delete',
    qualified: 'client.tenants.tracking.delete',
    params: ['tenantId: string;', 'trackingId: string;'],
    response: '{ data: { message: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## delete\n\n`client.tenants.tracking.delete(tenantId: string, trackingId: string): { data: object; meta: api_meta; success: true; }`\n\n**delete** `/tenants/{tenantId}/tracking/{trackingId}`\n\nDelete a track domain. This will disable tracking for any emails using this domain.\n\n### Parameters\n\n- `tenantId: string`\n\n- `trackingId: string`\n\n### Returns\n\n- `{ data: { message: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { message: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst tracking = await client.tenants.tracking.delete('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(tracking);\n```",
  },
  {
    name: 'verify',
    endpoint: '/tenants/{tenantId}/tracking/{trackingId}/verify',
    httpMethod: 'post',
    summary: 'Verify track domain DNS',
    description:
      'Check DNS configuration for the track domain.\n\nThe track domain requires a CNAME record to be configured before\nopen and click tracking will work. Use this endpoint to verify\nthe DNS is correctly set up.\n',
    stainlessPath: '(resource) tenants.tracking > (method) verify',
    qualified: 'client.tenants.tracking.verify',
    params: ['tenantId: string;', 'trackingId: string;'],
    response:
      "{ data: { id: string; dnsOk: boolean; dnsStatus: 'ok' | 'missing' | 'invalid'; fullName: string; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: { name?: string; type?: string; value?: string; }; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## verify\n\n`client.tenants.tracking.verify(tenantId: string, trackingId: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/tenants/{tenantId}/tracking/{trackingId}/verify`\n\nCheck DNS configuration for the track domain.\n\nThe track domain requires a CNAME record to be configured before\nopen and click tracking will work. Use this endpoint to verify\nthe DNS is correctly set up.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `trackingId: string`\n\n### Returns\n\n- `{ data: { id: string; dnsOk: boolean; dnsStatus: 'ok' | 'missing' | 'invalid'; fullName: string; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: { name?: string; type?: string; value?: string; }; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; dnsOk: boolean; dnsStatus: 'ok' | 'missing' | 'invalid'; fullName: string; dnsCheckedAt?: string; dnsError?: string; dnsRecord?: { name?: string; type?: string; value?: string; }; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.tenants.tracking.verify('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tenants/{tenantId}/usage',
    httpMethod: 'get',
    summary: 'Get usage stats for a tenant',
    description:
      'Returns email sending statistics for a specific tenant over a time period.\n\n**Use cases:**\n- Display usage dashboard to your customers\n- Calculate per-tenant billing\n- Monitor tenant health and delivery rates\n\n**Period formats:**\n- Shortcuts: `today`, `yesterday`, `this_week`, `last_week`, `this_month`, `last_month`, `last_7_days`, `last_30_days`, `last_90_days`\n- Month: `2024-01` (full month)\n- Date range: `2024-01-01..2024-01-31`\n- Single day: `2024-01-15`\n\n**Response includes:**\n- `emails` - Counts for sent, delivered, soft_failed, hard_failed, bounced, held\n- `rates` - Delivery rate and bounce rate as decimals (0.95 = 95%)\n',
    stainlessPath: '(resource) tenants.usage > (method) retrieve',
    qualified: 'client.tenants.usage.retrieve',
    params: ['tenantId: string;', 'period?: string;', 'timezone?: string;'],
    response:
      '{ data: { emails: email_counts; period: usage_period; rates: email_rates; tenant_id: string; tenant_name: string; external_id?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.tenants.usage.retrieve(tenantId: string, period?: string, timezone?: string): { data: tenant_usage; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/usage`\n\nReturns email sending statistics for a specific tenant over a time period.\n\n**Use cases:**\n- Display usage dashboard to your customers\n- Calculate per-tenant billing\n- Monitor tenant health and delivery rates\n\n**Period formats:**\n- Shortcuts: `today`, `yesterday`, `this_week`, `last_week`, `this_month`, `last_month`, `last_7_days`, `last_30_days`, `last_90_days`\n- Month: `2024-01` (full month)\n- Date range: `2024-01-01..2024-01-31`\n- Single day: `2024-01-15`\n\n**Response includes:**\n- `emails` - Counts for sent, delivered, soft_failed, hard_failed, bounced, held\n- `rates` - Delivery rate and bounce rate as decimals (0.95 = 95%)\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `period?: string`\n  Time period for usage data. Defaults to current month.\n\n**Formats:**\n- Shortcuts: `today`, `yesterday`, `this_week`, `last_week`, `this_month`, `last_month`, `last_7_days`, `last_30_days`, `last_90_days`\n- Month: `2024-01`\n- Range: `2024-01-01..2024-01-31`\n- Day: `2024-01-15`\n\n\n- `timezone?: string`\n  Timezone for period calculations (IANA format). Defaults to UTC.\n\n### Returns\n\n- `{ data: { emails: email_counts; period: usage_period; rates: email_rates; tenant_id: string; tenant_name: string; external_id?: string; }; meta: { requestId: string; }; success: true; }`\n  Usage statistics for a single tenant\n\n  - `data: { emails: { bounced: number; delivered: number; hard_failed: number; held: number; sent: number; soft_failed: number; }; period: { end: string; start: string; }; rates: { bounce_rate: number; delivery_rate: number; }; tenant_id: string; tenant_name: string; external_id?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst usage = await client.tenants.usage.retrieve('cm6abc123def456');\n\nconsole.log(usage);\n```",
  },
  {
    name: 'retrieve_timeseries',
    endpoint: '/tenants/{tenantId}/usage/timeseries',
    httpMethod: 'get',
    summary: 'Get usage timeseries for a tenant',
    description:
      'Returns time-bucketed email statistics for a specific tenant.\n\n**Use cases:**\n- Build usage charts and graphs\n- Identify sending patterns\n- Detect anomalies in delivery rates\n\n**Granularity options:**\n- `hour` - Hourly buckets (best for last 7 days)\n- `day` - Daily buckets (best for last 30-90 days)\n- `week` - Weekly buckets (best for last 6 months)\n- `month` - Monthly buckets (best for year-over-year)\n\nThe response includes a data point for each time bucket with all email metrics.\n',
    stainlessPath: '(resource) tenants.usage > (method) retrieve_timeseries',
    qualified: 'client.tenants.usage.retrieveTimeseries',
    params: [
      'tenantId: string;',
      "granularity?: 'hour' | 'day' | 'week' | 'month';",
      'period?: string;',
      'timezone?: string;',
    ],
    response:
      "{ data: { data: object[]; granularity: 'hour' | 'day' | 'week' | 'month'; period: usage_period; tenant_id: string; tenant_name: string; }; meta: { requestId: string; }; success: true; }",
    markdown:
      "## retrieve_timeseries\n\n`client.tenants.usage.retrieveTimeseries(tenantId: string, granularity?: 'hour' | 'day' | 'week' | 'month', period?: string, timezone?: string): { data: tenant_usage_timeseries; meta: api_meta; success: true; }`\n\n**get** `/tenants/{tenantId}/usage/timeseries`\n\nReturns time-bucketed email statistics for a specific tenant.\n\n**Use cases:**\n- Build usage charts and graphs\n- Identify sending patterns\n- Detect anomalies in delivery rates\n\n**Granularity options:**\n- `hour` - Hourly buckets (best for last 7 days)\n- `day` - Daily buckets (best for last 30-90 days)\n- `week` - Weekly buckets (best for last 6 months)\n- `month` - Monthly buckets (best for year-over-year)\n\nThe response includes a data point for each time bucket with all email metrics.\n\n\n### Parameters\n\n- `tenantId: string`\n\n- `granularity?: 'hour' | 'day' | 'week' | 'month'`\n  Time bucket size for data points\n\n- `period?: string`\n  Time period for timeseries data. Defaults to current month.\n\n- `timezone?: string`\n  Timezone for period calculations (IANA format). Defaults to UTC.\n\n### Returns\n\n- `{ data: { data: object[]; granularity: 'hour' | 'day' | 'week' | 'month'; period: usage_period; tenant_id: string; tenant_name: string; }; meta: { requestId: string; }; success: true; }`\n  Timeseries usage data for a tenant\n\n  - `data: { data: { bounced: number; delivered: number; hard_failed: number; held: number; sent: number; soft_failed: number; timestamp: string; }[]; granularity: 'hour' | 'day' | 'week' | 'month'; period: { end: string; start: string; }; tenant_id: string; tenant_name: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.tenants.usage.retrieveTimeseries('cm6abc123def456');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/platform/webhooks',
    httpMethod: 'post',
    summary: 'Create a platform webhook',
    description:
      'Create a platform webhook to receive email event notifications from all tenants.\n\nPlatform webhooks receive events from **all tenants** in your organization.\nEach webhook payload includes a `tenant_id` field to identify which tenant\nthe event belongs to.\n\n**Available events:**\n- `MessageSent` - Email accepted by recipient server\n- `MessageDeliveryFailed` - Delivery permanently failed\n- `MessageDelayed` - Delivery temporarily failed, will retry\n- `MessageBounced` - Email bounced\n- `MessageHeld` - Email held for review\n- `MessageLinkClicked` - Recipient clicked a link\n- `MessageLoaded` - Recipient opened the email\n- `DomainDNSError` - Domain DNS issue detected\n\n**Webhook payload includes:**\n- `event` - The event type\n- `tenant_id` - The tenant that sent the email\n- `timestamp` - Unix timestamp of the event\n- `payload` - Event-specific data (message details, status, etc.)\n',
    stainlessPath: '(resource) platform.webhooks > (method) create',
    qualified: 'client.platform.webhooks.create',
    params: ['name: string;', 'url: string;', 'events?: string[];'],
    response:
      '{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## create\n\n`client.platform.webhooks.create(name: string, url: string, events?: string[]): { data: object; meta: api_meta; success: true; }`\n\n**post** `/platform/webhooks`\n\nCreate a platform webhook to receive email event notifications from all tenants.\n\nPlatform webhooks receive events from **all tenants** in your organization.\nEach webhook payload includes a `tenant_id` field to identify which tenant\nthe event belongs to.\n\n**Available events:**\n- `MessageSent` - Email accepted by recipient server\n- `MessageDeliveryFailed` - Delivery permanently failed\n- `MessageDelayed` - Delivery temporarily failed, will retry\n- `MessageBounced` - Email bounced\n- `MessageHeld` - Email held for review\n- `MessageLinkClicked` - Recipient clicked a link\n- `MessageLoaded` - Recipient opened the email\n- `DomainDNSError` - Domain DNS issue detected\n\n**Webhook payload includes:**\n- `event` - The event type\n- `tenant_id` - The tenant that sent the email\n- `timestamp` - Unix timestamp of the event\n- `payload` - Event-specific data (message details, status, etc.)\n\n\n### Parameters\n\n- `name: string`\n  Display name for the webhook\n\n- `url: string`\n  Webhook endpoint URL (must be HTTPS)\n\n- `events?: string[]`\n  Events to subscribe to. Empty array means all events.\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.platform.webhooks.create({ name: 'Central Event Processor', url: 'https://myplatform.com/webhooks/email-events' });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/platform/webhooks/{webhookId}',
    httpMethod: 'get',
    summary: 'Get platform webhook details',
    description: 'Get detailed information about a specific platform webhook.',
    stainlessPath: '(resource) platform.webhooks > (method) retrieve',
    qualified: 'client.platform.webhooks.retrieve',
    params: ['webhookId: string;'],
    response:
      '{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve\n\n`client.platform.webhooks.retrieve(webhookId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/platform/webhooks/{webhookId}`\n\nGet detailed information about a specific platform webhook.\n\n### Parameters\n\n- `webhookId: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.platform.webhooks.retrieve('pwh_abc123def456');\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'update',
    endpoint: '/platform/webhooks/{webhookId}',
    httpMethod: 'patch',
    summary: 'Update a platform webhook',
    description:
      "Update a platform webhook's configuration.\n\nYou can update:\n- `name` - Display name for the webhook\n- `url` - The endpoint URL (must be HTTPS)\n- `events` - Array of event types to receive (empty array = all events)\n- `enabled` - Enable or disable the webhook\n",
    stainlessPath: '(resource) platform.webhooks > (method) update',
    qualified: 'client.platform.webhooks.update',
    params: [
      'webhookId: string;',
      'enabled?: boolean;',
      'events?: string[];',
      'name?: string;',
      'url?: string;',
    ],
    response:
      '{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## update\n\n`client.platform.webhooks.update(webhookId: string, enabled?: boolean, events?: string[], name?: string, url?: string): { data: object; meta: api_meta; success: true; }`\n\n**patch** `/platform/webhooks/{webhookId}`\n\nUpdate a platform webhook's configuration.\n\nYou can update:\n- `name` - Display name for the webhook\n- `url` - The endpoint URL (must be HTTPS)\n- `events` - Array of event types to receive (empty array = all events)\n- `enabled` - Enable or disable the webhook\n\n\n### Parameters\n\n- `webhookId: string`\n\n- `enabled?: boolean`\n  Enable or disable the webhook\n\n- `events?: string[]`\n  Events to subscribe to. Empty array means all events.\n\n- `name?: string`\n  Display name for the webhook\n\n- `url?: string`\n  Webhook endpoint URL (must be HTTPS)\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; updatedAt: string; url: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.platform.webhooks.update('pwh_abc123def456');\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/platform/webhooks',
    httpMethod: 'get',
    summary: 'List platform webhooks',
    description:
      'Get all platform webhook endpoints configured for your organization.\n\nPlatform webhooks receive events from **all tenants** in your organization,\nunlike tenant webhooks which only receive events for a specific tenant.\nThis is useful for centralized event processing and monitoring.\n',
    stainlessPath: '(resource) platform.webhooks > (method) list',
    qualified: 'client.platform.webhooks.list',
    response:
      '{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; }[]; meta: { requestId: string; }; success: true; }',
    markdown:
      "## list\n\n`client.platform.webhooks.list(): { data: object[]; meta: api_meta; success: true; }`\n\n**get** `/platform/webhooks`\n\nGet all platform webhook endpoints configured for your organization.\n\nPlatform webhooks receive events from **all tenants** in your organization,\nunlike tenant webhooks which only receive events for a specific tenant.\nThis is useful for centralized event processing and monitoring.\n\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; }[]; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; createdAt: string; enabled: boolean; events: string[]; name: string; url: string; }[]`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhooks = await client.platform.webhooks.list();\n\nconsole.log(webhooks);\n```",
  },
  {
    name: 'delete',
    endpoint: '/platform/webhooks/{webhookId}',
    httpMethod: 'delete',
    summary: 'Delete a platform webhook',
    description:
      'Delete a platform webhook. This stops all event delivery to the webhook URL.\nThis action cannot be undone.\n',
    stainlessPath: '(resource) platform.webhooks > (method) delete',
    qualified: 'client.platform.webhooks.delete',
    params: ['webhookId: string;'],
    response: '{ data: { message: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## delete\n\n`client.platform.webhooks.delete(webhookId: string): { data: object; meta: api_meta; success: true; }`\n\n**delete** `/platform/webhooks/{webhookId}`\n\nDelete a platform webhook. This stops all event delivery to the webhook URL.\nThis action cannot be undone.\n\n\n### Parameters\n\n- `webhookId: string`\n\n### Returns\n\n- `{ data: { message: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { message: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst webhook = await client.platform.webhooks.delete('pwh_abc123def456');\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list_deliveries',
    endpoint: '/platform/webhooks/deliveries',
    httpMethod: 'get',
    summary: 'List platform webhook deliveries',
    description:
      'Get a paginated list of platform webhook delivery attempts.\n\nFilter by:\n- `webhookId` - Specific webhook\n- `tenantId` - Specific tenant\n- `event` - Specific event type\n- `success` - Successful (2xx) or failed deliveries\n- `before`/`after` - Time range (Unix timestamps)\n\nDeliveries are returned in reverse chronological order.\n',
    stainlessPath: '(resource) platform.webhooks > (method) list_deliveries',
    qualified: 'client.platform.webhooks.listDeliveries',
    params: [
      'after?: number;',
      'before?: number;',
      'event?: string;',
      'page?: number;',
      'perPage?: number;',
      'success?: boolean;',
      'tenantId?: string;',
      'webhookId?: string;',
    ],
    response:
      '{ id: string; attempt: number; event: string; statusCode: number; success: boolean; tenantId: string; timestamp: string; url: string; webhookId: string; willRetry: boolean; }',
    markdown:
      "## list_deliveries\n\n`client.platform.webhooks.listDeliveries(after?: number, before?: number, event?: string, page?: number, perPage?: number, success?: boolean, tenantId?: string, webhookId?: string): { id: string; attempt: number; event: string; statusCode: number; success: boolean; tenantId: string; timestamp: string; url: string; webhookId: string; willRetry: boolean; }`\n\n**get** `/platform/webhooks/deliveries`\n\nGet a paginated list of platform webhook delivery attempts.\n\nFilter by:\n- `webhookId` - Specific webhook\n- `tenantId` - Specific tenant\n- `event` - Specific event type\n- `success` - Successful (2xx) or failed deliveries\n- `before`/`after` - Time range (Unix timestamps)\n\nDeliveries are returned in reverse chronological order.\n\n\n### Parameters\n\n- `after?: number`\n  Only deliveries after this Unix timestamp\n\n- `before?: number`\n  Only deliveries before this Unix timestamp\n\n- `event?: string`\n  Filter by event type\n\n- `page?: number`\n  Page number (default 1)\n\n- `perPage?: number`\n  Items per page (default 30, max 100)\n\n- `success?: boolean`\n  Filter by delivery success\n\n- `tenantId?: string`\n  Filter by tenant ID\n\n- `webhookId?: string`\n  Filter by platform webhook ID\n\n### Returns\n\n- `{ id: string; attempt: number; event: string; statusCode: number; success: boolean; tenantId: string; timestamp: string; url: string; webhookId: string; willRetry: boolean; }`\n  Summary of a platform webhook delivery attempt\n\n  - `id: string`\n  - `attempt: number`\n  - `event: string`\n  - `statusCode: number`\n  - `success: boolean`\n  - `tenantId: string`\n  - `timestamp: string`\n  - `url: string`\n  - `webhookId: string`\n  - `willRetry: boolean`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\n// Automatically fetches more pages as needed.\nfor await (const webhookListDeliveriesResponse of client.platform.webhooks.listDeliveries()) {\n  console.log(webhookListDeliveriesResponse);\n}\n```",
  },
  {
    name: 'replay_delivery',
    endpoint: '/platform/webhooks/deliveries/{deliveryId}/replay',
    httpMethod: 'post',
    summary: 'Replay a platform webhook delivery',
    description:
      'Replay a previous platform webhook delivery.\n\nThis re-sends the original payload with a new timestamp and delivery ID.\nUseful for recovering from temporary endpoint failures.\n',
    stainlessPath: '(resource) platform.webhooks > (method) replay_delivery',
    qualified: 'client.platform.webhooks.replayDelivery',
    params: ['deliveryId: string;'],
    response:
      '{ data: { duration: number; newDeliveryId: string; originalDeliveryId: string; statusCode: number; success: boolean; timestamp: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## replay_delivery\n\n`client.platform.webhooks.replayDelivery(deliveryId: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/platform/webhooks/deliveries/{deliveryId}/replay`\n\nReplay a previous platform webhook delivery.\n\nThis re-sends the original payload with a new timestamp and delivery ID.\nUseful for recovering from temporary endpoint failures.\n\n\n### Parameters\n\n- `deliveryId: string`\n\n### Returns\n\n- `{ data: { duration: number; newDeliveryId: string; originalDeliveryId: string; statusCode: number; success: boolean; timestamp: string; }; meta: { requestId: string; }; success: true; }`\n  Result of replaying a platform webhook delivery\n\n  - `data: { duration: number; newDeliveryId: string; originalDeliveryId: string; statusCode: number; success: boolean; timestamp: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.platform.webhooks.replayDelivery('pwd_abc123def456');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_delivery',
    endpoint: '/platform/webhooks/deliveries/{deliveryId}',
    httpMethod: 'get',
    summary: 'Get platform webhook delivery details',
    description:
      'Get detailed information about a specific platform webhook delivery.\n\nReturns the complete request payload, headers, response, and timing info.\n',
    stainlessPath: '(resource) platform.webhooks > (method) retrieve_delivery',
    qualified: 'client.platform.webhooks.retrieveDelivery',
    params: ['deliveryId: string;'],
    response:
      '{ data: { id: string; attempt: number; event: string; request: { headers?: object; payload?: object; }; response: { body?: string; duration?: number; }; statusCode: number; success: boolean; tenantId: string; timestamp: string; url: string; webhookId: string; webhookName: string; willRetry: boolean; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## retrieve_delivery\n\n`client.platform.webhooks.retrieveDelivery(deliveryId: string): { data: object; meta: api_meta; success: true; }`\n\n**get** `/platform/webhooks/deliveries/{deliveryId}`\n\nGet detailed information about a specific platform webhook delivery.\n\nReturns the complete request payload, headers, response, and timing info.\n\n\n### Parameters\n\n- `deliveryId: string`\n\n### Returns\n\n- `{ data: { id: string; attempt: number; event: string; request: { headers?: object; payload?: object; }; response: { body?: string; duration?: number; }; statusCode: number; success: boolean; tenantId: string; timestamp: string; url: string; webhookId: string; webhookName: string; willRetry: boolean; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { id: string; attempt: number; event: string; request: { headers?: object; payload?: object; }; response: { body?: string; duration?: number; }; statusCode: number; success: boolean; tenantId: string; timestamp: string; url: string; webhookId: string; webhookName: string; willRetry: boolean; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.platform.webhooks.retrieveDelivery('pwd_abc123def456');\n\nconsole.log(response);\n```",
  },
  {
    name: 'test',
    endpoint: '/platform/webhooks/{webhookId}/test',
    httpMethod: 'post',
    summary: 'Test a platform webhook',
    description:
      'Send a test payload to your platform webhook endpoint.\n\nUse this to:\n- Verify your webhook URL is accessible\n- Test your payload handling code\n- Ensure your server responds correctly\n\nThe test payload is marked with `_test: true` so you can distinguish\ntest events from real events.\n',
    stainlessPath: '(resource) platform.webhooks > (method) test',
    qualified: 'client.platform.webhooks.test',
    params: ['webhookId: string;', 'event: string;'],
    response:
      '{ data: { durationMs: number; statusCode: number; success: boolean; error?: string; }; meta: { requestId: string; }; success: true; }',
    markdown:
      "## test\n\n`client.platform.webhooks.test(webhookId: string, event: string): { data: object; meta: api_meta; success: true; }`\n\n**post** `/platform/webhooks/{webhookId}/test`\n\nSend a test payload to your platform webhook endpoint.\n\nUse this to:\n- Verify your webhook URL is accessible\n- Test your payload handling code\n- Ensure your server responds correctly\n\nThe test payload is marked with `_test: true` so you can distinguish\ntest events from real events.\n\n\n### Parameters\n\n- `webhookId: string`\n\n- `event: string`\n  Event type to simulate\n\n### Returns\n\n- `{ data: { durationMs: number; statusCode: number; success: boolean; error?: string; }; meta: { requestId: string; }; success: true; }`\n\n  - `data: { durationMs: number; statusCode: number; success: boolean; error?: string; }`\n  - `meta: { requestId: string; }`\n  - `success: true`\n\n### Example\n\n```typescript\nimport Ark from 'ark-email';\n\nconst client = new Ark();\n\nconst response = await client.platform.webhooks.test('pwh_abc123def456', { event: 'MessageSent' });\n\nconsole.log(response);\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
