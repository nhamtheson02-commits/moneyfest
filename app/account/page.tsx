import type { Metadata } from "next";
import Link from "next/link";
import { StatCard } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tài khoản",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireUser();
  const [downloads, toolResults, consultations, accessGrants] = await Promise.all([
    prisma.ebookDownload.findMany({
      where: { lead: { email: user.email } },
      include: { ebook: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.toolResult.findMany({ where: { email: user.email }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.consultationRequest.findMany({ where: { email: user.email }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.ebookAccess.findMany({
      where: { userId: user.id },
      include: { ebook: true },
      orderBy: { grantedAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Ebook đã tải" value={downloads.length} />
        <StatCard label="Loại tài khoản" value={user.accountType} />
        <StatCard label="Quiz/công cụ" value={toolResults.length} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <AccountCard title="Ebook gần đây">
          {downloads.length ? downloads.map((item) => (
            <Link key={item.id} href={`/ebooks/${item.ebook.slug}`} className="block border-b border-[var(--mf-border)] py-3 last:border-b-0">
              <p className="font-bold">{item.ebook.title}</p>
              <p className="mf-muted text-xs">{formatDate(item.createdAt)}</p>
            </Link>
          )) : <p className="mf-muted text-sm">Chưa có ebook đã tải.</p>}
        </AccountCard>
        <AccountCard title="Quyền truy cập">
          {accessGrants.length ? accessGrants.map((item) => (
            <Link key={item.id} href={`/ebooks/${item.ebook.slug}`} className="block border-b border-[var(--mf-border)] py-3 last:border-b-0">
              <p className="font-bold">{item.ebook.title}</p>
              <p className="mf-muted text-xs">{item.accessType} - {formatDate(item.grantedAt)}</p>
            </Link>
          )) : <p className="mf-muted text-sm">Chưa có ebook được cấp quyền riêng.</p>}
        </AccountCard>
        <AccountCard title="Kết quả công cụ">
          {toolResults.length ? toolResults.map((item) => (
            <div key={item.id} className="border-b border-[var(--mf-border)] py-3 last:border-b-0">
              <p className="font-bold">{item.toolType} {item.score != null ? `- ${item.score}` : ""}</p>
              <p className="mf-muted text-xs">{item.result}</p>
            </div>
          )) : <p className="mf-muted text-sm">Chưa có kết quả đã lưu.</p>}
        </AccountCard>
        <AccountCard title={`Tư vấn (${consultations.length})`}>
          {consultations.length ? consultations.map((item) => (
            <div key={item.id} className="border-b border-[var(--mf-border)] py-3 last:border-b-0">
              <p className="font-bold">{item.financialGoal}</p>
              <p className="mf-muted text-xs">{item.status} - {formatDate(item.createdAt)}</p>
            </div>
          )) : <p className="mf-muted text-sm">Chưa có yêu cầu tư vấn.</p>}
        </AccountCard>
      </div>
    </div>
  );
}

function AccountCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mf-card p-5">
      <h2 className="font-bold text-[var(--mf-midnight)]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
