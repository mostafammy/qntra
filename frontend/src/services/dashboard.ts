import { DashboardStatsDTO, RecentActivityItemDTO } from "@/types/dashboard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchDashboardStats(): Promise<DashboardStatsDTO> {
  const res = await fetch(`${API_URL}/dashboard/stats`, {
    cache: "no-store", // Ensure fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
}

export async function fetchRecentActivity(): Promise<RecentActivityItemDTO[]> {
  const res = await fetch(`${API_URL}/dashboard/activity`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recent activity");
  }

  return res.json();
}

export interface AnalyticsDataPoint {
  date: string;
  revenue: number;
}

export async function fetchAnalyticsData(): Promise<AnalyticsDataPoint[]> {
  const res = await fetch(`${API_URL}/dashboard/analytics`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics data");
  }

  return res.json();
}
