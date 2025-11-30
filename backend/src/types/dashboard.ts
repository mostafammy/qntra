export interface DashboardStatsDTO {
  revenue: number;
  activeOrders: number;
  lowStock: number;
}

export interface RecentActivityItemDTO {
  id: string;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  total: number;
  status: string;
  createdAt: string; // JSON dates are strings
}

export interface DashboardDataDTO {
  stats: DashboardStatsDTO;
  recentActivity: RecentActivityItemDTO[];
}
