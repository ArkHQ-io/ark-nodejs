// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Ark from 'ark-email';

const client = new Ark({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tracking', () => {
  test('create: only required params', async () => {
    const responsePromise = client.tenants.tracking.create('cm6abc123def456', {
      domainId: 123,
      name: 'track',
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
    const response = await client.tenants.tracking.create('cm6abc123def456', {
      domainId: 123,
      name: 'track',
      sslEnabled: true,
      trackClicks: true,
      trackOpens: true,
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.tenants.tracking.retrieve('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.tenants.tracking.retrieve('123', { tenantId: 'cm6abc123def456' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.tenants.tracking.update('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.tenants.tracking.update('123', {
      tenantId: 'cm6abc123def456',
      excludedClickDomains: 'example.com,mysite.org',
      sslEnabled: true,
      trackClicks: true,
      trackOpens: true,
    });
  });

  test('list', async () => {
    const responsePromise = client.tenants.tracking.list('cm6abc123def456');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.tenants.tracking.delete('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.tenants.tracking.delete('123', { tenantId: 'cm6abc123def456' });
  });

  test('verify: only required params', async () => {
    const responsePromise = client.tenants.tracking.verify('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('verify: required and optional params', async () => {
    const response = await client.tenants.tracking.verify('123', { tenantId: 'cm6abc123def456' });
  });
});
