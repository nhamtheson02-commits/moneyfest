import type { Metadata } from "next";
import { AdminActionForm } from "@/components/admin-action-form";
import { AdminCard, AdminPageHeader, AdminTableShell, Field, Pagination, SearchFilterBar } from "@/components/admin-ui";
import { deleteTagAction, saveTagAction } from "@/lib/admin-actions";
import { getAdminTags } from "@/lib/admin-data";
import { parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";

export const metadata: Metadata = {
  title: "Quản lý tag",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminTagsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminTags({ q, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Quản lý Tag" description="Tạo và chỉnh sửa tag cho blog." />
      <SearchFilterBar q={q} placeholder="Tên hoặc slug" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Tạo tag"><div className="p-4"><TagForm /></div></AdminCard>
        <AdminCard title="Danh sách tag" description={`${data.meta.total} tag`}>
          <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có tag" emptyDescription="Tạo tag đầu tiên.">
            <table className="mf-table">
              <thead><tr><th>Tag</th><th>Bài viết</th><th>Sửa</th><th>Xóa</th></tr></thead>
              <tbody>
                {data.items.map((tag) => (
                  <tr key={tag.id}>
                    <td><p className="font-bold">{tag.name}</p><p className="mf-muted text-xs">{tag.slug}</p></td>
                    <td>{tag._count.posts}</td>
                    <td className="min-w-[260px]"><TagForm tag={tag} /></td>
                    <td>
                      <AdminActionForm action={deleteTagAction} submitLabel="Xóa" submitVariant="secondary">
                        <input type="hidden" name="id" value={tag.id} />
                      </AdminActionForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        </AdminCard>
      </div>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/tags" query={query} />
    </section>
  );
}

function TagForm({ tag }: { tag?: { id: string; name: string; slug: string } }) {
  return (
    <AdminActionForm action={saveTagAction} submitLabel={tag ? "Lưu" : "Tạo"}>
      {tag ? <input type="hidden" name="id" value={tag.id} /> : null}
      <Field label="Name" name="name" defaultValue={tag?.name} required />
      <Field label="Slug" name="slug" defaultValue={tag?.slug} />
    </AdminActionForm>
  );
}
