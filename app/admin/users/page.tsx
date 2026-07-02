import type { Metadata } from "next";
import { AdminCard, AdminPageHeader, AdminTableShell, Pagination, SearchFilterBar } from "@/components/admin-ui";
import { getAdminUsers } from "@/lib/admin-data";
import { parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quản lý users",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminUsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminUsers({ q, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Users đăng ký" description="Danh sách user đăng ký tài khoản MONEYFEST." />
      <SearchFilterBar q={q} placeholder="Tên, email hoặc role" />
      <AdminCard title="Danh sách users" description={`${data.meta.total} user`}>
        <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có user" emptyDescription="User sẽ xuất hiện khi đăng ký tài khoản.">
          <table className="mf-table">
            <thead><tr><th>User</th><th>Role</th><th>Session</th><th>Last login</th><th>Created</th></tr></thead>
            <tbody>
              {data.items.map((user) => (
                <tr key={user.id}>
                  <td>
                    <p className="font-bold">{user.name}</p>
                    <p className="mf-muted text-xs">{user.email}</p>
                  </td>
                  <td>{user.role}</td>
                  <td>{user._count.sessions}</td>
                  <td>{user.lastLogin ? formatDate(user.lastLogin) : "Chưa login"}</td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminCard>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/users" query={query} />
    </section>
  );
}
