"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import type { NavLink } from "../types";

type NavigationProps = {
  links: NavLink[];
};

const Navigation: React.FC<NavigationProps> = ({ links }) => (
  <motion.nav
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-6 backdrop-blur-lg"
  >
    <Link
      href="#"
      className="glow-ring flex items-center gap-3"
      aria-label="Qyntra home"
    >
      <Image src="/images/logo.png" alt="Qyntra logo" width={80} height={50} />
      <span className="text-sm font-medium uppercase tracking-[0.35em] text-[#9aa5ce]">
        Qyntra
      </span>
    </Link>

    <div className="hidden items-center gap-8 text-sm font-medium text-[#9aa5ce] md:flex">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="transition-colors duration-200 hover:text-[#00E0FF]"
        >
          {link.label}
        </Link>
      ))}
    </div>

    <div className="flex items-center gap-4">
      <Link
        href="#"
        className="btn-outline hidden sm:inline-flex"
        aria-label="Open Qyntra journal"
      >
        Journal
      </Link>
      <Link
        href="/app"
        className="btn-primary"
        aria-label="Access Qyntra studio"
      >
        Launch Studio
      </Link>
    </div>
  </motion.nav>
);

export default Navigation;
