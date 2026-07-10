"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CTAButton } from "@/components/ui";

export type NavItem = {
  href: string;
  label: string;
};

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--mf-radius-sm)] border border-[rgba(212,168,63,0.38)] text-[var(--mf-champagne)] transition hover:bg-[rgba(244,240,232,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mf-gold)]"
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {isOpen ? (
        <div className="absolute inset-x-0 top-full border-b border-[rgba(212,168,63,0.22)] bg-[rgba(7,7,7,0.98)] shadow-[0_18px_40px_rgba(0,0,0,0.32)]">
          <nav id="mobile-navigation" className="mf-container grid gap-2 py-4" aria-label="Điều hướng di động">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-[var(--mf-radius-sm)] px-3 py-3 text-sm font-medium text-[var(--mf-ivory)] transition hover:bg-[rgba(244,240,232,0.08)]"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Trang chủ
            </Link>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-[var(--mf-radius-sm)] px-3 py-3 text-sm font-medium text-[var(--mf-ivory)] transition hover:bg-[rgba(244,240,232,0.08)]"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 pt-2" onClick={closeMenu}>
              <CTAButton href="/contact" variant="gold">Đăng ký tư vấn 1:1</CTAButton>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
