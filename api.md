# Emails

Types:

- <code><a href="./src/resources/emails.ts">Delivery</a></code>
- <code><a href="./src/resources/emails.ts">Pagination</a></code>
- <code><a href="./src/resources/emails.ts">SendEmail</a></code>
- <code><a href="./src/resources/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailListResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailGetDeliveriesResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailRetryResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendBatchResponse</a></code>

Methods:

- <code title="get /emails/{emailId}">client.emails.<a href="./src/resources/emails.ts">retrieve</a>(emailID, { ...params }) -> EmailRetrieveResponse</code>
- <code title="get /emails">client.emails.<a href="./src/resources/emails.ts">list</a>({ ...params }) -> EmailListResponse</code>
- <code title="get /emails/{emailId}/deliveries">client.emails.<a href="./src/resources/emails.ts">getDeliveries</a>(emailID) -> EmailGetDeliveriesResponse</code>
- <code title="post /emails/{emailId}/retry">client.emails.<a href="./src/resources/emails.ts">retry</a>(emailID) -> EmailRetryResponse</code>
- <code title="post /emails">client.emails.<a href="./src/resources/emails.ts">send</a>({ ...params }) -> SendEmail</code>
- <code title="post /emails/batch">client.emails.<a href="./src/resources/emails.ts">sendBatch</a>({ ...params }) -> EmailSendBatchResponse</code>
- <code title="post /emails/raw">client.emails.<a href="./src/resources/emails.ts">sendRaw</a>({ ...params }) -> SendEmail</code>

# Domains

Types:

- <code><a href="./src/resources/domains.ts">DNSRecord</a></code>
- <code><a href="./src/resources/domains.ts">DomainResponse</a></code>
- <code><a href="./src/resources/domains.ts">SuccessResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainListResponse</a></code>

Methods:

- <code title="post /domains">client.domains.<a href="./src/resources/domains.ts">create</a>({ ...params }) -> DomainResponse</code>
- <code title="get /domains/{domainId}">client.domains.<a href="./src/resources/domains.ts">retrieve</a>(domainID) -> DomainResponse</code>
- <code title="get /domains">client.domains.<a href="./src/resources/domains.ts">list</a>() -> DomainListResponse</code>
- <code title="delete /domains/{domainId}">client.domains.<a href="./src/resources/domains.ts">delete</a>(domainID) -> SuccessResponse</code>
- <code title="post /domains/{domainId}/verify">client.domains.<a href="./src/resources/domains.ts">verify</a>(domainID) -> DomainResponse</code>

# Suppressions

Types:

- <code><a href="./src/resources/suppressions.ts">SuppressionCreateResponse</a></code>
- <code><a href="./src/resources/suppressions.ts">SuppressionRetrieveResponse</a></code>
- <code><a href="./src/resources/suppressions.ts">SuppressionListResponse</a></code>
- <code><a href="./src/resources/suppressions.ts">SuppressionBulkCreateResponse</a></code>

Methods:

- <code title="post /suppressions">client.suppressions.<a href="./src/resources/suppressions.ts">create</a>({ ...params }) -> SuppressionCreateResponse</code>
- <code title="get /suppressions/{email}">client.suppressions.<a href="./src/resources/suppressions.ts">retrieve</a>(email) -> SuppressionRetrieveResponse</code>
- <code title="get /suppressions">client.suppressions.<a href="./src/resources/suppressions.ts">list</a>({ ...params }) -> SuppressionListResponse</code>
- <code title="delete /suppressions/{email}">client.suppressions.<a href="./src/resources/suppressions.ts">delete</a>(email) -> SuccessResponse</code>
- <code title="post /suppressions/bulk">client.suppressions.<a href="./src/resources/suppressions.ts">bulkCreate</a>({ ...params }) -> SuppressionBulkCreateResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookTestResponse</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookResponse</code>
- <code title="get /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(webhookID) -> WebhookResponse</code>
- <code title="patch /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(webhookID, { ...params }) -> WebhookResponse</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookID) -> SuccessResponse</code>
- <code title="post /webhooks/{webhookId}/test">client.webhooks.<a href="./src/resources/webhooks.ts">test</a>(webhookID, { ...params }) -> WebhookTestResponse</code>

# Tracking

Types:

- <code><a href="./src/resources/tracking.ts">APIMeta</a></code>
- <code><a href="./src/resources/tracking.ts">TrackDomain</a></code>
- <code><a href="./src/resources/tracking.ts">TrackDomainResponse</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingListResponse</a></code>
- <code><a href="./src/resources/tracking.ts">TrackingVerifyResponse</a></code>

Methods:

- <code title="post /tracking">client.tracking.<a href="./src/resources/tracking.ts">create</a>({ ...params }) -> TrackDomainResponse</code>
- <code title="get /tracking/{trackingId}">client.tracking.<a href="./src/resources/tracking.ts">retrieve</a>(trackingID) -> TrackDomainResponse</code>
- <code title="patch /tracking/{trackingId}">client.tracking.<a href="./src/resources/tracking.ts">update</a>(trackingID, { ...params }) -> TrackDomainResponse</code>
- <code title="get /tracking">client.tracking.<a href="./src/resources/tracking.ts">list</a>() -> TrackingListResponse</code>
- <code title="delete /tracking/{trackingId}">client.tracking.<a href="./src/resources/tracking.ts">delete</a>(trackingID) -> SuccessResponse</code>
- <code title="post /tracking/{trackingId}/verify">client.tracking.<a href="./src/resources/tracking.ts">verify</a>(trackingID) -> TrackingVerifyResponse</code>
