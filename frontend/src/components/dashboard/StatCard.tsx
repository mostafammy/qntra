import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--accent-soft)] bg-[var(--surface-alt)]/30 p-6 shadow-sm transition-all hover:bg-[var(--accent-soft)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
            {value}
          </h3>
        </div>
        <div className="rounded-lg bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
          <Icon size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span
            className={`font-medium ${
              trendUp ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend}
          </span>
          <span className="text-[var(--text-secondary)]/70">vs last month</span>
        </div>
      )}
    </div>
  );
}
