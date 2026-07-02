import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ebook của tôi",
};

export const dynamic = "force-dynamic";

export default async function AccountEbooksPage() {
  const user = await requireUser();
  const [downloads, accessGrants] = await Promise.all([
    prisma.ebookDownload.findMany({
      where: { lead: { email: user.email } },
      include: { ebook: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.ebookAccess.findMany({
      where: { userId: user.id },
      include: { ebook: true },
      orderBy: { grantedAt: "desc" },
    }),
  ]);

  return (
    <div className="grid gap-8">
      <section>
        <h2 className="mf-display text-3xl font-bold text-[var(--mf-midnight)]">Ebook đã tải</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {downloads.length ? downloads.map((item) => (
            <Link key={item.id} href={`/ebooks/${item.ebook.slug}`} className="mf-card p-5 transition hover:-translate-y-1">
              <p className="font-bold text-[var(--mf-midnight)]">{item.ebook.title}</p>
              <p className="mf-muted mt-2 text-sm">{item.ebook.subtitle}</p>
              <p className="mf-muted mt-4 text-xs">Tải ngày {formatDate(item.createdAt)}</p>
            </Link>
          )) : (
            <div className="mf-card p-5">
              <p className="font-bold">Chưa có ebook đã tải</p>
              <p className="mf-muted mt-2 text-sm">Khi bạn tải ebook, lịch sử sẽ xuất hiện ở đây.</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <h2 className="mf-display text-3xl font-bold text-[var(--mf-midnight)]">Ebook có quyền truy cập</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {accessGrants.length ? accessGrants.map((item) => (
            <Link key={item.id} href={`/ebooks/${item.ebook.slug}`} className="mf-card p-5 transition hover:-translate-y-1">
              <p className="font-bold text-[var(--mf-midnight)]">{item.ebook.title}</p>
              <p className="mf-muted mt-2 text-sm">{item.ebook.subtitle}</p>
              <p className="mf-muted mt-4 text-xs">Quyền {item.accessType} từ {formatDate(item.grantedAt)}</p>
            </Link>
          )) : (
            <div className="mf-card p-5">
              <p className="font-bold">Chưa có quyền riêng</p>
              <p className="mf-muted mt-2 text-sm">Admin có thể cấp quyền ebook trả phí cho tài khoản này.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
