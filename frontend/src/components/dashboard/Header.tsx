"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";

export function Header({ user }: { user: any }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--accent-soft)] bg-[var(--surface-alt)]/50 px-6 backdrop-blur-md">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link
          href="/app"
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          Home
        </Link>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <div key={href} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-[var(--text-primary)] font-medium">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">{user?.email}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User size={20} />
          )}
        </div>
      </div>
    </header>
  );
}
