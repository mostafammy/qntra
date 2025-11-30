import { fetchAnalyticsData } from "@/services/dashboard";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";

export default async function AnalyticsPage() {
  const data = await fetchAnalyticsData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Analytics
        </h1>
        <p className="text-[var(--text-secondary)]">
          Analyze your business performance.
        </p>
      </div>

      <AnalyticsChart data={data} />

      {/* Placeholder for more charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-64 rounded-xl border border-[var(--accent-soft)] bg-[var(--surface-alt)]/30 p-6 flex items-center justify-center text-[var(--text-secondary)]/70">
          Pie Chart (Coming Soon)
        </div>
        <div className="h-64 rounded-xl border border-[var(--accent-soft)] bg-[var(--surface-alt)]/30 p-6 flex items-center justify-center text-[var(--text-secondary)]/70">
          Bar Chart (Coming Soon)
        </div>
      </div>
    </div>
  );
}
