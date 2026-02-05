# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIMeta</a></code>

# Emails

Types:

- <code><a href="./src/resources/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailListResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailRetrieveDeliveriesResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailRetryResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendBatchResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendRawResponse</a></code>

Methods:

- <code title="get /emails/{emailId}">client.emails.<a href="./src/resources/emails.ts">retrieve</a>(emailID, { ...params }) -> EmailRetrieveResponse</code>
- <code title="get /emails">client.emails.<a href="./src/resources/emails.ts">list</a>({ ...params }) -> EmailListResponsesPageNumberPagination</code>
- <code title="get /emails/{emailId}/deliveries">client.emails.<a href="./src/resources/emails.ts">retrieveDeliveries</a>(emailID) -> EmailRetrieveDeliveriesResponse</code>
- <code title="post /emails/{emailId}/retry">client.emails.<a href="./src/resources/emails.ts">retry</a>(emailID) -> EmailRetryResponse</code>
- <code title="post /emails">client.emails.<a href="./src/resources/emails.ts">send</a>({ ...params }) -> EmailSendResponse</code>
- <code title="post /emails/batch">client.emails.<a href="./src/resources/emails.ts">sendBatch</a>({ ...params }) -> EmailSendBatchResponse</code>
- <code title="post /emails/raw">client.emails.<a href="./src/resources/emails.ts">sendRaw</a>({ ...params }) -> EmailSendRawResponse</code>

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

- <code><a href="./src/resources/usage.ts">EmailCounts</a></code>
- <code><a href="./src/resources/usage.ts">EmailRates</a></code>
- <code><a href="./src/resources/usage.ts">OrgUsageSummary</a></code>
- <code><a href="./src/resources/usage.ts">TenantUsageItem</a></code>
- <code><a href="./src/resources/usage.ts">UsagePeriod</a></code>
- <code><a href="./src/resources/usage.ts">UsageExportResponse</a></code>

Methods:

- <code title="get /usage">client.usage.<a href="./src/resources/usage.ts">retrieve</a>({ ...params }) -> OrgUsageSummary</code>
- <code title="get /usage/export">client.usage.<a href="./src/resources/usage.ts">export</a>({ ...params }) -> UsageExportResponse</code>
- <code title="get /usage/tenants">client.usage.<a href="./src/resources/usage.ts">listTenants</a>({ ...params }) -> TenantUsageItemsPageNumberPagination</code>

# Limits

Types:

- <code><a href="./src/resources/limits.ts">LimitsData</a></code>
- <code><a href="./src/resources/limits.ts">LimitRetrieveResponse</a></code>

Methods:

- <code title="get /limits">client.limits.<a href="./src/resources/limits.ts">retrieve</a>() -> LimitRetrieveResponse</code>

# Tenants

Types:

- <code><a href="./src/resources/tenants/tenants.ts">Tenant</a></code>
- <code><a href="./src/resources/tenants/tenants.ts">TenantCreateResponse</a></code>
- <code><a href="./src/resources/tenants/tenants.ts">TenantRetrieveResponse</a></code>
- <code><a href="./src/resources/tenants/tenants.ts">TenantUpdateResponse</a></code>
- <code><a href="./src/resources/tenants/tenants.ts">TenantDeleteResponse</a></code>

Methods:

- <code title="post /tenants">client.tenants.<a href="./src/resources/tenants/tenants.ts">create</a>({ ...params }) -> TenantCreateResponse</code>
- <code title="get /tenants/{tenantId}">client.tenants.<a href="./src/resources/tenants/tenants.ts">retrieve</a>(tenantID) -> TenantRetrieveResponse</code>
- <code title="patch /tenants/{tenantId}">client.tenants.<a href="./src/resources/tenants/tenants.ts">update</a>(tenantID, { ...params }) -> TenantUpdateResponse</code>
- <code title="get /tenants">client.tenants.<a href="./src/resources/tenants/tenants.ts">list</a>({ ...params }) -> TenantsPageNumberPagination</code>
- <code title="delete /tenants/{tenantId}">client.tenants.<a href="./src/resources/tenants/tenants.ts">delete</a>(tenantID) -> TenantDeleteResponse</code>

## Credentials

Types:

- <code><a href="./src/resources/tenants/credentials.ts">CredentialCreateResponse</a></code>
- <code><a href="./src/resources/tenants/credentials.ts">CredentialRetrieveResponse</a></code>
- <code><a href="./src/resources/tenants/credentials.ts">CredentialUpdateResponse</a></code>
- <code><a href="./src/resources/tenants/credentials.ts">CredentialListResponse</a></code>
- <code><a href="./src/resources/tenants/credentials.ts">CredentialDeleteResponse</a></code>

