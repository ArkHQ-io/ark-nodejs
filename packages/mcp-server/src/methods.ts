// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.emails.retrieve',
    fullyQualifiedName: 'emails.retrieve',
    httpMethod: 'get',
    httpPath: '/emails/{emailId}',
  },
  {
    clientCallName: 'client.emails.list',
    fullyQualifiedName: 'emails.list',
    httpMethod: 'get',
    httpPath: '/emails',
  },
  {
    clientCallName: 'client.emails.retrieveDeliveries',
    fullyQualifiedName: 'emails.retrieveDeliveries',
    httpMethod: 'get',
    httpPath: '/emails/{emailId}/deliveries',
  },
  {
    clientCallName: 'client.emails.retry',
    fullyQualifiedName: 'emails.retry',
    httpMethod: 'post',
    httpPath: '/emails/{emailId}/retry',
  },
  {
    clientCallName: 'client.emails.send',
    fullyQualifiedName: 'emails.send',
    httpMethod: 'post',
    httpPath: '/emails',
  },
  {
    clientCallName: 'client.emails.sendBatch',
    fullyQualifiedName: 'emails.sendBatch',
    httpMethod: 'post',
    httpPath: '/emails/batch',
  },
  {
    clientCallName: 'client.emails.sendRaw',
    fullyQualifiedName: 'emails.sendRaw',
    httpMethod: 'post',
    httpPath: '/emails/raw',
  },
  {
    clientCallName: 'client.logs.retrieve',
    fullyQualifiedName: 'logs.retrieve',
    httpMethod: 'get',
    httpPath: '/logs/{requestId}',
  },
  {
    clientCallName: 'client.logs.list',
    fullyQualifiedName: 'logs.list',
    httpMethod: 'get',
    httpPath: '/logs',
  },
  {
    clientCallName: 'client.usage.retrieve',
    fullyQualifiedName: 'usage.retrieve',
    httpMethod: 'get',
    httpPath: '/usage',
  },
  {
    clientCallName: 'client.usage.export',
    fullyQualifiedName: 'usage.export',
    httpMethod: 'get',
    httpPath: '/usage/export',
  },
  {
    clientCallName: 'client.usage.listTenants',
    fullyQualifiedName: 'usage.listTenants',
    httpMethod: 'get',
    httpPath: '/usage/tenants',
  },
  {
    clientCallName: 'client.limits.retrieve',
    fullyQualifiedName: 'limits.retrieve',
    httpMethod: 'get',
    httpPath: '/limits',
  },
  {
    clientCallName: 'client.tenants.create',
    fullyQualifiedName: 'tenants.create',
    httpMethod: 'post',
    httpPath: '/tenants',
  },
  {
    clientCallName: 'client.tenants.retrieve',
    fullyQualifiedName: 'tenants.retrieve',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}',
  },
  {
    clientCallName: 'client.tenants.update',
    fullyQualifiedName: 'tenants.update',
    httpMethod: 'patch',
    httpPath: '/tenants/{tenantId}',
  },
  {
    clientCallName: 'client.tenants.list',
    fullyQualifiedName: 'tenants.list',
    httpMethod: 'get',
    httpPath: '/tenants',
  },
  {
    clientCallName: 'client.tenants.delete',
    fullyQualifiedName: 'tenants.delete',
    httpMethod: 'delete',
    httpPath: '/tenants/{tenantId}',
  },
  {
    clientCallName: 'client.tenants.credentials.create',
    fullyQualifiedName: 'tenants.credentials.create',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/credentials',
  },
  {
    clientCallName: 'client.tenants.credentials.retrieve',
    fullyQualifiedName: 'tenants.credentials.retrieve',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/credentials/{credentialId}',
  },
  {
    clientCallName: 'client.tenants.credentials.update',
    fullyQualifiedName: 'tenants.credentials.update',
    httpMethod: 'patch',
    httpPath: '/tenants/{tenantId}/credentials/{credentialId}',
  },
  {
    clientCallName: 'client.tenants.credentials.list',
    fullyQualifiedName: 'tenants.credentials.list',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/credentials',
  },
  {
    clientCallName: 'client.tenants.credentials.delete',
    fullyQualifiedName: 'tenants.credentials.delete',
    httpMethod: 'delete',
    httpPath: '/tenants/{tenantId}/credentials/{credentialId}',
  },
  {
    clientCallName: 'client.tenants.domains.create',
    fullyQualifiedName: 'tenants.domains.create',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/domains',
  },
  {
    clientCallName: 'client.tenants.domains.retrieve',
    fullyQualifiedName: 'tenants.domains.retrieve',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/domains/{domainId}',
  },
  {
    clientCallName: 'client.tenants.domains.list',
    fullyQualifiedName: 'tenants.domains.list',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/domains',
  },
  {
    clientCallName: 'client.tenants.domains.delete',
    fullyQualifiedName: 'tenants.domains.delete',
    httpMethod: 'delete',
    httpPath: '/tenants/{tenantId}/domains/{domainId}',
  },
  {
    clientCallName: 'client.tenants.domains.verify',
    fullyQualifiedName: 'tenants.domains.verify',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/domains/{domainId}/verify',
  },
  {
    clientCallName: 'client.tenants.suppressions.create',
    fullyQualifiedName: 'tenants.suppressions.create',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/suppressions',
  },
  {
    clientCallName: 'client.tenants.suppressions.retrieve',
    fullyQualifiedName: 'tenants.suppressions.retrieve',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/suppressions/{email}',
  },
  {
    clientCallName: 'client.tenants.suppressions.list',
    fullyQualifiedName: 'tenants.suppressions.list',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/suppressions',
  },
  {
    clientCallName: 'client.tenants.suppressions.delete',
    fullyQualifiedName: 'tenants.suppressions.delete',
    httpMethod: 'delete',
    httpPath: '/tenants/{tenantId}/suppressions/{email}',
  },
  {
    clientCallName: 'client.tenants.webhooks.create',
    fullyQualifiedName: 'tenants.webhooks.create',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/webhooks',
  },
  {
    clientCallName: 'client.tenants.webhooks.retrieve',
    fullyQualifiedName: 'tenants.webhooks.retrieve',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/webhooks/{webhookId}',
  },
  {
    clientCallName: 'client.tenants.webhooks.update',
    fullyQualifiedName: 'tenants.webhooks.update',
    httpMethod: 'patch',
    httpPath: '/tenants/{tenantId}/webhooks/{webhookId}',
  },
  {
    clientCallName: 'client.tenants.webhooks.list',
    fullyQualifiedName: 'tenants.webhooks.list',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/webhooks',
  },
  {
    clientCallName: 'client.tenants.webhooks.delete',
    fullyQualifiedName: 'tenants.webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/tenants/{tenantId}/webhooks/{webhookId}',
  },
  {
    clientCallName: 'client.tenants.webhooks.listDeliveries',
    fullyQualifiedName: 'tenants.webhooks.listDeliveries',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/webhooks/{webhookId}/deliveries',
  },
  {
    clientCallName: 'client.tenants.webhooks.replayDelivery',
    fullyQualifiedName: 'tenants.webhooks.replayDelivery',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}/replay',
  },
  {
    clientCallName: 'client.tenants.webhooks.retrieveDelivery',
    fullyQualifiedName: 'tenants.webhooks.retrieveDelivery',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/webhooks/{webhookId}/deliveries/{deliveryId}',
  },
  {
    clientCallName: 'client.tenants.webhooks.test',
    fullyQualifiedName: 'tenants.webhooks.test',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/webhooks/{webhookId}/test',
  },
  {
    clientCallName: 'client.tenants.tracking.create',
    fullyQualifiedName: 'tenants.tracking.create',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/tracking',
  },
  {
    clientCallName: 'client.tenants.tracking.retrieve',
    fullyQualifiedName: 'tenants.tracking.retrieve',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/tracking/{trackingId}',
  },
  {
    clientCallName: 'client.tenants.tracking.update',
    fullyQualifiedName: 'tenants.tracking.update',
    httpMethod: 'patch',
    httpPath: '/tenants/{tenantId}/tracking/{trackingId}',
  },
  {
    clientCallName: 'client.tenants.tracking.list',
    fullyQualifiedName: 'tenants.tracking.list',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/tracking',
  },
  {
    clientCallName: 'client.tenants.tracking.delete',
    fullyQualifiedName: 'tenants.tracking.delete',
    httpMethod: 'delete',
    httpPath: '/tenants/{tenantId}/tracking/{trackingId}',
  },
  {
    clientCallName: 'client.tenants.tracking.verify',
    fullyQualifiedName: 'tenants.tracking.verify',
    httpMethod: 'post',
    httpPath: '/tenants/{tenantId}/tracking/{trackingId}/verify',
  },
  {
    clientCallName: 'client.tenants.usage.retrieve',
    fullyQualifiedName: 'tenants.usage.retrieve',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/usage',
  },
  {
    clientCallName: 'client.tenants.usage.retrieveTimeseries',
    fullyQualifiedName: 'tenants.usage.retrieveTimeseries',
    httpMethod: 'get',
    httpPath: '/tenants/{tenantId}/usage/timeseries',
  },
  {
    clientCallName: 'client.platform.webhooks.create',
    fullyQualifiedName: 'platform.webhooks.create',
    httpMethod: 'post',
    httpPath: '/platform/webhooks',
  },
  {
    clientCallName: 'client.platform.webhooks.retrieve',
    fullyQualifiedName: 'platform.webhooks.retrieve',
    httpMethod: 'get',
    httpPath: '/platform/webhooks/{webhookId}',
  },
  {
    clientCallName: 'client.platform.webhooks.update',
    fullyQualifiedName: 'platform.webhooks.update',
    httpMethod: 'patch',
    httpPath: '/platform/webhooks/{webhookId}',
  },
  {
    clientCallName: 'client.platform.webhooks.list',
    fullyQualifiedName: 'platform.webhooks.list',
    httpMethod: 'get',
    httpPath: '/platform/webhooks',
  },
  {
    clientCallName: 'client.platform.webhooks.delete',
    fullyQualifiedName: 'platform.webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/platform/webhooks/{webhookId}',
  },
  {
    clientCallName: 'client.platform.webhooks.listDeliveries',
    fullyQualifiedName: 'platform.webhooks.listDeliveries',
    httpMethod: 'get',
    httpPath: '/platform/webhooks/deliveries',
  },
  {
    clientCallName: 'client.platform.webhooks.replayDelivery',
    fullyQualifiedName: 'platform.webhooks.replayDelivery',
    httpMethod: 'post',
    httpPath: '/platform/webhooks/deliveries/{deliveryId}/replay',
  },
  {
    clientCallName: 'client.platform.webhooks.retrieveDelivery',
    fullyQualifiedName: 'platform.webhooks.retrieveDelivery',
    httpMethod: 'get',
    httpPath: '/platform/webhooks/deliveries/{deliveryId}',
  },
  {
    clientCallName: 'client.platform.webhooks.test',
    fullyQualifiedName: 'platform.webhooks.test',
    httpMethod: 'post',
    httpPath: '/platform/webhooks/{webhookId}/test',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
