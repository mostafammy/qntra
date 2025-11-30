export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-48 rounded-lg bg-[var(--accent-soft)]"></div>
        <div className="mt-2 h-4 w-64 rounded-lg bg-[var(--surface-alt)]/50"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 rounded-xl border border-[var(--accent-soft)] bg-[var(--surface-alt)]/30 p-6"
          >
            <div className="flex justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-[var(--accent-soft)]"></div>
                <div className="h-8 w-32 rounded bg-[var(--accent-soft)]"></div>
              </div>
              <div className="h-10 w-10 rounded-lg bg-[var(--accent-soft)]"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-96 rounded-xl border border-[var(--accent-soft)] bg-[var(--surface-alt)]/30 p-6">
        <div className="mb-6 flex justify-between">
          <div className="h-6 w-32 rounded bg-[var(--accent-soft)]"></div>
          <div className="h-4 w-16 rounded bg-[var(--accent-soft)]"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-4">
              <div className="h-4 w-16 rounded bg-[var(--accent-soft)]"></div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[var(--accent-soft)]"></div>
                <div className="space-y-1">
                  <div className="h-3 w-24 rounded bg-[var(--accent-soft)]"></div>
                  <div className="h-2 w-32 rounded bg-[var(--surface-alt)]/50"></div>
                </div>
              </div>
              <div className="h-6 w-16 rounded-full bg-[var(--accent-soft)]"></div>
              <div className="h-4 w-16 rounded bg-[var(--accent-soft)]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