Methods:

- <code title="post /tenants/{tenantId}/credentials">client.tenants.credentials.<a href="./src/resources/tenants/credentials.ts">create</a>(tenantID, { ...params }) -> CredentialCreateResponse</code>
- <code title="get /tenants/{tenantId}/credentials/{credentialId}">client.tenants.credentials.<a href="./src/resources/tenants/credentials.ts">retrieve</a>(credentialID, { ...params }) -> CredentialRetrieveResponse</code>
- <code title="patch /tenants/{tenantId}/credentials/{credentialId}">client.tenants.credentials.<a href="./src/resources/tenants/credentials.ts">update</a>(credentialID, { ...params }) -> CredentialUpdateResponse</code>
- <code title="get /tenants/{tenantId}/credentials">client.tenants.credentials.<a href="./src/resources/tenants/credentials.ts">list</a>(tenantID, { ...params }) -> CredentialListResponsesPageNumberPagination</code>
- <code title="delete /tenants/{tenantId}/credentials/{credentialId}">client.tenants.credentials.<a href="./src/resources/tenants/credentials.ts">delete</a>(credentialID, { ...params }) -> CredentialDeleteResponse</code>

## Domains

Types:

- <code><a href="./src/resources/tenants/domains.ts">DNSRecord</a></code>
- <code><a href="./src/resources/tenants/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/tenants/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/tenants/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/tenants/domains.ts">DomainDeleteResponse</a></code>
- <code><a href="./src/resources/tenants/domains.ts">DomainVerifyResponse</a></code>

Methods:

- <code title="post /tenants/{tenantId}/domains">client.tenants.domains.<a href="./src/resources/tenants/domains.ts">create</a>(tenantID, { ...params }) -> DomainCreateResponse</code>
- <code title="get /tenants/{tenantId}/domains/{domainId}">client.tenants.domains.<a href="./src/resources/tenants/domains.ts">retrieve</a>(domainID, { ...params }) -> DomainRetrieveResponse</code>
- <code title="get /tenants/{tenantId}/domains">client.tenants.domains.<a href="./src/resources/tenants/domains.ts">list</a>(tenantID) -> DomainListResponse</code>
- <code title="delete /tenants/{tenantId}/domains/{domainId}">client.tenants.domains.<a href="./src/resources/tenants/domains.ts">delete</a>(domainID, { ...params }) -> DomainDeleteResponse</code>
- <code title="post /tenants/{tenantId}/domains/{domainId}/verify">client.tenants.domains.<a href="./src/resources/tenants/domains.ts">verify</a>(domainID, { ...params }) -> DomainVerifyResponse</code>

## Suppressions

Types:

- <code><a href="./src/resources/tenants/suppressions.ts">SuppressionCreateResponse</a></code>
- <code><a href="./src/resources/tenants/suppressions.ts">SuppressionRetrieveResponse</a></code>
- <code><a href="./src/resources/tenants/suppressions.ts">SuppressionListResponse</a></code>
- <code><a href="./src/resources/tenants/suppressions.ts">SuppressionDeleteResponse</a></code>

Methods:

- <code title="post /tenants/{tenantId}/suppressions">client.tenants.suppressions.<a href="./src/resources/tenants/suppressions.ts">create</a>(tenantID, { ...params }) -> SuppressionCreateResponse</code>
- <code title="get /tenants/{tenantId}/suppressions/{email}">client.tenants.suppressions.<a href="./src/resources/tenants/suppressions.ts">retrieve</a>(email, { ...params }) -> SuppressionRetrieveResponse</code>
- <code title="get /tenants/{tenantId}/suppressions">client.tenants.suppressions.<a href="./src/resources/tenants/suppressions.ts">list</a>(tenantID, { ...params }) -> SuppressionListResponsesPageNumberPagination</code>
- <code title="delete /tenants/{tenantId}/suppressions/{email}">client.tenants.suppressions.<a href="./src/resources/tenants/suppressions.ts">delete</a>(email, { ...params }) -> SuppressionDeleteResponse</code>

## Webhooks

Types:

- <code><a href="./src/resources/tenants/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookUpdateResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookDeleteResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookListDeliveriesResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookReplayDeliveryResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookRetrieveDeliveryResponse</a></code>
- <code><a href="./src/resources/tenants/webhooks.ts">WebhookTestResponse</a></code>

Methods:

