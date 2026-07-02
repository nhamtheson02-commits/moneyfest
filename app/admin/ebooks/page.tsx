import type { Metadata } from "next";
import { AdminActionForm } from "@/components/admin-action-form";
import { AdminCard, AdminPageHeader, AdminTableShell, Field, Pagination, SearchFilterBar, TextArea } from "@/components/admin-ui";
import { deleteEbookAction, saveEbookAction } from "@/lib/admin-actions";
import { getAdminEbooks } from "@/lib/admin-data";
import { parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quản lý ebook",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminEbooksPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminEbooks({ q, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Quản lý Ebook" description="Tạo, sửa và archive ebook hiển thị trên website public." />
      <SearchFilterBar q={q} placeholder="Tiêu đề, slug hoặc mô tả ngắn" />
      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <AdminCard title="Tạo ebook mới" description="Slug có thể để trống để tự tạo từ title.">
          <div className="p-4">
            <EbookForm />
          </div>
        </AdminCard>
        <AdminCard title="Danh sách ebook" description={`${data.meta.total} ebook`}>
          <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có ebook" emptyDescription="Tạo ebook đầu tiên bằng form bên trái.">
            <table className="mf-table">
              <thead>
                <tr>
                  <th>Ebook</th>
                  <th>Meta</th>
                  <th>Sửa</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((ebook) => (
                  <tr key={ebook.id}>
                    <td>
                      <p className="font-bold text-[var(--mf-midnight)]">{ebook.title}</p>
                      <p className="mf-muted text-xs">{ebook.slug}</p>
                      <p className="mf-muted mt-1 max-w-sm whitespace-normal text-xs">{ebook.subtitle}</p>
                    </td>
                    <td>
                      <p>{ebook.pages} trang</p>
                      <p className="mf-muted text-xs">{ebook.level} - {ebook.status}</p>
                      <p className="mf-muted text-xs">{ebook.accessLevel}</p>
                      <p className="mf-muted text-xs">{formatDate(ebook.createdAt)}</p>
                    </td>
                    <td className="min-w-[380px]">
                      <EbookForm ebook={ebook} compact />
                    </td>
                    <td>
                      <AdminActionForm action={deleteEbookAction} submitLabel="Xóa/archive" submitVariant="secondary">
                        <input type="hidden" name="id" value={ebook.id} />
                      </AdminActionForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        </AdminCard>
      </div>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/ebooks" query={query} />
    </section>
  );
}

function EbookForm({
  ebook,
  compact = false,
}: {
  ebook?: {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    previewContent: string | null;
    level: string;
    pages: number;
    coverColor: string;
    accessLevel: string;
    status: string;
    price: number | null;
    fileUrl: string | null;
    isFree: boolean;
    isFeatured: boolean;
  };
  compact?: boolean;
}) {
  return (
    <AdminActionForm action={saveEbookAction} submitLabel={ebook ? "Lưu ebook" : "Tạo ebook"}>
      {ebook ? <input type="hidden" name="id" value={ebook.id} /> : null}
      <div className={compact ? "grid gap-2" : "grid gap-3 md:grid-cols-2"}>
        <Field label="Title" name="title" defaultValue={ebook?.title} required />
        <Field label="Slug" name="slug" defaultValue={ebook?.slug} />
        <Field label="Subtitle" name="subtitle" defaultValue={ebook?.subtitle} required />
        <Field label="Level" name="level" defaultValue={ebook?.level ?? "Người mới"} required />
        <Field label="Pages" name="pages" type="number" defaultValue={ebook?.pages ?? 24} required />
        <Field label="Cover color" name="coverColor" defaultValue={ebook?.coverColor ?? "obsidian"} required />
        <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
          Access level
          <select
            name="accessLevel"
            defaultValue={ebook?.accessLevel ?? "FREE"}
            className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base"
          >
            <option value="FREE">FREE</option>
            <option value="PAID">PAID</option>
            <option value="MEMBERSHIP">MEMBERSHIP</option>
          </select>
        </label>
        <Field label="Status" name="status" defaultValue={ebook?.status ?? "draft"} required />
        <Field label="Price" name="price" type="number" defaultValue={ebook?.price ?? 0} />
        <Field label="File URL" name="fileUrl" defaultValue={ebook?.fileUrl ?? ""} />
      </div>
      <TextArea label="Description" name="description" defaultValue={ebook?.description} rows={compact ? 2 : 4} required />
      <TextArea label="Preview content" name="previewContent" defaultValue={ebook?.previewContent ?? ""} rows={compact ? 2 : 3} />
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        <label><input type="checkbox" name="isFree" defaultChecked={ebook?.isFree ?? true} /> Miễn phí</label>
        <label><input type="checkbox" name="isFeatured" defaultChecked={ebook?.isFeatured ?? false} /> Featured</label>
      </div>
    </AdminActionForm>
  );
}
