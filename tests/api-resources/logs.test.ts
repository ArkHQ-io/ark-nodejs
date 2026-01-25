// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Ark from 'ark-email';

const client = new Ark({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource logs', () => {
  test('retrieve', async () => {
    const responsePromise = client.logs.retrieve('req_V8GGcdWYzgeWIHiI');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.logs.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.logs.list(
        {
          credentialId: 'credentialId',
          endDate: '2019-12-27T18:11:19.117Z',
          endpoint: 'endpoint',
          page: 1,
          perPage: 1,
          requestId: 'requestId',
          startDate: '2019-12-27T18:11:19.117Z',
          status: 'success',
          statusCode: 100,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Ark.NotFoundError);
  });
});
