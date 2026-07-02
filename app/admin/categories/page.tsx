import type { Metadata } from "next";
import { AdminActionForm } from "@/components/admin-action-form";
import { AdminCard, AdminPageHeader, AdminTableShell, Field, Pagination, SearchFilterBar, TextArea } from "@/components/admin-ui";
import { deleteCategoryAction, saveCategoryAction } from "@/lib/admin-actions";
import { getAdminCategories } from "@/lib/admin-data";
import { parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";

export const metadata: Metadata = {
  title: "Quản lý category",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminCategoriesPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminCategories({ q, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Quản lý Category" description="Tạo và chỉnh sửa category cho blog." />
      <SearchFilterBar q={q} placeholder="Tên hoặc slug" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Tạo category"><div className="p-4"><CategoryForm /></div></AdminCard>
        <AdminCard title="Danh sách category" description={`${data.meta.total} category`}>
          <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có category" emptyDescription="Tạo category đầu tiên.">
            <table className="mf-table">
              <thead><tr><th>Category</th><th>Bài viết</th><th>Sửa</th><th>Xóa</th></tr></thead>
              <tbody>
                {data.items.map((category) => (
                  <tr key={category.id}>
                    <td><p className="font-bold">{category.name}</p><p className="mf-muted text-xs">{category.slug}</p></td>
                    <td>{category._count.posts}</td>
                    <td className="min-w-[280px]"><CategoryForm category={category} /></td>
                    <td>
                      <AdminActionForm action={deleteCategoryAction} submitLabel="Xóa" submitVariant="secondary">
                        <input type="hidden" name="id" value={category.id} />
                      </AdminActionForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        </AdminCard>
      </div>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/categories" query={query} />
    </section>
  );
}

function CategoryForm({ category }: { category?: { id: string; name: string; slug: string; description: string | null } }) {
  return (
    <AdminActionForm action={saveCategoryAction} submitLabel={category ? "Lưu" : "Tạo"}>
      {category ? <input type="hidden" name="id" value={category.id} /> : null}
      <Field label="Name" name="name" defaultValue={category?.name} required />
      <Field label="Slug" name="slug" defaultValue={category?.slug} />
      <TextArea label="Description" name="description" defaultValue={category?.description} rows={2} />
    </AdminActionForm>
  );
}
