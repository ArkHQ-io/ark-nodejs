// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Ark } from '../client';

export abstract class APIResource {
  protected _client: Ark;

  constructor(client: Ark) {
    this._client = client;
  }
}
