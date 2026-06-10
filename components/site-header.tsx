"use client";

import Link from "next/link";

import { navLinks } from "@/lib/site-data";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-surface/70 px-4 py-3 shadow-panel backdrop-blur-xl">
          <Link href="#hero" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent text-sm font-bold text-white">
              AA
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Apex Automations</p>
              <p className="text-xs text-muted">Autonomous systems studio</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="#contact" className={buttonVariants({ size: "sm" })}>
            Book Free Strategy Call
          </Link>
        </div>
      </div>
    </header>
  );
}

