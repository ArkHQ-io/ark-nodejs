// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Ark from 'ark-email';

const client = new Ark({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource usage', () => {
  test('retrieve', async () => {
    const responsePromise = client.tenants.usage.retrieve('cm6abc123def456');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tenants.usage.retrieve(
        'cm6abc123def456',
        { period: 'period', timezone: 'timezone' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Ark.NotFoundError);
  });

  test('retrieveTimeseries', async () => {
    const responsePromise = client.tenants.usage.retrieveTimeseries('cm6abc123def456');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveTimeseries: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tenants.usage.retrieveTimeseries(
        'cm6abc123def456',
        {
          granularity: 'hour',
          period: 'period',
          timezone: 'timezone',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Ark.NotFoundError);
  });
});
