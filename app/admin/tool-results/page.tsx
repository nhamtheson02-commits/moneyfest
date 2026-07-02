import type { Metadata } from "next";
import { AdminCard, AdminPageHeader, AdminTableShell, Pagination, SearchFilterBar } from "@/components/admin-ui";
import { getAdminToolResults } from "@/lib/admin-data";
import { parseFilter, parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kết quả công cụ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminToolResultsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const toolType = parseFilter(params.toolType);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminToolResults({ q, toolType, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  if (toolType) query.set("toolType", toolType);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Tool Results" description="Theo dõi kết quả quiz sức khỏe tài chính và công cụ dòng tiền." />
      <SearchFilterBar q={q} toolType={toolType} toolTypes={data.toolTypes} placeholder="Email hoặc kết quả" />
      <AdminCard title="Danh sách kết quả" description={`${data.meta.total} kết quả`}>
        <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có kết quả" emptyDescription="Kết quả sẽ xuất hiện khi user để lại email trong tools.">
          <table className="mf-table">
            <thead><tr><th>Công cụ</th><th>Email</th><th>Score</th><th>Kết quả</th><th>Thời gian</th></tr></thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.toolType}</td>
                  <td>{item.email || item.lead?.email || "Không có email"}</td>
                  <td>{item.score ?? "-"}</td>
                  <td className="max-w-lg whitespace-normal">{item.result}</td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminCard>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/tool-results" query={query} />
    </section>
  );
}
