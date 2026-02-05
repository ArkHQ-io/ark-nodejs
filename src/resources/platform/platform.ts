// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from './webhooks';
import {
  WebhookCreateParams,
  WebhookCreateResponse,
  WebhookDeleteResponse,
  WebhookListDeliveriesParams,
  WebhookListDeliveriesResponse,
  WebhookListDeliveriesResponsesPageNumberPagination,
  WebhookListResponse,
  WebhookReplayDeliveryResponse,
  WebhookRetrieveDeliveryResponse,
  WebhookRetrieveResponse,
  WebhookTestParams,
  WebhookTestResponse,
  WebhookUpdateParams,
  WebhookUpdateResponse,
  Webhooks,
} from './webhooks';

export class Platform extends APIResource {
  webhooks: WebhooksAPI.Webhooks = new WebhooksAPI.Webhooks(this._client);
}

Platform.Webhooks = Webhooks;

export declare namespace Platform {
  export {
    Webhooks as Webhooks,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookListDeliveriesResponse as WebhookListDeliveriesResponse,
    type WebhookReplayDeliveryResponse as WebhookReplayDeliveryResponse,
    type WebhookRetrieveDeliveryResponse as WebhookRetrieveDeliveryResponse,
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookListDeliveriesResponsesPageNumberPagination as WebhookListDeliveriesResponsesPageNumberPagination,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListDeliveriesParams as WebhookListDeliveriesParams,
    type WebhookTestParams as WebhookTestParams,
  };
}
