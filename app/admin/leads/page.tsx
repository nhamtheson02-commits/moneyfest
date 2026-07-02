import type { Metadata } from "next";
import Link from "next/link";
import { AdminActionForm } from "@/components/admin-action-form";
import { AdminCard, AdminPageHeader, AdminTableShell, Pagination, SearchFilterBar, TextArea } from "@/components/admin-ui";
import { leadStatuses } from "@/lib/admin-constants";
import { getAdminLeads } from "@/lib/admin-data";
import { updateLeadAction } from "@/lib/admin-actions";
import { parseFilter, parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quản lý lead",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLeadsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const status = parseFilter(params.status);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminLeads({ q, status, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  if (status) query.set("status", status);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        title="Quản lý Lead"
        description="Search, cập nhật trạng thái pipeline, ghi chú và export CSV cho lead."
        action={<Link href={`/admin/leads/export?${query.toString()}`} className="mf-btn mf-btn-gold">Export CSV</Link>}
      />
      <SearchFilterBar q={q} status={status} statusOptions={leadStatuses} placeholder="Tên, email hoặc số điện thoại" />
      <AdminCard title="Danh sách lead" description={`${data.meta.total} lead`}>
        <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có lead" emptyDescription="Lead sẽ xuất hiện khi người dùng submit form.">
          <table className="mf-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Nguồn</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className="min-w-56">
                      <p className="font-bold text-[var(--mf-midnight)]">{lead.name}</p>
                      <p className="mf-muted text-xs">{lead.email}</p>
                      <p className="mf-muted text-xs">{lead.phone || "Chưa có SĐT"}</p>
                    </div>
                  </td>
                  <td>{lead.source}</td>
                  <td>
                    <AdminActionForm action={updateLeadAction} submitLabel="Cập nhật" submitVariant="secondary">
                      <input type="hidden" name="id" value={lead.id} />
                      <select name="status" defaultValue={lead.status} className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2">
                        {leadStatuses.map((item) => <option key={item} value={item}>{item}</option>)}
                      </select>
                      <TextArea label="Ghi chú" name="note" defaultValue={lead.note} rows={2} />
                    </AdminActionForm>
                  </td>
                  <td className="max-w-xs whitespace-normal">{lead.note || "Chưa có ghi chú"}</td>
                  <td>{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminCard>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/leads" query={query} />
    </section>
  );
}
