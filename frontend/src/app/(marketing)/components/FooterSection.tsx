"use client";

import Link from "next/link";

const currentYear = new Date().getFullYear();

const FooterSection: React.FC = () => (
  <footer className="narrative-section text-sm text-[#9aa5ce]/80">
    <div className="flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between justify-between">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#00E0FF] to-[#7209B7] text-sm font-semibold text-black">
          Q
        </span>
        <div>
          <p className="text-[#eef3ff]">Qyntra Studios</p>
          <p>
            © {currentYear} All rights reserved. Crafted for dreamers, builders,
            and explorers.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link href="#" className="hover:text-[#00E0FF]">
          Privacy
        </Link>
        <Link href="#" className="hover:text-[#00E0FF]">
          Terms
        </Link>
        <Link href="#" className="hover:text-[#00E0FF]">
          Support
        </Link>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#9aa5ce]/70">
          Made with ❤️
          <br />
          by Mostafa Yaser
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
