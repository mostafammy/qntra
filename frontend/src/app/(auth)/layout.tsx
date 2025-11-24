import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(0,224,255,0.18),transparent_55%),var(--surface)] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col items-center justify-center">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-[#9aa5ce]"
        >
          Qyntra
        </Link>
        <section className="w-full rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-6 shadow-[0_45px_65px_rgba(2,8,23,0.5)]">
          {children}
        </section>
      </div>
    </div>
  );
}
