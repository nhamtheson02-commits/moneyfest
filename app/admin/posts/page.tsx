import type { Metadata } from "next";
import { AdminActionForm } from "@/components/admin-action-form";
import { AdminCard, AdminPageHeader, AdminTableShell, Field, Pagination, SearchFilterBar, TextArea } from "@/components/admin-ui";
import { deletePostAction, savePostAction } from "@/lib/admin-actions";
import { getAdminPosts } from "@/lib/admin-data";
import { parsePage, parsePageSize, parseSearch } from "@/lib/admin-utils";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quản lý bài viết",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminPostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = parseSearch(params.q);
  const page = parsePage(params.page);
  const pageSize = parsePageSize(params.pageSize);
  const data = await getAdminPosts({ q, page, pageSize });
  const query = new URLSearchParams();
  if (q) query.set("q", q);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader title="Quản lý Blog Post" description="CRUD bài viết, category và tag cho blog public." />
      <SearchFilterBar q={q} placeholder="Tiêu đề, slug hoặc excerpt" />
      <div className="mt-6 grid gap-6 2xl:grid-cols-[0.9fr_1.1fr]">
        <AdminCard title="Tạo bài viết" description="Nội dung public vẫn được render qua SafeBlogContent.">
          <div className="p-4">
            <PostForm categories={data.categories} tags={data.tags} />
          </div>
        </AdminCard>
        <AdminCard title="Danh sách bài viết" description={`${data.meta.total} bài viết`}>
          <AdminTableShell hasRows={data.items.length > 0} emptyTitle="Chưa có bài viết" emptyDescription="Tạo bài đầu tiên bằng form bên trái.">
            <table className="mf-table">
              <thead>
                <tr>
                  <th>Bài viết</th>
                  <th>Taxonomy</th>
                  <th>Sửa nhanh</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <p className="font-bold text-[var(--mf-midnight)]">{post.title}</p>
                      <p className="mf-muted text-xs">{post.slug}</p>
                      <p className="mf-muted mt-1 max-w-sm whitespace-normal text-xs">{post.excerpt}</p>
                      <p className="mf-muted mt-1 text-xs">{formatDate(post.publishedAt)}</p>
                    </td>
                    <td>
                      <p>{post.category.name}</p>
                      <p className="mf-muted text-xs">{post.status}</p>
                      <p className="mf-muted max-w-48 whitespace-normal text-xs">
                        {post.tags.map((tag) => tag.name).join(", ") || "Chưa có tag"}
                      </p>
                    </td>
                    <td className="min-w-[420px]">
                      <PostForm post={post} categories={data.categories} tags={data.tags} compact />
                    </td>
                    <td>
                      <AdminActionForm action={deletePostAction} submitLabel="Xóa" submitVariant="secondary">
                        <input type="hidden" name="id" value={post.id} />
                      </AdminActionForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        </AdminCard>
      </div>
      <Pagination page={data.meta.page} pageCount={data.meta.pageCount} basePath="/admin/posts" query={query} />
    </section>
  );
}

type CategoryOption = { id: string; name: string };
type TagOption = { id: string; name: string };
type PostFormPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  readTime: number;
  coverColor: string;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  isFeatured: boolean;
  tags: TagOption[];
};

function PostForm({
  post,
  categories,
  tags,
  compact = false,
}: {
  post?: PostFormPost;
  categories: CategoryOption[];
  tags: TagOption[];
  compact?: boolean;
}) {
  const selectedTagIds = new Set(post?.tags.map((tag) => tag.id) ?? []);
  return (
    <AdminActionForm action={savePostAction} submitLabel={post ? "Lưu bài" : "Tạo bài"}>
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className={compact ? "grid gap-2" : "grid gap-3 md:grid-cols-2"}>
        <Field label="Title" name="title" defaultValue={post?.title} required />
        <Field label="Slug" name="slug" defaultValue={post?.slug} />
        <Field label="Read time" name="readTime" type="number" defaultValue={post?.readTime ?? 5} required />
        <Field label="Cover color" name="coverColor" defaultValue={post?.coverColor ?? "midnight"} required />
        <Field label="Status" name="status" defaultValue={post?.status ?? "draft"} required />
        <Field label="SEO title" name="seoTitle" defaultValue={post?.seoTitle ?? ""} />
      </div>
      <TextArea label="SEO description" name="seoDescription" defaultValue={post?.seoDescription} rows={2} />
      <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
        Category
        <select name="categoryId" defaultValue={post?.categoryId ?? categories[0]?.id} required className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base">
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <TextArea label="Excerpt" name="excerpt" defaultValue={post?.excerpt} rows={compact ? 2 : 3} required />
      <TextArea label="Content" name="content" defaultValue={post?.content} rows={compact ? 4 : 8} required />
      <div className="grid gap-2">
        <p className="text-sm font-semibold text-[var(--mf-midnight)]">Tags</p>
        <div className="flex flex-wrap gap-3 text-sm">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-1">
              <input type="checkbox" name="tagIds" value={tag.id} defaultChecked={selectedTagIds.has(tag.id)} />
              {tag.name}
            </label>
          ))}
        </div>
      </div>
      <label className="text-sm font-semibold"><input type="checkbox" name="isFeatured" defaultChecked={post?.isFeatured ?? false} /> Featured</label>
    </AdminActionForm>
  );
}
