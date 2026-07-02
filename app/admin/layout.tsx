import Link from "next/link";
import { Emblem } from "@/components/ui";

const adminLinks = [
  ["/admin", "Dashboard"],
  ["/admin/leads", "Leads"],
  ["/admin/consultations", "Tư vấn"],
  ["/admin/ebooks", "Ebooks"],
  ["/admin/posts", "Posts"],
  ["/admin/categories", "Categories"],
  ["/admin/tags", "Tags"],
  ["/admin/tool-results", "Tool results"],
  ["/admin/users", "Users"],
  ["/admin/settings", "Settings"],
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--mf-surface)] lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-[var(--mf-border)] bg-[var(--mf-obsidian)] text-[var(--mf-ivory)] lg:block">
        <div className="sticky top-0 flex h-screen flex-col gap-6 p-5">
          <Link href="/admin" className="flex items-center gap-3">
            <Emblem className="h-10 w-10" />
            <div>
              <p className="mf-eyebrow">MONEYFEST nội bộ</p>
              <p className="text-sm text-[rgba(244,240,232,0.72)]">Khu vực vận hành nội bộ</p>
            </div>
          </Link>
          <nav className="grid gap-1 text-sm font-bold" aria-label="Điều hướng quản trị">
            {adminLinks.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-[var(--mf-radius-sm)] px-3 py-2 text-[var(--mf-champagne)] hover:bg-white/10 hover:text-[var(--mf-gold)]">
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="mt-auto rounded-[var(--mf-radius-sm)] px-3 py-2 text-sm font-bold text-[rgba(244,240,232,0.72)] hover:bg-white/10 hover:text-[var(--mf-champagne)]">
            Xem website
          </Link>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="border-b border-[var(--mf-border)] bg-white/85 backdrop-blur">
          <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-3">
              <details className="lg:hidden">
                <summary className="mf-btn mf-btn-secondary cursor-pointer list-none">Menu</summary>
                <nav className="absolute left-4 right-4 z-20 mt-2 grid gap-1 rounded-[var(--mf-radius-md)] border border-[var(--mf-border)] bg-[var(--mf-obsidian)] p-3 text-sm font-bold shadow-[var(--mf-shadow-md)]" aria-label="Điều hướng quản trị mobile">
                  {adminLinks.map(([href, label]) => (
                    <Link key={href} href={href} className="rounded-[var(--mf-radius-sm)] px-3 py-2 text-[var(--mf-champagne)] hover:bg-white/10">
                      {label}
                    </Link>
                  ))}
                  <Link href="/" className="rounded-[var(--mf-radius-sm)] px-3 py-2 text-[rgba(244,240,232,0.72)] hover:bg-white/10">Xem website</Link>
                </nav>
              </details>
              <div>
                <p className="mf-eyebrow">Admin Portal</p>
                <p className="text-sm font-bold text-[var(--mf-midnight)]">MONEYFEST Operations</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <form action="/admin/leads" className="flex min-w-0 rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white">
                <input name="q" aria-label="Search nhanh" placeholder="Search nhanh lead..." className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none" />
                <button className="px-3 py-2 text-sm font-bold text-[var(--mf-midnight)]">Search</button>
              </form>
              <div className="rounded-full border border-[var(--mf-border)] bg-[var(--mf-ivory)] px-3 py-2 text-xs font-bold text-[var(--mf-midnight)]">
                Admin Basic Auth
              </div>
              <div className="rounded-full border border-[var(--mf-border)] bg-white px-3 py-2 text-xs font-bold text-[var(--mf-midnight)]">
                Thông báo: 0
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
