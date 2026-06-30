import Link from "next/link";
import { MobileMenu, type NavItem } from "@/components/mobile-menu";
import { BrandMark, Emblem } from "@/components/ui";

const navItems: NavItem[] = [
  { href: "/ebooks", label: "Ebook" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Công cụ" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/contact", label: "Liên hệ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(212,168,63,0.22)] bg-[rgba(7,7,7,0.92)] backdrop-blur">
      <div className="mf-container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="MONEYFEST trang chủ">
          <BrandMark priority className="hidden w-40 sm:block" />
          <Emblem className="sm:hidden" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold text-[var(--mf-ivory)] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--mf-champagne)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="mf-btn mf-btn-gold hidden sm:inline-flex">
          Đăng ký tư vấn 1:1
        </Link>
        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[rgba(212,168,63,0.24)] bg-[var(--mf-obsidian)] text-[var(--mf-ivory)]">
      <div className="mf-container grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandMark className="w-44" />
          <p className="mt-4 max-w-md text-sm leading-6 text-[rgba(244,240,232,0.72)]">
            MONEYFEST giúp khách hàng hiểu luật chơi tài chính, so sánh lựa chọn và ra
            quyết định bình tĩnh hơn trước khi chọn giải pháp.
          </p>
        </div>
        <div>
          <p className="mf-eyebrow">Khám phá</p>
          <div className="mt-4 grid gap-2 text-sm text-[rgba(244,240,232,0.72)]">
            {navItems.slice(0, 5).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--mf-champagne)]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mf-eyebrow">Nguyên tắc</p>
          <p className="mt-4 text-sm leading-6 text-[rgba(244,240,232,0.72)]">
            Không FOMO. Không phím hàng. Không cam kết lợi nhuận. Moneyfest bắt đầu từ
            hoàn cảnh, mục tiêu và mức chịu rủi ro của bạn.
          </p>
          <p className="mt-4 text-sm leading-6 text-[rgba(244,240,232,0.72)]">
            Nội dung trên MONEYFEST chỉ nhằm mục đích giáo dục và tham khảo, không phải
            lời khuyên tài chính, đầu tư hoặc pháp lý cá nhân.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[rgba(244,240,232,0.72)]">
            <Link href="/privacy" className="hover:text-[var(--mf-champagne)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--mf-champagne)]">Terms</Link>
            <Link href="/disclaimer" className="hover:text-[var(--mf-champagne)]">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
