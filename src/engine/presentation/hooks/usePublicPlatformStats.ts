"use client";

/**
 * Telemetry response payload representing high-level public platform metrics.
 */
export interface PublicPlatformStatsResponse {
  /** Total count of active tenants provisioned across the platform */
  activeTenants: number;
  /** Number of active operational business modules */
  activeModules: number;
  /** Service level agreement uptime commitment indicator */
  uptimeSla: string;
}

const STATIC_STATS: PublicPlatformStatsResponse = {
  activeTenants: 1240,
  activeModules: 18,
  uptimeSla: "99.99%",
};

/**
 * Lightweight public platform stats hook for the standalone documentation portal.
 */
export function usePublicPlatformStats() {
  return { stats: STATIC_STATS, isLoading: false };
}
