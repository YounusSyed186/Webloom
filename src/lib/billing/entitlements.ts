import { FeatureKey, PlanId } from '@/types';
import { checkEntitlement, getPlan } from './plans';

export interface EntitlementCheckResult {
  authorized: boolean;
  status: 200 | 403;
  error?: string;
  limit?: number | 'unlimited';
}

/**
 * Server-side entitlement validation to prevent client-side authorization bypass.
 * Never trust client claims regarding subscription status.
 */
export function enforceEntitlement(
  planId: string | undefined,
  featureKey: FeatureKey,
  currentUsageCount?: number
): EntitlementCheckResult {
  const safePlanId: PlanId = (planId as PlanId) || 'free';
  const result = checkEntitlement(safePlanId, featureKey, currentUsageCount);

  if (!result.allowed) {
    return {
      authorized: false,
      status: 403,
      error: result.reason || `Action requires upgrade from ${getPlan(safePlanId).name}.`,
      limit: result.limit,
    };
  }

  return {
    authorized: true,
    status: 200,
    limit: result.limit,
  };
}

