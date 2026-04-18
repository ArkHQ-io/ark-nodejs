// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

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
  perLanguage?: Record<string, PerLanguageData>;
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
    perLanguage: {
      go: {
        method: 'client.Emails.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.Send(context.TODO(), ark.EmailSendParams{\n\t\tFrom:    "Acme <hello@acme.com>",\n\t\tSubject: "Hello World",\n\t\tTo:      []string{"user@example.com"},\n\t\tHTML:    ark.String("<h1>Welcome!</h1><p>Thanks for signing up.</p>"),\n\t\tMetadata: map[string]string{\n\t\t\t"user_id":  "usr_123",\n\t\t\t"campaign": "onboarding",\n\t\t},\n\t\tTenantID: ark.String("cm6abc123def456"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/emails \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "from": "Acme <hello@acme.com>",\n          "subject": "Hello World",\n          "to": [\n            "user@example.com"\n          ],\n          "metadata": {\n            "user_id": "usr_123",\n            "campaign": "onboarding"\n          },\n          "tenantId": "cm6abc123def456"\n        }\'',
      },
      python: {
        method: 'emails.send',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.emails.send(\n    from_="Acme <hello@acme.com>",\n    subject="Hello World",\n    to=["user@example.com"],\n    html="<h1>Welcome!</h1><p>Thanks for signing up.</p>",\n    metadata={\n        "user_id": "usr_123",\n        "campaign": "onboarding",\n    },\n    tenant_id="cm6abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'emails.send_',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.emails.send_(from: "Acme <hello@acme.com>", subject: "Hello World", to: ["user@example.com"])\n\nputs(response)',
      },
      typescript: {
        method: 'client.emails.send',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.send({\n  from: 'Acme <hello@acme.com>',\n  subject: 'Hello World',\n  to: ['user@example.com'],\n  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',\n  metadata: { user_id: 'usr_123', campaign: 'onboarding' },\n  tenantId: 'cm6abc123def456',\n});\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Emails.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Emails.List(context.TODO(), ark.EmailListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.arkhq.io/v1/emails \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'emails.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\npage = client.emails.list()\npage = page.data[0]\nprint(page.id)',
      },
      ruby: {
        method: 'emails.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\npage = ark.emails.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.emails.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const emailListResponse of client.emails.list()) {\n  console.log(emailListResponse.id);\n}",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Emails.SendBatch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.SendBatch(context.TODO(), ark.EmailSendBatchParams{\n\t\tEmails: []ark.EmailSendBatchParamsEmail{{\n\t\t\tTo:      []string{"alice@example.com"},\n\t\t\tSubject: "Hello Alice",\n\t\t\tHTML:    ark.String("<p>Hi Alice, your order is ready!</p>"),\n\t\t\tTag:     ark.String("order-ready"),\n\t\t}, {\n\t\t\tTo:      []string{"bob@example.com"},\n\t\t\tSubject: "Hello Bob",\n\t\t\tHTML:    ark.String("<p>Hi Bob, your order is ready!</p>"),\n\t\t\tTag:     ark.String("order-ready"),\n\t\t}},\n\t\tFrom:     "notifications@myapp.com",\n\t\tTenantID: ark.String("cm6abc123def456"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/emails/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "emails": [\n            {\n              "subject": "Hello Alice",\n              "to": [\n                "alice@example.com"\n              ],\n              "html": "<p>Hi Alice, your order is ready!</p>",\n              "tag": "order-ready"\n            },\n            {\n              "subject": "Hello Bob",\n              "to": [\n                "bob@example.com"\n              ],\n              "html": "<p>Hi Bob, your order is ready!</p>",\n              "tag": "order-ready"\n            }\n          ],\n          "from": "notifications@myapp.com",\n          "tenantId": "cm6abc123def456"\n        }\'',
      },
      python: {
        method: 'emails.send_batch',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.emails.send_batch(\n    emails=[{\n        "to": ["alice@example.com"],\n        "subject": "Hello Alice",\n        "html": "<p>Hi Alice, your order is ready!</p>",\n        "tag": "order-ready",\n    }, {\n        "to": ["bob@example.com"],\n        "subject": "Hello Bob",\n        "html": "<p>Hi Bob, your order is ready!</p>",\n        "tag": "order-ready",\n    }],\n    from_="notifications@myapp.com",\n    tenant_id="cm6abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'emails.send_batch',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.emails.send_batch(\n  emails: [{subject: "Hello Alice", to: ["alice@example.com"]}, {subject: "Hello Bob", to: ["bob@example.com"]}],\n  from: "notifications@myapp.com"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.emails.sendBatch',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.sendBatch({\n  emails: [\n    {\n      to: ['alice@example.com'],\n      subject: 'Hello Alice',\n      html: '<p>Hi Alice, your order is ready!</p>',\n      tag: 'order-ready',\n    },\n    {\n      to: ['bob@example.com'],\n      subject: 'Hello Bob',\n      html: '<p>Hi Bob, your order is ready!</p>',\n      tag: 'order-ready',\n    },\n  ],\n  from: 'notifications@myapp.com',\n  tenantId: 'cm6abc123def456',\n});\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Emails.SendRaw',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.SendRaw(context.TODO(), ark.EmailSendRawParams{\n\t\tFrom:       "Acme <hello@acme.com>",\n\t\tRawMessage: "x",\n\t\tTo:         []string{"user@example.com"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/emails/raw \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "from": "Acme <hello@acme.com>",\n          "rawMessage": "x",\n          "to": [\n            "user@example.com"\n          ],\n          "tenantId": "cm6abc123def456"\n        }\'',
      },
      python: {
        method: 'emails.send_raw',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.emails.send_raw(\n    from_="Acme <hello@acme.com>",\n    raw_message="x",\n    to=["user@example.com"],\n)\nprint(response.data)',
      },
      ruby: {
        method: 'emails.send_raw',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.emails.send_raw(from: "Acme <hello@acme.com>", raw_message: "x", to: ["user@example.com"])\n\nputs(response)',
      },
      typescript: {
        method: 'client.emails.sendRaw',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.sendRaw({\n  from: 'Acme <hello@acme.com>',\n  rawMessage: 'x',\n  to: ['user@example.com'],\n});\n\nconsole.log(response.data);",
      },
    },
  },
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
    perLanguage: {
      go: {
        method: 'client.Emails.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\temail, err := client.Emails.Get(\n\t\tcontext.TODO(),\n\t\t"aBc123XyZ",\n\t\tark.EmailGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", email.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/emails/$EMAIL_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'emails.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nemail = client.emails.retrieve(\n    email_id="aBc123XyZ",\n)\nprint(email.data)',
      },
      ruby: {
        method: 'emails.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nemail = ark.emails.retrieve("aBc123XyZ")\n\nputs(email)',
      },
      typescript: {
        method: 'client.emails.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst email = await client.emails.retrieve('aBc123XyZ');\n\nconsole.log(email.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Emails.Retry',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.Retry(context.TODO(), "aBc123XyZ")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/emails/$EMAIL_ID/retry \\\n    -X POST \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'emails.retry',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.emails.retry(\n    "aBc123XyZ",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'emails.retry_',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.emails.retry_("aBc123XyZ")\n\nputs(response)',
      },
      typescript: {
        method: 'client.emails.retry',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.retry('aBc123XyZ');\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Emails.GetDeliveries',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.GetDeliveries(context.TODO(), "aBc123XyZ")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/emails/$EMAIL_ID/deliveries \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'emails.retrieve_deliveries',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.emails.retrieve_deliveries(\n    "aBc123XyZ",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'emails.retrieve_deliveries',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.emails.retrieve_deliveries("aBc123XyZ")\n\nputs(response)',
      },
      typescript: {
        method: 'client.emails.retrieveDeliveries',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.retrieveDeliveries('aBc123XyZ');\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Logs.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Logs.List(context.TODO(), ark.LogListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.arkhq.io/v1/logs \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'logs.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\npage = client.logs.list()\npage = page.data[0]\nprint(page.context)',
      },
      ruby: {
        method: 'logs.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\npage = ark.logs.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.logs.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const logEntry of client.logs.list()) {\n  console.log(logEntry.context);\n}",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Logs.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tlog, err := client.Logs.Get(context.TODO(), "req_V8GGcdWYzgeWIHiI")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", log.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/logs/$REQUEST_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'logs.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nlog = client.logs.retrieve(\n    "req_V8GGcdWYzgeWIHiI",\n)\nprint(log.data)',
      },
      ruby: {
        method: 'logs.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nlog = ark.logs.retrieve("req_V8GGcdWYzgeWIHiI")\n\nputs(log)',
      },
      typescript: {
        method: 'client.logs.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst log = await client.logs.retrieve('req_V8GGcdWYzgeWIHiI');\n\nconsole.log(log.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Usage.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torgUsageSummary, err := client.Usage.Get(context.TODO(), ark.UsageGetParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orgUsageSummary.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.arkhq.io/v1/usage \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'usage.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\norg_usage_summary = client.usage.retrieve()\nprint(org_usage_summary.data)',
      },
      ruby: {
        method: 'usage.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\norg_usage_summary = ark.usage.retrieve\n\nputs(org_usage_summary)',
      },
      typescript: {
        method: 'client.usage.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst orgUsageSummary = await client.usage.retrieve();\n\nconsole.log(orgUsageSummary.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Usage.ListTenants',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Usage.ListTenants(context.TODO(), ark.UsageListTenantsParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.arkhq.io/v1/usage/tenants \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'usage.list_tenants',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\npage = client.usage.list_tenants()\npage = page.data[0]\nprint(page.emails)',
      },
      ruby: {
        method: 'usage.list_tenants',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\npage = ark.usage.list_tenants\n\nputs(page)',
      },
      typescript: {
        method: 'client.usage.listTenants',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const tenantUsageItem of client.usage.listTenants()) {\n  console.log(tenantUsageItem.emails);\n}",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Usage.Export',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Usage.Export(context.TODO(), ark.UsageExportParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example: 'curl https://api.arkhq.io/v1/usage/export \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'usage.export',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.usage.export()\nprint(response)',
      },
      ruby: {
        method: 'usage.export',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.usage.export\n\nputs(response)',
      },
      typescript: {
        method: 'client.usage.export',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.usage.export();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Limits.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tlimit, err := client.Limits.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", limit.Data)\n}\n',
      },
      http: {
        example: 'curl https://api.arkhq.io/v1/limits \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'limits.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nlimit = client.limits.retrieve()\nprint(limit.data)',
      },
      ruby: {
        method: 'limits.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nlimit = ark.limits.retrieve\n\nputs(limit)',
      },
      typescript: {
        method: 'client.limits.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst limit = await client.limits.retrieve();\n\nconsole.log(limit.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttenant, err := client.Tenants.New(context.TODO(), ark.TenantNewParams{\n\t\tName: "Acme Corp",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tenant.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "name": "Acme Corp",\n          "metadata": {\n            "plan": "pro",\n            "internalId": "cust_12345",\n            "region": "us-west"\n          }\n        }\'',
      },
      python: {
        method: 'tenants.create',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntenant = client.tenants.create(\n    name="Acme Corp",\n)\nprint(tenant.data)',
      },
      ruby: {
        method: 'tenants.create',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntenant = ark.tenants.create(name: "Acme Corp")\n\nputs(tenant)',
      },
      typescript: {
        method: 'client.tenants.create',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tenant = await client.tenants.create({ name: 'Acme Corp' });\n\nconsole.log(tenant.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Tenants.List(context.TODO(), ark.TenantListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.arkhq.io/v1/tenants \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\npage = client.tenants.list()\npage = page.data[0]\nprint(page.id)',
      },
      ruby: {
        method: 'tenants.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\npage = ark.tenants.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.tenants.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const tenant of client.tenants.list()) {\n  console.log(tenant.id);\n}",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttenant, err := client.Tenants.Get(context.TODO(), "cm6abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tenant.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntenant = client.tenants.retrieve(\n    "cm6abc123def456",\n)\nprint(tenant.data)',
      },
      ruby: {
        method: 'tenants.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntenant = ark.tenants.retrieve("cm6abc123def456")\n\nputs(tenant)',
      },
      typescript: {
        method: 'client.tenants.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tenant = await client.tenants.retrieve('cm6abc123def456');\n\nconsole.log(tenant.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttenant, err := client.Tenants.Update(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantUpdateParams{\n\t\t\tName: ark.String("Acme Corporation"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tenant.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "plan": "pro",\n            "internalId": "cust_12345",\n            "region": "us-west"\n          },\n          "name": "Acme Corporation",\n          "status": "active"\n        }\'',
      },
      python: {
        method: 'tenants.update',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntenant = client.tenants.update(\n    tenant_id="cm6abc123def456",\n    name="Acme Corporation",\n)\nprint(tenant.data)',
      },
      ruby: {
        method: 'tenants.update',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntenant = ark.tenants.update("cm6abc123def456")\n\nputs(tenant)',
      },
      typescript: {
        method: 'client.tenants.update',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tenant = await client.tenants.update('cm6abc123def456', { name: 'Acme Corporation' });\n\nconsole.log(tenant.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttenant, err := client.Tenants.Delete(context.TODO(), "cm6abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tenant.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.delete',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntenant = client.tenants.delete(\n    "cm6abc123def456",\n)\nprint(tenant.data)',
      },
      ruby: {
        method: 'tenants.delete',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntenant = ark.tenants.delete("cm6abc123def456")\n\nputs(tenant)',
      },
      typescript: {
        method: 'client.tenants.delete',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tenant = await client.tenants.delete('cm6abc123def456');\n\nconsole.log(tenant.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Credentials.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Tenants.Credentials.List(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantCredentialListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/credentials \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.credentials.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\npage = client.tenants.credentials.list(\n    tenant_id="cm6abc123def456",\n)\npage = page.data[0]\nprint(page.id)',
      },
      ruby: {
        method: 'tenants.credentials.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\npage = ark.tenants.credentials.list("cm6abc123def456")\n\nputs(page)',
      },
      typescript: {
        method: 'client.tenants.credentials.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const credentialListResponse of client.tenants.credentials.list('cm6abc123def456')) {\n  console.log(credentialListResponse.id);\n}",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Credentials.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcredential, err := client.Tenants.Credentials.New(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantCredentialNewParams{\n\t\t\tName: "production-smtp",\n\t\t\tType: ark.TenantCredentialNewParamsTypeSmtp,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", credential.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/credentials \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "name": "production-smtp",\n          "type": "smtp"\n        }\'',
      },
      python: {
        method: 'tenants.credentials.create',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ncredential = client.tenants.credentials.create(\n    tenant_id="cm6abc123def456",\n    name="production-smtp",\n    type="smtp",\n)\nprint(credential.data)',
      },
      ruby: {
        method: 'tenants.credentials.create',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ncredential = ark.tenants.credentials.create("cm6abc123def456", name: "production-smtp", type: :smtp)\n\nputs(credential)',
      },
      typescript: {
        method: 'client.tenants.credentials.create',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst credential = await client.tenants.credentials.create('cm6abc123def456', {\n  name: 'production-smtp',\n  type: 'smtp',\n});\n\nconsole.log(credential.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Credentials.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcredential, err := client.Tenants.Credentials.Get(\n\t\tcontext.TODO(),\n\t\t123,\n\t\tark.TenantCredentialGetParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", credential.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/credentials/$CREDENTIAL_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.credentials.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ncredential = client.tenants.credentials.retrieve(\n    credential_id=123,\n    tenant_id="cm6abc123def456",\n)\nprint(credential.data)',
      },
      ruby: {
        method: 'tenants.credentials.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ncredential = ark.tenants.credentials.retrieve(123, tenant_id: "cm6abc123def456")\n\nputs(credential)',
      },
      typescript: {
        method: 'client.tenants.credentials.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst credential = await client.tenants.credentials.retrieve(123, { tenantId: 'cm6abc123def456' });\n\nconsole.log(credential.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Credentials.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcredential, err := client.Tenants.Credentials.Update(\n\t\tcontext.TODO(),\n\t\t123,\n\t\tark.TenantCredentialUpdateParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t\tName:     ark.String("production-smtp-v2"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", credential.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/credentials/$CREDENTIAL_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "hold": true,\n          "name": "production-smtp-v2"\n        }\'',
      },
      python: {
        method: 'tenants.credentials.update',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ncredential = client.tenants.credentials.update(\n    credential_id=123,\n    tenant_id="cm6abc123def456",\n    name="production-smtp-v2",\n)\nprint(credential.data)',
      },
      ruby: {
        method: 'tenants.credentials.update',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ncredential = ark.tenants.credentials.update(123, tenant_id: "cm6abc123def456")\n\nputs(credential)',
      },
      typescript: {
        method: 'client.tenants.credentials.update',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst credential = await client.tenants.credentials.update(123, {\n  tenantId: 'cm6abc123def456',\n  name: 'production-smtp-v2',\n});\n\nconsole.log(credential.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Credentials.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcredential, err := client.Tenants.Credentials.Delete(\n\t\tcontext.TODO(),\n\t\t123,\n\t\tark.TenantCredentialDeleteParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", credential.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/credentials/$CREDENTIAL_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.credentials.delete',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ncredential = client.tenants.credentials.delete(\n    credential_id=123,\n    tenant_id="cm6abc123def456",\n)\nprint(credential.data)',
      },
      ruby: {
        method: 'tenants.credentials.delete',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ncredential = ark.tenants.credentials.delete(123, tenant_id: "cm6abc123def456")\n\nputs(credential)',
      },
      typescript: {
        method: 'client.tenants.credentials.delete',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst credential = await client.tenants.credentials.delete(123, { tenantId: 'cm6abc123def456' });\n\nconsole.log(credential.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Domains.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomain, err := client.Tenants.Domains.New(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantDomainNewParams{\n\t\t\tName: "notifications.myapp.com",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domain.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/domains \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "name": "notifications.myapp.com"\n        }\'',
      },
      python: {
        method: 'tenants.domains.create',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ndomain = client.tenants.domains.create(\n    tenant_id="cm6abc123def456",\n    name="notifications.myapp.com",\n)\nprint(domain.data)',
      },
      ruby: {
        method: 'tenants.domains.create',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ndomain = ark.tenants.domains.create("cm6abc123def456", name: "notifications.myapp.com")\n\nputs(domain)',
      },
      typescript: {
        method: 'client.tenants.domains.create',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.tenants.domains.create('cm6abc123def456', {\n  name: 'notifications.myapp.com',\n});\n\nconsole.log(domain.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Domains.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomains, err := client.Tenants.Domains.List(context.TODO(), "cm6abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domains.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/domains \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.domains.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ndomains = client.tenants.domains.list(\n    "cm6abc123def456",\n)\nprint(domains.data)',
      },
      ruby: {
        method: 'tenants.domains.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ndomains = ark.tenants.domains.list("cm6abc123def456")\n\nputs(domains)',
      },
      typescript: {
        method: 'client.tenants.domains.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst domains = await client.tenants.domains.list('cm6abc123def456');\n\nconsole.log(domains.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Domains.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomain, err := client.Tenants.Domains.Get(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantDomainGetParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domain.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/domains/$DOMAIN_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.domains.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ndomain = client.tenants.domains.retrieve(\n    domain_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(domain.data)',
      },
      ruby: {
        method: 'tenants.domains.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ndomain = ark.tenants.domains.retrieve("123", tenant_id: "cm6abc123def456")\n\nputs(domain)',
      },
      typescript: {
        method: 'client.tenants.domains.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.tenants.domains.retrieve('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(domain.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Domains.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomain, err := client.Tenants.Domains.Delete(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantDomainDeleteParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domain.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/domains/$DOMAIN_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.domains.delete',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ndomain = client.tenants.domains.delete(\n    domain_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(domain.data)',
      },
      ruby: {
        method: 'tenants.domains.delete',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ndomain = ark.tenants.domains.delete("123", tenant_id: "cm6abc123def456")\n\nputs(domain)',
      },
      typescript: {
        method: 'client.tenants.domains.delete',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.tenants.domains.delete('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(domain.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Domains.Verify',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tenants.Domains.Verify(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantDomainVerifyParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/domains/$DOMAIN_ID/verify \\\n    -X POST \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.domains.verify',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tenants.domains.verify(\n    domain_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'tenants.domains.verify',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.tenants.domains.verify("123", tenant_id: "cm6abc123def456")\n\nputs(response)',
      },
      typescript: {
        method: 'client.tenants.domains.verify',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tenants.domains.verify('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Suppressions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsuppression, err := client.Tenants.Suppressions.New(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantSuppressionNewParams{\n\t\t\tAddress: "user@example.com",\n\t\t\tReason:  ark.String("user requested removal"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", suppression.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/suppressions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "address": "user@example.com",\n          "reason": "user requested removal"\n        }\'',
      },
      python: {
        method: 'tenants.suppressions.create',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nsuppression = client.tenants.suppressions.create(\n    tenant_id="cm6abc123def456",\n    address="user@example.com",\n    reason="user requested removal",\n)\nprint(suppression.data)',
      },
      ruby: {
        method: 'tenants.suppressions.create',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nsuppression = ark.tenants.suppressions.create("cm6abc123def456", address: "user@example.com")\n\nputs(suppression)',
      },
      typescript: {
        method: 'client.tenants.suppressions.create',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst suppression = await client.tenants.suppressions.create('cm6abc123def456', {\n  address: 'user@example.com',\n  reason: 'user requested removal',\n});\n\nconsole.log(suppression.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Suppressions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Tenants.Suppressions.List(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantSuppressionListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/suppressions \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.suppressions.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\npage = client.tenants.suppressions.list(\n    tenant_id="cm6abc123def456",\n)\npage = page.data[0]\nprint(page.id)',
      },
      ruby: {
        method: 'tenants.suppressions.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\npage = ark.tenants.suppressions.list("cm6abc123def456")\n\nputs(page)',
      },
      typescript: {
        method: 'client.tenants.suppressions.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const suppressionListResponse of client.tenants.suppressions.list('cm6abc123def456')) {\n  console.log(suppressionListResponse.id);\n}",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Suppressions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsuppression, err := client.Tenants.Suppressions.Get(\n\t\tcontext.TODO(),\n\t\t"user@example.com",\n\t\tark.TenantSuppressionGetParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", suppression.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/suppressions/$EMAIL \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.suppressions.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nsuppression = client.tenants.suppressions.retrieve(\n    email="user@example.com",\n    tenant_id="cm6abc123def456",\n)\nprint(suppression.data)',
      },
      ruby: {
        method: 'tenants.suppressions.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nsuppression = ark.tenants.suppressions.retrieve("user@example.com", tenant_id: "cm6abc123def456")\n\nputs(suppression)',
      },
      typescript: {
        method: 'client.tenants.suppressions.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst suppression = await client.tenants.suppressions.retrieve('user@example.com', {\n  tenantId: 'cm6abc123def456',\n});\n\nconsole.log(suppression.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Suppressions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsuppression, err := client.Tenants.Suppressions.Delete(\n\t\tcontext.TODO(),\n\t\t"user@example.com",\n\t\tark.TenantSuppressionDeleteParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", suppression.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/suppressions/$EMAIL \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.suppressions.delete',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nsuppression = client.tenants.suppressions.delete(\n    email="user@example.com",\n    tenant_id="cm6abc123def456",\n)\nprint(suppression.data)',
      },
      ruby: {
        method: 'tenants.suppressions.delete',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nsuppression = ark.tenants.suppressions.delete("user@example.com", tenant_id: "cm6abc123def456")\n\nputs(suppression)',
      },
      typescript: {
        method: 'client.tenants.suppressions.delete',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst suppression = await client.tenants.suppressions.delete('user@example.com', {\n  tenantId: 'cm6abc123def456',\n});\n\nconsole.log(suppression.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Tenants.Webhooks.New(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantWebhookNewParams{\n\t\t\tName:   "My App Webhook",\n\t\t\tURL:    "https://myapp.com/webhooks/email",\n\t\t\tEvents: []string{"MessageSent", "MessageDeliveryFailed", "MessageBounced"},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "name": "My App Webhook",\n          "url": "https://myapp.com/webhooks/email"\n        }\'',
      },
      python: {
        method: 'tenants.webhooks.create',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.tenants.webhooks.create(\n    tenant_id="cm6abc123def456",\n    name="My App Webhook",\n    url="https://myapp.com/webhooks/email",\n    events=["MessageSent", "MessageDeliveryFailed", "MessageBounced"],\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'tenants.webhooks.create',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.tenants.webhooks.create(\n  "cm6abc123def456",\n  name: "My App Webhook",\n  url: "https://myapp.com/webhooks/email"\n)\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.tenants.webhooks.create',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.tenants.webhooks.create('cm6abc123def456', {\n  name: 'My App Webhook',\n  url: 'https://myapp.com/webhooks/email',\n  events: ['MessageSent', 'MessageDeliveryFailed', 'MessageBounced'],\n});\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhooks, err := client.Tenants.Webhooks.List(context.TODO(), "cm6abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhooks.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.webhooks.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhooks = client.tenants.webhooks.list(\n    "cm6abc123def456",\n)\nprint(webhooks.data)',
      },
      ruby: {
        method: 'tenants.webhooks.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhooks = ark.tenants.webhooks.list("cm6abc123def456")\n\nputs(webhooks)',
      },
      typescript: {
        method: 'client.tenants.webhooks.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhooks = await client.tenants.webhooks.list('cm6abc123def456');\n\nconsole.log(webhooks.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Tenants.Webhooks.Get(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantWebhookGetParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks/$WEBHOOK_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.webhooks.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.tenants.webhooks.retrieve(\n    webhook_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'tenants.webhooks.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.tenants.webhooks.retrieve("123", tenant_id: "cm6abc123def456")\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.tenants.webhooks.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.tenants.webhooks.retrieve('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Tenants.Webhooks.Update(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantWebhookUpdateParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          "curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks/$WEBHOOK_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ARK_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'tenants.webhooks.update',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.tenants.webhooks.update(\n    webhook_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'tenants.webhooks.update',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.tenants.webhooks.update("123", tenant_id: "cm6abc123def456")\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.tenants.webhooks.update',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.tenants.webhooks.update('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Tenants.Webhooks.Delete(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantWebhookDeleteParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks/$WEBHOOK_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.webhooks.delete',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.tenants.webhooks.delete(\n    webhook_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'tenants.webhooks.delete',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.tenants.webhooks.delete("123", tenant_id: "cm6abc123def456")\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.tenants.webhooks.delete',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.tenants.webhooks.delete('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.Test',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tenants.Webhooks.Test(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantWebhookTestParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t\tEvent:    ark.TenantWebhookTestParamsEventMessageSent,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks/$WEBHOOK_ID/test \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "event": "MessageSent"\n        }\'',
      },
      python: {
        method: 'tenants.webhooks.test',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tenants.webhooks.test(\n    webhook_id="123",\n    tenant_id="cm6abc123def456",\n    event="MessageSent",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'tenants.webhooks.test_',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.tenants.webhooks.test_("123", tenant_id: "cm6abc123def456", event: :MessageSent)\n\nputs(response)',
      },
      typescript: {
        method: 'client.tenants.webhooks.test',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tenants.webhooks.test('123', {\n  tenantId: 'cm6abc123def456',\n  event: 'MessageSent',\n});\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.ListDeliveries',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tenants.Webhooks.ListDeliveries(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantWebhookListDeliveriesParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks/$WEBHOOK_ID/deliveries \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.webhooks.list_deliveries',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tenants.webhooks.list_deliveries(\n    webhook_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'tenants.webhooks.list_deliveries',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.tenants.webhooks.list_deliveries("123", tenant_id: "cm6abc123def456")\n\nputs(response)',
      },
      typescript: {
        method: 'client.tenants.webhooks.listDeliveries',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tenants.webhooks.listDeliveries('123', {\n  tenantId: 'cm6abc123def456',\n});\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.GetDelivery',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tenants.Webhooks.GetDelivery(\n\t\tcontext.TODO(),\n\t\t"whr_abc123def456",\n\t\tark.TenantWebhookGetDeliveryParams{\n\t\t\tTenantID:  "cm6abc123def456",\n\t\t\tWebhookID: "123",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks/$WEBHOOK_ID/deliveries/$DELIVERY_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.webhooks.retrieve_delivery',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tenants.webhooks.retrieve_delivery(\n    delivery_id="whr_abc123def456",\n    tenant_id="cm6abc123def456",\n    webhook_id="123",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'tenants.webhooks.retrieve_delivery',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.tenants.webhooks.retrieve_delivery(\n  "whr_abc123def456",\n  tenant_id: "cm6abc123def456",\n  webhook_id: "123"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.tenants.webhooks.retrieveDelivery',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tenants.webhooks.retrieveDelivery('whr_abc123def456', {\n  tenantId: 'cm6abc123def456',\n  webhookId: '123',\n});\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Webhooks.ReplayDelivery',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tenants.Webhooks.ReplayDelivery(\n\t\tcontext.TODO(),\n\t\t"whr_abc123def456",\n\t\tark.TenantWebhookReplayDeliveryParams{\n\t\t\tTenantID:  "cm6abc123def456",\n\t\t\tWebhookID: "123",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/webhooks/$WEBHOOK_ID/deliveries/$DELIVERY_ID/replay \\\n    -X POST \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.webhooks.replay_delivery',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tenants.webhooks.replay_delivery(\n    delivery_id="whr_abc123def456",\n    tenant_id="cm6abc123def456",\n    webhook_id="123",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'tenants.webhooks.replay_delivery',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.tenants.webhooks.replay_delivery("whr_abc123def456", tenant_id: "cm6abc123def456", webhook_id: "123")\n\nputs(response)',
      },
      typescript: {
        method: 'client.tenants.webhooks.replayDelivery',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tenants.webhooks.replayDelivery('whr_abc123def456', {\n  tenantId: 'cm6abc123def456',\n  webhookId: '123',\n});\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Tracking.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttracking, err := client.Tenants.Tracking.New(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantTrackingNewParams{\n\t\t\tDomainID: 123,\n\t\t\tName:     "track",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tracking.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/tracking \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "domainId": 123,\n          "name": "track"\n        }\'',
      },
      python: {
        method: 'tenants.tracking.create',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntracking = client.tenants.tracking.create(\n    tenant_id="cm6abc123def456",\n    domain_id=123,\n    name="track",\n)\nprint(tracking.data)',
      },
      ruby: {
        method: 'tenants.tracking.create',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntracking = ark.tenants.tracking.create("cm6abc123def456", domain_id: 123, name: "track")\n\nputs(tracking)',
      },
      typescript: {
        method: 'client.tenants.tracking.create',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tracking = await client.tenants.tracking.create('cm6abc123def456', {\n  domainId: 123,\n  name: 'track',\n});\n\nconsole.log(tracking.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Tracking.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttrackings, err := client.Tenants.Tracking.List(context.TODO(), "cm6abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", trackings.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/tracking \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.tracking.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntrackings = client.tenants.tracking.list(\n    "cm6abc123def456",\n)\nprint(trackings.data)',
      },
      ruby: {
        method: 'tenants.tracking.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntrackings = ark.tenants.tracking.list("cm6abc123def456")\n\nputs(trackings)',
      },
      typescript: {
        method: 'client.tenants.tracking.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst trackings = await client.tenants.tracking.list('cm6abc123def456');\n\nconsole.log(trackings.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Tracking.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttracking, err := client.Tenants.Tracking.Get(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantTrackingGetParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tracking.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/tracking/$TRACKING_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.tracking.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntracking = client.tenants.tracking.retrieve(\n    tracking_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(tracking.data)',
      },
      ruby: {
        method: 'tenants.tracking.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntracking = ark.tenants.tracking.retrieve("123", tenant_id: "cm6abc123def456")\n\nputs(tracking)',
      },
      typescript: {
        method: 'client.tenants.tracking.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tracking = await client.tenants.tracking.retrieve('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(tracking.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Tracking.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttracking, err := client.Tenants.Tracking.Update(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantTrackingUpdateParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tracking.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/tracking/$TRACKING_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "excludedClickDomains": "example.com,mysite.org"\n        }\'',
      },
      python: {
        method: 'tenants.tracking.update',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntracking = client.tenants.tracking.update(\n    tracking_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(tracking.data)',
      },
      ruby: {
        method: 'tenants.tracking.update',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntracking = ark.tenants.tracking.update("123", tenant_id: "cm6abc123def456")\n\nputs(tracking)',
      },
      typescript: {
        method: 'client.tenants.tracking.update',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tracking = await client.tenants.tracking.update('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(tracking.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Tracking.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttracking, err := client.Tenants.Tracking.Delete(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantTrackingDeleteParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tracking.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/tracking/$TRACKING_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.tracking.delete',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\ntracking = client.tenants.tracking.delete(\n    tracking_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(tracking.data)',
      },
      ruby: {
        method: 'tenants.tracking.delete',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\ntracking = ark.tenants.tracking.delete("123", tenant_id: "cm6abc123def456")\n\nputs(tracking)',
      },
      typescript: {
        method: 'client.tenants.tracking.delete',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst tracking = await client.tenants.tracking.delete('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(tracking.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Tracking.Verify',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tenants.Tracking.Verify(\n\t\tcontext.TODO(),\n\t\t"123",\n\t\tark.TenantTrackingVerifyParams{\n\t\t\tTenantID: "cm6abc123def456",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/tracking/$TRACKING_ID/verify \\\n    -X POST \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.tracking.verify',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tenants.tracking.verify(\n    tracking_id="123",\n    tenant_id="cm6abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'tenants.tracking.verify',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.tenants.tracking.verify("123", tenant_id: "cm6abc123def456")\n\nputs(response)',
      },
      typescript: {
        method: 'client.tenants.tracking.verify',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tenants.tracking.verify('123', { tenantId: 'cm6abc123def456' });\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Usage.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tusage, err := client.Tenants.Usage.Get(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantUsageGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", usage.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/usage \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.usage.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nusage = client.tenants.usage.retrieve(\n    tenant_id="cm6abc123def456",\n)\nprint(usage.data)',
      },
      ruby: {
        method: 'tenants.usage.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nusage = ark.tenants.usage.retrieve("cm6abc123def456")\n\nputs(usage)',
      },
      typescript: {
        method: 'client.tenants.usage.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst usage = await client.tenants.usage.retrieve('cm6abc123def456');\n\nconsole.log(usage.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Tenants.Usage.GetTimeseries',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tenants.Usage.GetTimeseries(\n\t\tcontext.TODO(),\n\t\t"cm6abc123def456",\n\t\tark.TenantUsageGetTimeseriesParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/tenants/$TENANT_ID/usage/timeseries \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'tenants.usage.retrieve_timeseries',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tenants.usage.retrieve_timeseries(\n    tenant_id="cm6abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'tenants.usage.retrieve_timeseries',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.tenants.usage.retrieve_timeseries("cm6abc123def456")\n\nputs(response)',
      },
      typescript: {
        method: 'client.tenants.usage.retrieveTimeseries',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tenants.usage.retrieveTimeseries('cm6abc123def456');\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Platform.Webhooks.New(context.TODO(), ark.PlatformWebhookNewParams{\n\t\tName:   "Central Event Processor",\n\t\tURL:    "https://myplatform.com/webhooks/email-events",\n\t\tEvents: []string{"MessageSent", "MessageDeliveryFailed", "MessageBounced"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "name": "Central Event Processor",\n          "url": "https://myplatform.com/webhooks/email-events",\n          "events": [\n            "MessageSent",\n            "MessageDeliveryFailed",\n            "MessageBounced"\n          ]\n        }\'',
      },
      python: {
        method: 'platform.webhooks.create',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.platform.webhooks.create(\n    name="Central Event Processor",\n    url="https://myplatform.com/webhooks/email-events",\n    events=["MessageSent", "MessageDeliveryFailed", "MessageBounced"],\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'platform.webhooks.create',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.platform.webhooks.create(\n  name: "Central Event Processor",\n  url: "https://myplatform.com/webhooks/email-events"\n)\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.platform.webhooks.create',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.platform.webhooks.create({\n  name: 'Central Event Processor',\n  url: 'https://myplatform.com/webhooks/email-events',\n  events: ['MessageSent', 'MessageDeliveryFailed', 'MessageBounced'],\n});\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhooks, err := client.Platform.Webhooks.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhooks.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'platform.webhooks.list',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhooks = client.platform.webhooks.list()\nprint(webhooks.data)',
      },
      ruby: {
        method: 'platform.webhooks.list',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhooks = ark.platform.webhooks.list\n\nputs(webhooks)',
      },
      typescript: {
        method: 'client.platform.webhooks.list',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhooks = await client.platform.webhooks.list();\n\nconsole.log(webhooks.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Platform.Webhooks.Get(context.TODO(), "pwh_abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks/$WEBHOOK_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'platform.webhooks.retrieve',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.platform.webhooks.retrieve(\n    "pwh_abc123def456",\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'platform.webhooks.retrieve',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.platform.webhooks.retrieve("pwh_abc123def456")\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.platform.webhooks.retrieve',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.platform.webhooks.retrieve('pwh_abc123def456');\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Platform.Webhooks.Update(\n\t\tcontext.TODO(),\n\t\t"pwh_abc123def456",\n\t\tark.PlatformWebhookUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          "curl https://api.arkhq.io/v1/platform/webhooks/$WEBHOOK_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ARK_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'platform.webhooks.update',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.platform.webhooks.update(\n    webhook_id="pwh_abc123def456",\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'platform.webhooks.update',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.platform.webhooks.update("pwh_abc123def456")\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.platform.webhooks.update',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.platform.webhooks.update('pwh_abc123def456');\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Platform.Webhooks.Delete(context.TODO(), "pwh_abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks/$WEBHOOK_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'platform.webhooks.delete',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.platform.webhooks.delete(\n    "pwh_abc123def456",\n)\nprint(webhook.data)',
      },
      ruby: {
        method: 'platform.webhooks.delete',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nwebhook = ark.platform.webhooks.delete("pwh_abc123def456")\n\nputs(webhook)',
      },
      typescript: {
        method: 'client.platform.webhooks.delete',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.platform.webhooks.delete('pwh_abc123def456');\n\nconsole.log(webhook.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.Test',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Platform.Webhooks.Test(\n\t\tcontext.TODO(),\n\t\t"pwh_abc123def456",\n\t\tark.PlatformWebhookTestParams{\n\t\t\tEvent: ark.PlatformWebhookTestParamsEventMessageSent,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks/$WEBHOOK_ID/test \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ARK_API_KEY" \\\n    -d \'{\n          "event": "MessageSent"\n        }\'',
      },
      python: {
        method: 'platform.webhooks.test',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.platform.webhooks.test(\n    webhook_id="pwh_abc123def456",\n    event="MessageSent",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'platform.webhooks.test_',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.platform.webhooks.test_("pwh_abc123def456", event: :MessageSent)\n\nputs(response)',
      },
      typescript: {
        method: 'client.platform.webhooks.test',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.platform.webhooks.test('pwh_abc123def456', { event: 'MessageSent' });\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.ListDeliveries',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Platform.Webhooks.ListDeliveries(context.TODO(), ark.PlatformWebhookListDeliveriesParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks/deliveries \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'platform.webhooks.list_deliveries',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\npage = client.platform.webhooks.list_deliveries()\npage = page.data[0]\nprint(page.id)',
      },
      ruby: {
        method: 'platform.webhooks.list_deliveries',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\npage = ark.platform.webhooks.list_deliveries\n\nputs(page)',
      },
      typescript: {
        method: 'client.platform.webhooks.listDeliveries',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const webhookListDeliveriesResponse of client.platform.webhooks.listDeliveries()) {\n  console.log(webhookListDeliveriesResponse.id);\n}",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.GetDelivery',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Platform.Webhooks.GetDelivery(context.TODO(), "pwd_abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks/deliveries/$DELIVERY_ID \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'platform.webhooks.retrieve_delivery',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.platform.webhooks.retrieve_delivery(\n    "pwd_abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'platform.webhooks.retrieve_delivery',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.platform.webhooks.retrieve_delivery("pwd_abc123def456")\n\nputs(response)',
      },
      typescript: {
        method: 'client.platform.webhooks.retrieveDelivery',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.platform.webhooks.retrieveDelivery('pwd_abc123def456');\n\nconsole.log(response.data);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Platform.Webhooks.ReplayDelivery',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Platform.Webhooks.ReplayDelivery(context.TODO(), "pwd_abc123def456")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.arkhq.io/v1/platform/webhooks/deliveries/$DELIVERY_ID/replay \\\n    -X POST \\\n    -H "Authorization: Bearer $ARK_API_KEY"',
      },
      python: {
        method: 'platform.webhooks.replay_delivery',
        example:
          'import os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.platform.webhooks.replay_delivery(\n    "pwd_abc123def456",\n)\nprint(response.data)',
      },
      ruby: {
        method: 'platform.webhooks.replay_delivery',
        example:
          'require "ark_email"\n\nark = ArkEmail::Client.new(api_key: "My API Key")\n\nresponse = ark.platform.webhooks.replay_delivery("pwd_abc123def456")\n\nputs(response)',
      },
      typescript: {
        method: 'client.platform.webhooks.replayDelivery',
        example:
          "import Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.platform.webhooks.replayDelivery('pwd_abc123def456');\n\nconsole.log(response.data);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Ark Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/ark-email.svg?label=pypi%20(stable))](https://pypi.org/project/ark-email/)\n\nThe Ark Python library provides convenient access to the Ark REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Ark MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=ark-email-mcp&config=eyJuYW1lIjoiYXJrLWVtYWlsLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL2Fyay1tY3Auc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1hcmstYXBpLWtleSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22ark-email-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fark-mcp.stlmcp.com%22%2C%22headers%22%3A%7B%22x-ark-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [arkhq.io](https://arkhq.io/docs). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install ark-email\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom ark import Ark\n\nclient = Ark(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\n\nresponse = client.emails.send(\n    from_="hello@yourdomain.com",\n    subject="Hello World",\n    to=["user@example.com"],\n    html="<h1>Welcome!</h1>",\n    metadata={\n        "user_id": "usr_123456",\n        "campaign": "onboarding",\n    },\n    tag="welcome",\n)\nprint(response.data)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `ARK_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncArk` instead of `Ark` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom ark import AsyncArk\n\nclient = AsyncArk(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.emails.send(\n      from_="hello@yourdomain.com",\n      subject="Hello World",\n      to=["user@example.com"],\n      html="<h1>Welcome!</h1>",\n      metadata={\n          "user_id": "usr_123456",\n          "campaign": "onboarding",\n      },\n      tag="welcome",\n  )\n  print(response.data)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install ark-email[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom ark import DefaultAioHttpClient\nfrom ark import AsyncArk\n\nasync def main() -> None:\n  async with AsyncArk(\n    api_key=os.environ.get("ARK_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.emails.send(\n        from_="hello@yourdomain.com",\n        subject="Hello World",\n        to=["user@example.com"],\n        html="<h1>Welcome!</h1>",\n        metadata={\n            "user_id": "usr_123456",\n            "campaign": "onboarding",\n        },\n        tag="welcome",\n    )\n    print(response.data)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Ark API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom ark import Ark\n\nclient = Ark()\n\nall_emails = []\n# Automatically fetches more pages as needed.\nfor email in client.emails.list(\n    page=1,\n    per_page=10,\n):\n    # Do something with email here\n    all_emails.append(email)\nprint(all_emails)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom ark import AsyncArk\n\nclient = AsyncArk()\n\nasync def main() -> None:\n    all_emails = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for email in client.emails.list(\n    page=1,\n    per_page=10,\n):\n        all_emails.append(email)\n    print(all_emails)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.emails.list(\n    page=1,\n    per_page=10,\n)\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.data)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.emails.list(\n    page=1,\n    per_page=10,\n)\n\nprint(f"page number: {first_page.page}") # => "page number: 1"\nfor email in first_page.data:\n    print(email.id)\n\n# Remove `await` for non-async usage.\n```\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `ark.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `ark.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `ark.APIError`.\n\n```python\nimport ark\nfrom ark import Ark\n\nclient = Ark()\n\ntry:\n    client.emails.send(\n        from_="hello@yourdomain.com",\n        subject="Hello World",\n        to=["user@example.com"],\n        html="<h1>Welcome!</h1>",\n        metadata={\n            "user_id": "usr_123456",\n            "campaign": "onboarding",\n        },\n        tag="welcome",\n    )\nexcept ark.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept ark.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept ark.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom ark import Ark\n\n# Configure the default for all requests:\nclient = Ark(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).emails.send(\n    from_="hello@yourdomain.com",\n    subject="Hello World",\n    to=["user@example.com"],\n    html="<h1>Welcome!</h1>",\n    metadata={\n        "user_id": "usr_123456",\n        "campaign": "onboarding",\n    },\n    tag="welcome",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom ark import Ark\n\n# Configure the default for all requests:\nclient = Ark(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Ark(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).emails.send(\n    from_="hello@yourdomain.com",\n    subject="Hello World",\n    to=["user@example.com"],\n    html="<h1>Welcome!</h1>",\n    metadata={\n        "user_id": "usr_123456",\n        "campaign": "onboarding",\n    },\n    tag="welcome",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `ARK_LOG` to `info`.\n\n```shell\n$ export ARK_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom ark import Ark\n\nclient = Ark()\nresponse = client.emails.with_raw_response.send(\n    from_="hello@yourdomain.com",\n    subject="Hello World",\n    to=["user@example.com"],\n    html="<h1>Welcome!</h1>",\n    metadata={\n        "user_id": "usr_123456",\n        "campaign": "onboarding",\n    },\n    tag="welcome",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nemail = response.parse()  # get the object that `emails.send()` would have returned\nprint(email.data)\n```\n\nThese methods return an [`APIResponse`](https://github.com/ArkHQ-io/ark-python/tree/main/src/ark/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/ArkHQ-io/ark-python/tree/main/src/ark/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.emails.with_streaming_response.send(\n    from_="hello@yourdomain.com",\n    subject="Hello World",\n    to=["user@example.com"],\n    html="<h1>Welcome!</h1>",\n    metadata={\n        "user_id": "usr_123456",\n        "campaign": "onboarding",\n    },\n    tag="welcome",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom ark import Ark, DefaultHttpxClient\n\nclient = Ark(\n    # Or use the `ARK_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom ark import Ark\n\nwith Ark() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/ArkHQ-io/ark-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport ark\nprint(ark.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Ark Go API Library\n\n<a href="https://pkg.go.dev/github.com/ArkHQ-io/ark-go"><img src="https://pkg.go.dev/badge/github.com/ArkHQ-io/ark-go.svg" alt="Go Reference"></a>\n\nThe Ark Go library provides convenient access to the [Ark REST API](https://arkhq.io/docs)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Ark MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=ark-email-mcp&config=eyJuYW1lIjoiYXJrLWVtYWlsLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL2Fyay1tY3Auc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1hcmstYXBpLWtleSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22ark-email-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fark-mcp.stlmcp.com%22%2C%22headers%22%3A%7B%22x-ark-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/ArkHQ-io/ark-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/ArkHQ-io/ark-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/ArkHQ-io/ark-go"\n\t"github.com/ArkHQ-io/ark-go/option"\n)\n\nfunc main() {\n\tclient := ark.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("ARK_API_KEY")\n\t)\n\tresponse, err := client.Emails.Send(context.TODO(), ark.EmailSendParams{\n\t\tFrom:    "hello@yourdomain.com",\n\t\tSubject: "Hello World",\n\t\tTo:      []string{"user@example.com"},\n\t\tHTML:    ark.String("<h1>Welcome!</h1>"),\n\t\tMetadata: map[string]string{\n\t\t\t"user_id":  "usr_123456",\n\t\t\t"campaign": "onboarding",\n\t\t},\n\t\tTag: ark.String("welcome"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Emails.Send(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/ArkHQ-io/ark-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Emails.ListAutoPaging(context.TODO(), ark.EmailListParams{\n\tPage:    ark.Int(1),\n\tPerPage: ark.Int(10),\n})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\temailListResponse := iter.Current()\n\tfmt.Printf("%+v\\n", emailListResponse)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Emails.List(context.TODO(), ark.EmailListParams{\n\tPage:    ark.Int(1),\n\tPerPage: ark.Int(10),\n})\nfor page != nil {\n\tfor _, email := range page.Data {\n\t\tfmt.Printf("%+v\\n", email)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Emails.Send(context.TODO(), ark.EmailSendParams{\n\tFrom:    "hello@yourdomain.com",\n\tSubject: "Hello World",\n\tTo:      []string{"user@example.com"},\n\tHTML:    ark.String("<h1>Welcome!</h1>"),\n\tMetadata: map[string]string{\n\t\t"user_id":  "usr_123456",\n\t\t"campaign": "onboarding",\n\t},\n\tTag: ark.String("welcome"),\n})\nif err != nil {\n\tvar apierr *ark.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/emails": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Emails.Send(\n\tctx,\n\tark.EmailSendParams{\n\t\tFrom:    "hello@yourdomain.com",\n\t\tSubject: "Hello World",\n\t\tTo:      []string{"user@example.com"},\n\t\tHTML:    ark.String("<h1>Welcome!</h1>"),\n\t\tMetadata: map[string]string{\n\t\t\t"user_id":  "usr_123456",\n\t\t\t"campaign": "onboarding",\n\t\t},\n\t\tTag: ark.String("welcome"),\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := ark.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Emails.Send(\n\tcontext.TODO(),\n\tark.EmailSendParams{\n\t\tFrom:    "hello@yourdomain.com",\n\t\tSubject: "Hello World",\n\t\tTo:      []string{"user@example.com"},\n\t\tHTML:    ark.String("<h1>Welcome!</h1>"),\n\t\tMetadata: map[string]string{\n\t\t\t"user_id":  "usr_123456",\n\t\t\t"campaign": "onboarding",\n\t\t},\n\t\tTag: ark.String("welcome"),\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nresponse, err := client.Emails.Send(\n\tcontext.TODO(),\n\tark.EmailSendParams{\n\t\tFrom:    "hello@yourdomain.com",\n\t\tSubject: "Hello World",\n\t\tTo:      []string{"user@example.com"},\n\t\tHTML:    ark.String("<h1>Welcome!</h1>"),\n\t\tMetadata: map[string]string{\n\t\t\t"user_id":  "usr_123456",\n\t\t\t"campaign": "onboarding",\n\t\t},\n\t\tTag: ark.String("welcome"),\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", response)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/ArkHQ-io/ark-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Ark TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/ark-email.svg?label=npm%20(stable))](https://npmjs.org/package/ark-email) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/ark-email)\n\nThis library provides convenient access to the Ark REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [arkhq.io](https://arkhq.io/docs). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Ark MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=ark-email-mcp&config=eyJuYW1lIjoiYXJrLWVtYWlsLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL2Fyay1tY3Auc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1hcmstYXBpLWtleSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22ark-email-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fark-mcp.stlmcp.com%22%2C%22headers%22%3A%7B%22x-ark-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install ark-email\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.send({\n  from: 'hello@yourdomain.com',\n  subject: 'Hello World',\n  to: ['user@example.com'],\n  html: '<h1>Welcome!</h1>',\n  metadata: { user_id: 'usr_123456', campaign: 'onboarding' },\n  tag: 'welcome',\n});\n\nconsole.log(response.data);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Ark from 'ark-email';\n\nconst client = new Ark({\n  apiKey: process.env['ARK_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Ark.EmailSendParams = {\n  from: 'hello@yourdomain.com',\n  subject: 'Hello World',\n  to: ['user@example.com'],\n  html: '<h1>Welcome!</h1>',\n  metadata: { user_id: 'usr_123456', campaign: 'onboarding' },\n  tag: 'welcome',\n};\nconst response: Ark.EmailSendResponse = await client.emails.send(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.emails\n  .send({\n    from: 'hello@yourdomain.com',\n    subject: 'Hello World',\n    to: ['user@example.com'],\n    html: '<h1>Welcome!</h1>',\n    metadata: { user_id: 'usr_123456', campaign: 'onboarding' },\n    tag: 'welcome',\n  })\n  .catch(async (err) => {\n    if (err instanceof Ark.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Ark({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.emails.send({\n  from: 'hello@yourdomain.com',\n  subject: 'Hello World',\n  to: ['user@example.com'],\n  html: '<h1>Welcome!</h1>',\n  metadata: { user_id: 'usr_123456', campaign: 'onboarding' },\n  tag: 'welcome',\n}, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Ark({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.emails.send({\n  from: 'hello@yourdomain.com',\n  subject: 'Hello World',\n  to: ['user@example.com'],\n  html: '<h1>Welcome!</h1>',\n  metadata: { user_id: 'usr_123456', campaign: 'onboarding' },\n  tag: 'welcome',\n}, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Ark API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllEmailListResponses(params) {\n  const allEmailListResponses = [];\n  // Automatically fetches more pages as needed.\n  for await (const emailListResponse of client.emails.list({ page: 1, perPage: 10 })) {\n    allEmailListResponses.push(emailListResponse);\n  }\n  return allEmailListResponses;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.emails.list({ page: 1, perPage: 10 });\nfor (const emailListResponse of page.data) {\n  console.log(emailListResponse);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Ark();\n\nconst response = await client.emails\n  .send({\n    from: 'hello@yourdomain.com',\n    subject: 'Hello World',\n    to: ['user@example.com'],\n    html: '<h1>Welcome!</h1>',\n    metadata: { user_id: 'usr_123456', campaign: 'onboarding' },\n    tag: 'welcome',\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.emails\n  .send({\n    from: 'hello@yourdomain.com',\n    subject: 'Hello World',\n    to: ['user@example.com'],\n    html: '<h1>Welcome!</h1>',\n    metadata: { user_id: 'usr_123456', campaign: 'onboarding' },\n    tag: 'welcome',\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.data);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `ARK_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Ark from 'ark-email';\n\nconst client = new Ark({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Ark from 'ark-email';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Ark({\n  logger: logger.child({ name: 'Ark' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.emails.send({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Ark from 'ark-email';\nimport fetch from 'my-fetch';\n\nconst client = new Ark({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Ark from 'ark-email';\n\nconst client = new Ark({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Ark from 'ark-email';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Ark({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Ark from 'ark-email';\n\nconst client = new Ark({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Ark from 'npm:ark-email';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Ark({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/ArkHQ-io/ark-nodejs/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'ruby',
    content:
      '# Ark Ruby API library\n\nThe Ark Ruby library provides convenient access to the Ark REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/ArkHQ-io/ark-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Ark MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=ark-email-mcp&config=eyJuYW1lIjoiYXJrLWVtYWlsLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL2Fyay1tY3Auc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1hcmstYXBpLWtleSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22ark-email-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fark-mcp.stlmcp.com%22%2C%22headers%22%3A%7B%22x-ark-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/ark-email).\n\nThe REST API documentation can be found on [arkhq.io](https://arkhq.io/docs).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "ark-email", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "ark_email"\n\nark = ArkEmail::Client.new(\n  api_key: ENV["ARK_API_KEY"] # This is the default and can be omitted\n)\n\nresponse = ark.emails.send_(\n  from: "hello@yourdomain.com",\n  subject: "Hello World",\n  to: ["user@example.com"],\n  html: "<h1>Welcome!</h1>",\n  metadata: {user_id: "usr_123456", campaign: "onboarding"},\n  tag: "welcome"\n)\n\nputs(response.data)\n```\n\n\n\n### Pagination\n\nList methods in the Ark API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = ark.emails.list(page: 1, per_page: 10)\n\n# Fetch single item from page.\nemail = page.data[0]\nputs(email.id)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |email|\n  puts(email.id)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.data[0].id)\nend\n```\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `ArkEmail::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  email = ark.emails.send_(\n    from: "hello@yourdomain.com",\n    subject: "Hello World",\n    to: ["user@example.com"],\n    html: "<h1>Welcome!</h1>",\n    metadata: {user_id: "usr_123456", campaign: "onboarding"},\n    tag: "welcome"\n  )\nrescue ArkEmail::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue ArkEmail::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue ArkEmail::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nark = ArkEmail::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nark.emails.send_(\n  from: "hello@yourdomain.com",\n  subject: "Hello World",\n  to: ["user@example.com"],\n  html: "<h1>Welcome!</h1>",\n  metadata: {user_id: "usr_123456", campaign: "onboarding"},\n  tag: "welcome",\n  request_options: {max_retries: 5}\n)\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nark = ArkEmail::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nark.emails.send_(\n  from: "hello@yourdomain.com",\n  subject: "Hello World",\n  to: ["user@example.com"],\n  html: "<h1>Welcome!</h1>",\n  metadata: {user_id: "usr_123456", campaign: "onboarding"},\n  tag: "welcome",\n  request_options: {timeout: 5}\n)\n```\n\nOn timeout, `ArkEmail::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `ArkEmail::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nresponse =\n  ark.emails.send_(\n    from: "hello@yourdomain.com",\n    subject: "Hello World",\n    to: ["user@example.com"],\n    html: "<h1>Welcome!</h1>",\n    metadata: {user_id: "usr_123456", campaign: "onboarding"},\n    tag: "welcome",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(response[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `ArkEmail::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `ArkEmail::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nark.emails.send_(\n  from: "hello@yourdomain.com",\n  subject: "Hello World",\n  to: ["user@example.com"],\n  html: "<h1>Welcome!</h1>",\n  metadata: {user_id: "usr_123456", campaign: "onboarding"},\n  tag: "welcome"\n)\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nark.emails.send_(\n  from: "hello@yourdomain.com",\n  subject: "Hello World",\n  to: ["user@example.com"],\n  html: "<h1>Welcome!</h1>",\n  metadata: {user_id: "usr_123456", campaign: "onboarding"},\n  tag: "welcome"\n)\n\n# You can also splat a full Params class:\nparams = ArkEmail::EmailSendParams.new(\n  from: "hello@yourdomain.com",\n  subject: "Hello World",\n  to: ["user@example.com"],\n  html: "<h1>Welcome!</h1>",\n  metadata: {user_id: "usr_123456", campaign: "onboarding"},\n  tag: "welcome"\n)\nark.emails.send_(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :pending\nputs(ArkEmail::EmailListParams::Status::PENDING)\n\n# Revealed type: `T.all(ArkEmail::EmailListParams::Status, Symbol)`\nT.reveal_type(ArkEmail::EmailListParams::Status::PENDING)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\nark.emails.list(\n  status: ArkEmail::EmailListParams::Status::PENDING,\n  # …\n)\n\n# Literal values are also permissible:\nark.emails.list(\n  status: :pending,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/ArkHQ-io/ark-ruby/tree/main/CONTRIBUTING.md).\n',
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
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
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
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
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
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
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

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
