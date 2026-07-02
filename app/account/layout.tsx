import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { logoutAction } from "@/lib/auth-actions";
import { requireUser } from "@/lib/auth";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-[var(--mf-border)] pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mf-eyebrow">Tài khoản</p>
            <h1 className="mf-display mt-2 text-3xl font-bold text-[var(--mf-midnight)]">{user.name}</h1>
            <p className="mf-muted text-sm">{user.email}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-bold">
            <Link href="/account" className="text-[var(--mf-midnight)] hover:text-[var(--mf-gold)]">Tổng quan</Link>
            <Link href="/account/profile" className="text-[var(--mf-midnight)] hover:text-[var(--mf-gold)]">Hồ sơ</Link>
            <Link href="/account/ebooks" className="text-[var(--mf-midnight)] hover:text-[var(--mf-gold)]">Ebook</Link>
            <form action={logoutAction}><button className="mf-btn mf-btn-secondary">Đăng xuất</button></form>
          </nav>
        </div>
        {children}
      </section>
    </PageShell>
  );
}
