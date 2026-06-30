import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SafeBlogContent } from "@/components/safe-blog-content";
import { PageShell } from "@/components/site-shell";
import { getPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="mf-eyebrow">
          {post.category.name} / {formatDate(post.publishedAt)} / {post.readTime} phút đọc
        </p>
        <h1 className="mf-display mt-3 text-[clamp(2.3rem,6vw,4rem)] font-bold leading-tight text-[var(--mf-midnight)]">{post.title}</h1>
        <p className="mf-muted mt-4 text-lg leading-8">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag.id} className="mf-tag">{tag.name}</span>
          ))}
        </div>
        <SafeBlogContent content={post.content} />
      </article>
    </PageShell>
  );
}
