# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIMeta</a></code>

# Emails

Types:

- <code><a href="./src/resources/emails.ts">EmailListResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendBatchResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendRawResponse</a></code>

Methods:

- <code title="get /emails">client.emails.<a href="./src/resources/emails.ts">list</a>({ ...params }) -> EmailListResponsesPageNumberPagination</code>
- <code title="post /emails">client.emails.<a href="./src/resources/emails.ts">send</a>({ ...params }) -> EmailSendResponse</code>
- <code title="post /emails/batch">client.emails.<a href="./src/resources/emails.ts">sendBatch</a>({ ...params }) -> EmailSendBatchResponse</code>
- <code title="post /emails/raw">client.emails.<a href="./src/resources/emails.ts">sendRaw</a>({ ...params }) -> EmailSendRawResponse</code>

# Domains

Types:

- <code><a href="./src/resources/domains.ts">DNSRecord</a></code>
- <code><a href="./src/resources/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainDeleteResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainVerifyResponse</a></code>

Methods:

- <code title="post /domains">client.domains.<a href="./src/resources/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /domains/{domainId}">client.domains.<a href="./src/resources/domains.ts">retrieve</a>(domainID) -> DomainRetrieveResponse</code>
- <code title="get /domains">client.domains.<a href="./src/resources/domains.ts">list</a>() -> DomainListResponse</code>
- <code title="delete /domains/{domainId}">client.domains.<a href="./src/resources/domains.ts">delete</a>(domainID) -> DomainDeleteResponse</code>
- <code title="post /domains/{domainId}/verify">client.domains.<a href="./src/resources/domains.ts">verify</a>(domainID) -> DomainVerifyResponse</code>

# Suppressions

Types:

- <code><a href="./src/resources/suppressions.ts">SuppressionCreateResponse</a></code>
- <code><a href="./src/resources/suppressions.ts">SuppressionRetrieveResponse</a></code>
- <code><a href="./src/resources/suppressions.ts">SuppressionListResponse</a></code>
- <code><a href="./src/resources/suppressions.ts">SuppressionDeleteResponse</a></code>
- <code><a href="./src/resources/suppressions.ts">SuppressionBulkCreateResponse</a></code>

Methods:

- <code title="post /suppressions">client.suppressions.<a href="./src/resources/suppressions.ts">create</a>({ ...params }) -> SuppressionCreateResponse</code>
- <code title="get /suppressions/{email}">client.suppressions.<a href="./src/resources/suppressions.ts">retrieve</a>(email) -> SuppressionRetrieveResponse</code>
- <code title="get /suppressions">client.suppressions.<a href="./src/resources/suppressions.ts">list</a>({ ...params }) -> SuppressionListResponsesPageNumberPagination</code>
- <code title="delete /suppressions/{email}">client.suppressions.<a href="./src/resources/suppressions.ts">delete</a>(email) -> SuppressionDeleteResponse</code>
- <code title="post /suppressions/bulk">client.suppressions.<a href="./src/resources/suppressions.ts">bulkCreate</a>({ ...params }) -> SuppressionBulkCreateResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookUpdateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookDeleteResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListDeliveriesResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookReplayDeliveryResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRetrieveDeliveryResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookTestResponse</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(webhookID) -> WebhookRetrieveResponse</code>
- <code title="patch /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(webhookID, { ...params }) -> WebhookUpdateResponse</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookID) -> WebhookDeleteResponse</code>
- <code title="get /webhooks/{webhookId}/deliveries">client.webhooks.<a href="./src/resources/webhooks.ts">listDeliveries</a>(webhookID, { ...params }) -> WebhookListDeliveriesResponse</code>
- <code title="post /webhooks/{webhookId}/deliveries/{deliveryId}/replay">client.webhooks.<a href="./src/resources/webhooks.ts">replayDelivery</a>(deliveryID, { ...params }) -> WebhookReplayDeliveryResponse</code>
- <code title="get /webhooks/{webhookId}/deliveries/{deliveryId}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieveDelivery</a>(deliveryID, { ...params }) -> WebhookRetrieveDeliveryResponse</code>
- <code title="post /webhooks/{webhookId}/test">client.webhooks.<a href="./src/resources/webhooks.ts">test</a>(webhookID, { ...params }) -> WebhookTestResponse</code>

# Tracking

Types:

- <code><a href="./src/resources/tracking.ts">TrackDomain</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingCreateResponse</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingRetrieveResponse</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingUpdateResponse</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingListResponse</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingDeleteResponse</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingVerifyResponse</a></code>

Methods:

- <code title="post /tracking">client.tracking.<a href="./src/resources/tracking.ts">create</a>({ ...params }) -> TrackingCreateResponse</code>
- <code title="get /tracking/{trackingId}">client.tracking.<a href="./src/resources/tracking.ts">retrieve</a>(trackingID) -> TrackingRetrieveResponse</code>
- <code title="patch /tracking/{trackingId}">client.tracking.<a href="./src/resources/tracking.ts">update</a>(trackingID, { ...params }) -> TrackingUpdateResponse</code>
- <code title="get /tracking">client.tracking.<a href="./src/resources/tracking.ts">list</a>() -> TrackingListResponse</code>
- <code title="delete /tracking/{trackingId}">client.tracking.<a href="./src/resources/tracking.ts">delete</a>(trackingID) -> TrackingDeleteResponse</code>
- <code title="post /tracking/{trackingId}/verify">client.tracking.<a href="./src/resources/tracking.ts">verify</a>(trackingID) -> TrackingVerifyResponse</code>

# Logs

Types:

- <code><a href="./src/resources/logs.ts">LogEntry</a></code>
- <code><a href="./src/resources/logs.ts">LogEntryDetail</a></code>
- <code><a href="./src/resources/logs.ts">LogRetrieveResponse</a></code>

Methods:

- <code title="get /logs/{requestId}">client.logs.<a href="./src/resources/logs.ts">retrieve</a>(requestID) -> LogRetrieveResponse</code>
- <code title="get /logs">client.logs.<a href="./src/resources/logs.ts">list</a>({ ...params }) -> LogEntriesPageNumberPagination</code>

# Usage

Types:

- <code><a href="./src/resources/usage.ts">UsageRetrieveResponse</a></code>

Methods:

- <code title="get /usage">client.usage.<a href="./src/resources/usage.ts">retrieve</a>() -> UsageRetrieveResponse</code>
