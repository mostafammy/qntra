import { fetchDashboardStats, fetchRecentActivity } from "@/services/dashboard";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, ShoppingBag, AlertTriangle, Package } from "lucide-react";

export default async function DashboardPage() {
  // Parallel data fetching
  const [stats, activity] = await Promise.all([
    fetchDashboardStats(),
    fetchRecentActivity(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Dashboard Overview
        </h1>
        <p className="text-[var(--text-secondary)]">
          Welcome back to your command center.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          icon={ShoppingBag}
          trend="+5.2%"
          trendUp={true}
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStock}
          icon={AlertTriangle}
          trend={stats.lowStock > 0 ? "Action Needed" : "All Good"}
          trendUp={stats.lowStock === 0}
        />
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-[var(--accent-soft)] bg-[var(--surface-alt)]/30 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Recent Activity
          </h2>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="border-b border-[var(--accent-soft)] text-xs uppercase text-[var(--text-secondary)]/70">
              <tr>
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--accent-soft)]">
              {activity.map((item) => (
                <tr key={item.id} className="group">
                  <td className="py-4 font-medium text-[var(--text-primary)]">
                    {item.id.slice(-6)}...
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[var(--accent-soft)] flex items-center justify-center overflow-hidden text-[var(--accent)]">
                        {item.user.image ? (
                          <img
                            src={item.user.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs">
                            {item.user.name?.[0] || "?"}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-[var(--text-primary)]">
                          {item.user.name || "Guest"}
                        </div>
                        <div className="text-xs">{item.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === "PAID"
                          ? "bg-green-500/10 text-green-400"
                          : item.status === "PENDING"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-[var(--accent-soft)] text-[var(--text-primary)]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right font-medium text-[var(--text-primary)]">
                    ${item.total.toLocaleString()}
                  </td>
                </tr>
              ))}
              {activity.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-[var(--text-secondary)]/70"
                  >
                    No recent activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
