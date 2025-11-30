"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Cookies from "js-cookie";

const SIDEBAR_COOKIE_NAME = "sidebar:state";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedState = Cookies.get(SIDEBAR_COOKIE_NAME);
    if (savedState) {
      setIsCollapsed(savedState === "true");
    }
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    Cookies.set(SIDEBAR_COOKIE_NAME, String(newState), { expires: 365 });
  };

  if (!isMounted) {
    return null; // or a skeleton to prevent hydration mismatch
  }

  const links = [
    { href: "/app", label: "Dashboard", icon: LayoutDashboard },
    { href: "/app/products", label: "Products", icon: Package },
    { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/app/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-[var(--accent-soft)] bg-[var(--surface-alt)]/50 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <span className="text-lg font-bold text-[var(--text-primary)]">
            Qyntra
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)] transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2 p-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