- <code title="post /tenants/{tenantId}/webhooks">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">create</a>(tenantID, { ...params }) -> WebhookCreateResponse</code>
- <code title="get /tenants/{tenantId}/webhooks/{webhookId}">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">retrieve</a>(webhookID, { ...params }) -> WebhookRetrieveResponse</code>
- <code title="patch /tenants/{tenantId}/webhooks/{webhookId}">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">update</a>(webhookID, { ...params }) -> WebhookUpdateResponse</code>
- <code title="get /tenants/{tenantId}/webhooks">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">list</a>(tenantID) -> WebhookListResponse</code>
- <code title="delete /tenants/{tenantId}/webhooks/{webhookId}">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">delete</a>(webhookID, { ...params }) -> WebhookDeleteResponse</code>
- <code title="get /tenants/{tenantId}/webhooks/{webhookId}/deliveries">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">listDeliveries</a>(webhookID, { ...params }) -> WebhookListDeliveriesResponse</code>
- <code title="post /tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}/replay">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">replayDelivery</a>(deliveryID, { ...params }) -> WebhookReplayDeliveryResponse</code>
- <code title="get /tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">retrieveDelivery</a>(deliveryID, { ...params }) -> WebhookRetrieveDeliveryResponse</code>
- <code title="post /tenants/{tenantId}/webhooks/{webhookId}/test">client.tenants.webhooks.<a href="./src/resources/tenants/webhooks.ts">test</a>(webhookID, { ...params }) -> WebhookTestResponse</code>

## Tracking

Types:

- <code><a href="./src/resources/tenants/tracking.ts">TrackDomain</a></code>
- <code><a href="./src/resources/tenants/tracking.ts">TrackingCreateResponse</a></code>
- <code><a href="./src/resources/tenants/tracking.ts">TrackingRetrieveResponse</a></code>
- <code><a href="./src/resources/tenants/tracking.ts">TrackingUpdateResponse</a></code>
- <code><a href="./src/resources/tenants/tracking.ts">TrackingListResponse</a></code>
- <code><a href="./src/resources/tenants/tracking.ts">TrackingDeleteResponse</a></code>
- <code><a href="./src/resources/tenants/tracking.ts">TrackingVerifyResponse</a></code>

Methods:

- <code title="post /tenants/{tenantId}/tracking">client.tenants.tracking.<a href="./src/resources/tenants/tracking.ts">create</a>(tenantID, { ...params }) -> TrackingCreateResponse</code>
- <code title="get /tenants/{tenantId}/tracking/{trackingId}">client.tenants.tracking.<a href="./src/resources/tenants/tracking.ts">retrieve</a>(trackingID, { ...params }) -> TrackingRetrieveResponse</code>
- <code title="patch /tenants/{tenantId}/tracking/{trackingId}">client.tenants.tracking.<a href="./src/resources/tenants/tracking.ts">update</a>(trackingID, { ...params }) -> TrackingUpdateResponse</code>
- <code title="get /tenants/{tenantId}/tracking">client.tenants.tracking.<a href="./src/resources/tenants/tracking.ts">list</a>(tenantID) -> TrackingListResponse</code>
- <code title="delete /tenants/{tenantId}/tracking/{trackingId}">client.tenants.tracking.<a href="./src/resources/tenants/tracking.ts">delete</a>(trackingID, { ...params }) -> TrackingDeleteResponse</code>
- <code title="post /tenants/{tenantId}/tracking/{trackingId}/verify">client.tenants.tracking.<a href="./src/resources/tenants/tracking.ts">verify</a>(trackingID, { ...params }) -> TrackingVerifyResponse</code>

## Usage

Types:

- <code><a href="./src/resources/tenants/usage.ts">TenantUsage</a></code>
- <code><a href="./src/resources/tenants/usage.ts">TenantUsageTimeseries</a></code>
- <code><a href="./src/resources/tenants/usage.ts">UsageRetrieveResponse</a></code>
- <code><a href="./src/resources/tenants/usage.ts">UsageRetrieveTimeseriesResponse</a></code>

Methods:

- <code title="get /tenants/{tenantId}/usage">client.tenants.usage.<a href="./src/resources/tenants/usage.ts">retrieve</a>(tenantID, { ...params }) -> UsageRetrieveResponse</code>
- <code title="get /tenants/{tenantId}/usage/timeseries">client.tenants.usage.<a href="./src/resources/tenants/usage.ts">retrieveTimeseries</a>(tenantID, { ...params }) -> UsageRetrieveTimeseriesResponse</code>
