"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center">
      <div className="rounded-full bg-red-500/10 p-4 text-red-500">
        <AlertTriangle size={48} />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">
        Something went wrong!
      </h2>
      <p className="mt-2 text-[var(--text-secondary)]">
        We couldn't load the dashboard data. The backend might be unreachable.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-[var(--text-primary)] px-6 py-2 font-medium text-[var(--surface)] transition hover:opacity-90"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-[var(--accent-soft)] px-6 py-2 font-medium text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
