import type { Metadata } from "next";
import { AdminActionForm } from "@/components/admin-action-form";
import { AdminCard, AdminPageHeader, AdminTableShell, Pagination, SearchFilterBar } from "@/components/admin-ui";
import { consultationStatuses } from "@/lib/admin-constants";
import { updateConsultationAction } from "@/lib/admin-actions";
import { getAdminConsultations } from "@/lib/admin-data";
import { parseFilter, parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quản lý tư vấn",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminConsultationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const status = parseFilter(params.status);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminConsultations({ q, status, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  if (status) query.set("status", status);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Yêu cầu tư vấn" description="Search, filter và cập nhật trạng thái request tư vấn." />
      <SearchFilterBar q={q} status={status} statusOptions={consultationStatuses} placeholder="Tên, email, phone hoặc mục tiêu" />
      <AdminCard title="Danh sách yêu cầu" description={`${data.meta.total} yêu cầu`}>
        <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có yêu cầu" emptyDescription="Yêu cầu tư vấn sẽ xuất hiện khi form contact được submit.">
          <table className="mf-table">
            <thead><tr><th>Người gửi</th><th>Mục tiêu & message</th><th>Trạng thái</th><th>Thời gian</th></tr></thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p className="font-bold">{item.name}</p>
                    <p className="mf-muted text-xs">{item.email}</p>
                    <p className="mf-muted text-xs">{item.phone}</p>
                  </td>
                  <td className="max-w-lg whitespace-normal">
                    <p className="font-semibold">{item.financialGoal}</p>
                    <p className="mf-muted mt-1 text-sm">{item.message}</p>
                  </td>
                  <td>
                    <AdminActionForm action={updateConsultationAction} submitLabel="Cập nhật" submitVariant="secondary">
                      <input type="hidden" name="id" value={item.id} />
                      <select name="status" defaultValue={item.status} className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2">
                        {consultationStatuses.map((statusItem) => <option key={statusItem} value={statusItem}>{statusItem}</option>)}
                      </select>
                    </AdminActionForm>
                  </td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminCard>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/consultations" query={query} />
    </section>
  );
}
