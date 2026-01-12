// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Ark from 'ark';

const client = new Ark({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.emails.retrieve('emailId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.emails.retrieve(
        'emailId',
        { expand: 'content,deliveries' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Ark.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.emails.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.emails.list(
        {
          after: 'after',
          before: 'before',
          from: 'dev@stainless.com',
          page: 1,
          perPage: 1,
          status: 'queued',
          tag: 'tag',
          to: 'dev@stainless.com',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Ark.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getDeliveries', async () => {
    const responsePromise = client.emails.getDeliveries('emailId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retry', async () => {
    const responsePromise = client.emails.retry('emailId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.emails.send({
      from: 'Acme <hello@acme.com>',
      subject: 'Hello World',
      to: ['user@example.com'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: required and optional params', async () => {
    const response = await client.emails.send({
      from: 'Acme <hello@acme.com>',
      subject: 'Hello World',
      to: ['user@example.com'],
      attachments: [
        {
          content: 'content',
          contentType: 'application/pdf',
          filename: 'filename',
        },
      ],
      bcc: ['dev@stainless.com'],
      cc: ['dev@stainless.com'],
      headers: { foo: 'string' },
      html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
      replyTo: 'dev@stainless.com',
      tag: 'tag',
      text: 'text',
      'Idempotency-Key': 'user_123_order_456',
    });
  });

  // Prism tests are disabled
  test.skip('sendBatch: only required params', async () => {
    const responsePromise = client.emails.sendBatch({
      emails: [
        { subject: 'Hello Alice', to: ['alice@example.com'] },
        { subject: 'Hello Bob', to: ['bob@example.com'] },
      ],
      from: 'notifications@myapp.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('sendBatch: required and optional params', async () => {
    const response = await client.emails.sendBatch({
      emails: [
        {
          subject: 'Hello Alice',
          to: ['alice@example.com'],
          html: '<p>Hi Alice, your order is ready!</p>',
          tag: 'order-ready',
          text: 'text',
        },
        {
          subject: 'Hello Bob',
          to: ['bob@example.com'],
          html: '<p>Hi Bob, your order is ready!</p>',
          tag: 'order-ready',
          text: 'text',
        },
      ],
      from: 'notifications@myapp.com',
      'Idempotency-Key': 'user_123_order_456',
    });
  });

  // Prism tests are disabled
  test.skip('sendRaw: only required params', async () => {
    const responsePromise = client.emails.sendRaw({
      data: 'data',
      mailFrom: 'dev@stainless.com',
      rcptTo: ['dev@stainless.com'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('sendRaw: required and optional params', async () => {
    const response = await client.emails.sendRaw({
      data: 'data',
      mailFrom: 'dev@stainless.com',
      rcptTo: ['dev@stainless.com'],
    });
  });
});
