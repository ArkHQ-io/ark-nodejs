// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Ark from 'ark-email';

const client = new Ark({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource domains', () => {
  test('create: only required params', async () => {
    const responsePromise = client.tenants.domains.create('cm6abc123def456', {
      name: 'notifications.myapp.com',
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
    const response = await client.tenants.domains.create('cm6abc123def456', {
      name: 'notifications.myapp.com',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.tenants.domains.retrieve('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.tenants.domains.retrieve('123', { tenantId: 'cm6abc123def456' });
  });

  test('list', async () => {
    const responsePromise = client.tenants.domains.list('cm6abc123def456');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.tenants.domains.delete('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.tenants.domains.delete('123', { tenantId: 'cm6abc123def456' });
  });

  test('verify: only required params', async () => {
    const responsePromise = client.tenants.domains.verify('123', { tenantId: 'cm6abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('verify: required and optional params', async () => {
    const response = await client.tenants.domains.verify('123', { tenantId: 'cm6abc123def456' });
  });
});
