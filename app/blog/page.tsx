import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/site-shell";
import { ArticleCard, CTASection, GoldButton, HeroSection, SectionTitle, icons } from "@/components/marketing";
import { articles, blogCategories, series } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
  description: "Góc nhìn Moneyfest giúp bạn hiểu luật chơi trước khi ra quyết định tài chính.",
};

export default function BlogPage() {
  const featured = articles[0];

  return (
    <PageShell>
      <HeroSection
        title={<>Góc nhìn giúp bạn hiểu luật chơi trước khi <span className="text-[var(--mf-gold)]">ra quyết định.</span></>}
        description="Moneyfest Blog chia sẻ những phân tích sâu nhưng dễ hiểu về tiền, sản phẩm tài chính, tâm lý tài chính và các quy tắc vận hành thị trường."
        image="/images/moneyfest/blog/blog-hero-ai.png"
        primary={{ href: "#featured", label: "Đọc bài nổi bật" }}
        secondary={{ href: "/ebooks", label: "Nhận ebook miễn phí" }}
        badges={["Phân tích dễ hiểu", "Quyết định có cân nhắc", "Có framework", "Ứng dụng được"]}
      />

      <section id="featured" className="mf-dark-section py-14">
        <div className="mf-container grid overflow-hidden rounded-[var(--mf-radius-lg)] border border-[var(--border-gold)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-full"><Image src={featured.image} alt={featured.title} fill quality={92} className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" /></div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <p className="mf-tag-dark w-fit">Bài viết nổi bật</p>
            <h2 className="mf-display mt-4 text-[clamp(2.2rem,4vw,4rem)] font-bold leading-tight">{featured.title}</h2>
            <p className="mt-4 text-[rgba(244,240,232,0.76)]">{featured.description}</p>
            <p className="mt-5 text-sm text-[rgba(244,240,232,0.65)]">{featured.readTime} · {featured.date}</p>
            <div className="mt-6"><GoldButton href="/blog">Đọc bài viết</GoldButton></div>
          </div>
        </div>
      </section>

      <section className="mf-cream-section py-12">
        <div className="mf-container">
          <div className="flex flex-wrap gap-3">
            {blogCategories.map((category, index) => (
              <span key={category} className={index === 0 ? "mf-btn mf-btn-primary" : "mf-btn border border-[var(--mf-border)] bg-white text-[var(--mf-midnight)]"}>{category}</span>
            ))}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-5 md:grid-cols-2">
              {articles.slice(1).map((article) => <ArticleCard key={article.title} article={article} />)}
            </div>
            <aside className="mf-card p-6">
              <h3 className="font-bold uppercase tracking-[0.12em] text-[var(--mf-midnight)]">Đọc nhiều tuần này</h3>
              <div className="mt-5 grid gap-5">
                {articles.slice(0, 3).map((article, index) => (
                  <div key={article.title} className="grid grid-cols-[56px_1fr] gap-4 border-b border-[rgba(7,21,33,0.1)] pb-4">
                    <span className="mf-display text-4xl font-bold text-[var(--mf-gold)]">0{index + 1}</span>
                    <div>
                      <p className="font-bold leading-snug text-[var(--mf-midnight)]">{article.title}</p>
                      <p className="mt-2 text-xs text-[var(--mf-slate)]">{article.readTime} · {article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mf-cream-section py-12">
        <div className="mf-container">
          <SectionTitle title="Series nổi bật" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {series.map((item) => (
              <div key={item.title} className="mf-card-dark p-6">
                <icons.compass className="text-[var(--mf-gold)]" />
                <h3 className="mf-display mt-4 text-3xl font-bold text-[var(--mf-gold)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[rgba(244,240,232,0.72)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Nhận bản tin Moneyfest mỗi tuần" description="Nhận góc nhìn chọn lọc, checklist thực hành và cập nhật bài viết mới nhất." primary="Đăng ký nhận tin" />
    </PageShell>
  );
}

