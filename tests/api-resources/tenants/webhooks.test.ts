// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Ark from 'ark-email';

const client = new Ark({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhooks', () => {
  test('create: only required params', async () => {
    const responsePromise = client.tenants.webhooks.create('cm6abc123def456', {
      name: 'My App Webhook',
      url: 'https://myapp.com/webhooks/email',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.tenants.webhooks.create('cm6abc123def456', {
      name: 'My App Webhook',
      url: 'https://myapp.com/webhooks/email',
      allEvents: true,
      enabled: true,
      events: ['MessageSent', 'MessageDeliveryFailed', 'MessageBounced'],
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.tenants.webhooks.retrieve('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.tenants.webhooks.retrieve('123', { tenantId: 'cm6abc123def456' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.tenants.webhooks.update('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.tenants.webhooks.update('123', {
      tenantId: 'cm6abc123def456',
      allEvents: true,
      enabled: true,
      events: ['string'],
      name: 'name',
      url: 'https://example.com',
    });
  });

  test('list', async () => {
    const responsePromise = client.tenants.webhooks.list('cm6abc123def456');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.tenants.webhooks.delete('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.tenants.webhooks.delete('123', { tenantId: 'cm6abc123def456' });
  });

  test('listDeliveries: only required params', async () => {
    const responsePromise = client.tenants.webhooks.listDeliveries('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listDeliveries: required and optional params', async () => {
    const response = await client.tenants.webhooks.listDeliveries('123', {
      tenantId: 'cm6abc123def456',
      after: 0,
      before: 0,
      event: 'MessageSent',
      page: 1,
      perPage: 1,
      success: true,
    });
  });

  test('replayDelivery: only required params', async () => {
    const responsePromise = client.tenants.webhooks.replayDelivery('whr_abc123def456', {
      tenantId: 'cm6abc123def456',
      webhookId: '123',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replayDelivery: required and optional params', async () => {
    const response = await client.tenants.webhooks.replayDelivery('whr_abc123def456', {
      tenantId: 'cm6abc123def456',
      webhookId: '123',
    });
  });

  test('retrieveDelivery: only required params', async () => {
    const responsePromise = client.tenants.webhooks.retrieveDelivery('whr_abc123def456', {
      tenantId: 'cm6abc123def456',
      webhookId: '123',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveDelivery: required and optional params', async () => {
    const response = await client.tenants.webhooks.retrieveDelivery('whr_abc123def456', {
      tenantId: 'cm6abc123def456',
      webhookId: '123',
    });
  });

  test('test: only required params', async () => {
    const responsePromise = client.tenants.webhooks.test('123', {
      tenantId: 'cm6abc123def456',
      event: 'MessageSent',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('test: required and optional params', async () => {
    const response = await client.tenants.webhooks.test('123', {
      tenantId: 'cm6abc123def456',
      event: 'MessageSent',
    });
  });
});
