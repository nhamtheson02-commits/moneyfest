import Link from "next/link";
import { BookOpen, Calculator, CheckCircle2, Compass, LineChart, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { CTAButton, EbookCover, EmptyState, MotifCard, SectionHeader } from "@/components/ui";
import { getHomeData, services } from "@/lib/data";

export default async function Home() {
  const { ebooks, posts } = await getHomeData();

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-[var(--mf-obsidian)] text-[var(--mf-ivory)]">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full border border-[rgba(212,168,63,0.22)]" />
        <div className="absolute bottom-10 left-6 hidden h-44 w-44 rounded-full border border-[rgba(232,207,139,0.14)] md:block" />
        <div className="mf-container grid gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="relative flex flex-col justify-center">
            <p className="mf-eyebrow">Financial Wisdom Luxury</p>
            <h1 className="mf-display mt-5 max-w-4xl text-[clamp(3rem,8vw,5.8rem)] font-bold leading-[0.98]">
              Hiểu luật chơi, làm chủ cuộc đời.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(244,240,232,0.78)]">
              MONEYFEST giúp bạn hiểu tiền, hiểu bản thân và hiểu thế giới để có
              nhiều lựa chọn hơn trước những quyết định tài chính quan trọng.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/ebooks" variant="gold">Tải ebook miễn phí</CTAButton>
              <CTAButton href="/contact" variant="secondary">Đăng ký tư vấn 1:1</CTAButton>
            </div>
          </div>
          <div className="mf-card-dark relative grid gap-5 p-6">
            <div className="flex items-center justify-between">
              <p className="mf-eyebrow">Money Map</p>
              <Compass className="text-[var(--mf-gold)]" size={28} />
            </div>
            <p className="mf-display text-4xl font-bold leading-tight">
              Không mua nhanh hơn. Hiểu rõ hơn trước khi ra quyết định.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Bảo vệ", "Tích lũy", "Tăng trưởng", "Tự do"].map((item) => (
                <div key={item} className="rounded-[var(--mf-radius-md)] border border-[rgba(212,168,63,0.22)] bg-[rgba(244,240,232,0.06)] p-4">
                  <CheckCircle2 className="text-[var(--mf-champagne)]" size={20} />
                  <p className="mt-3 text-sm font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <SectionHeader
            eyebrow="Moneyfest là gì"
            title="Một hệ sinh thái dẫn đường cho quyết định tài chính."
            description="MONEYFEST kết hợp tri thức, công cụ và tư vấn cá nhân hóa để biến sự phức tạp thành sáng tỏ, rồi chuyển sáng tỏ thành bước hành động có trách nhiệm."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MotifCard icon={<Compass size={20} />} title="Hiểu hướng đi">
              Làm rõ dòng tiền, mục tiêu, rủi ro và nhu cầu thanh khoản trước khi chọn giải pháp.
            </MotifCard>
            <MotifCard icon={<ShieldCheck size={20} />} title="Bảo vệ trước">
              Ưu tiên quỹ dự phòng, bảo vệ gia đình và tránh quyết định nóng với tiền.
            </MotifCard>
            <MotifCard icon={<LineChart size={20} />} title="Tăng trưởng có hệ thống">
              Tích lũy và đầu tư dựa trên framework, không dựa trên FOMO hay lời hứa lợi nhuận.
            </MotifCard>
          </div>
        </div>
      </section>

      <section className="bg-[var(--mf-surface)] py-16">
        <div className="mf-container grid gap-8 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Vấn đề"
            title="Người dùng không thiếu thông tin. Họ thiếu một bản đồ đáng tin."
            description="Thu nhập ổn định nhưng vẫn mơ hồ trước bảo hiểm, tiết kiệm, nợ, đầu tư và những quyết định dài hạn cho gia đình."
          />
          <div className="grid gap-3">
            {[
              "Không biết nên ưu tiên bảo vệ, tích lũy hay tăng trưởng.",
              "Bị nhiễu bởi quá nhiều lời khuyên tài chính trái chiều.",
              "Muốn so sánh phương án khách quan trước khi chọn sản phẩm.",
              "Cần bước tiếp theo rõ ràng, không phải thêm áp lực.",
            ].map((item) => (
              <div key={item} className="mf-info-alert text-sm font-bold">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <SectionHeader eyebrow="Giải pháp" title="MONEYFEST bắt đầu từ hoàn cảnh, không bắt đầu từ sản phẩm." />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              "Đọc nền tảng",
              "Tải workbook",
              "Tự soi dòng tiền",
              "Tư vấn cá nhân hóa",
            ].map((item, index) => (
              <div key={item} className="mf-card p-5">
                <p className="mf-display text-3xl font-bold text-[var(--mf-gold)]">0{index + 1}</p>
                <p className="mt-4 font-bold text-[var(--mf-midnight)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--mf-midnight)] py-16 text-[var(--mf-ivory)]">
        <div className="mf-container">
          <SectionHeader
            eyebrow="Công cụ"
            title="Công cụ miễn phí nổi bật"
            description="Tính nhanh để biết mình đang đứng ở đâu trước khi tải workbook hoặc đặt lịch tư vấn."
            tone="light"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link href="/tools" className="mf-card p-6 transition hover:-translate-y-1">
              <Calculator className="text-[var(--mf-gold)]" />
              <h3 className="mf-display mt-4 text-2xl font-bold text-[var(--mf-midnight)]">Tính dòng tiền cá nhân</h3>
              <p className="mf-muted mt-2 text-sm">Nhập thu nhập, chi phí, nợ và tiết kiệm để xem dòng tiền tháng.</p>
            </Link>
            <Link href="/tools" className="mf-card p-6 transition hover:-translate-y-1">
              <BookOpen className="text-[var(--mf-gold)]" />
              <h3 className="mf-display mt-4 text-2xl font-bold text-[var(--mf-midnight)]">Quiz sức khỏe tài chính</h3>
              <p className="mf-muted mt-2 text-sm">Tự chấm điểm 5 trụ cột tài chính cá nhân trong 2 phút.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <SectionHeader eyebrow="Tài nguyên" title="Ebook miễn phí" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {ebooks.length ? ebooks.map((ebook) => (
              <Link key={ebook.id} href={`/ebooks/${ebook.slug}`} className="mf-card p-4 transition hover:-translate-y-1">
                <EbookCover title={ebook.title} subtitle={ebook.subtitle} />
                <h3 className="mt-4 font-bold text-[var(--mf-midnight)]">{ebook.title}</h3>
                <p className="mf-muted mt-2 text-sm">{ebook.subtitle}</p>
              </Link>
            )) : <div className="md:col-span-3"><EmptyState title="Chưa có ebook" description="Chạy npm run db:setup để nạp dữ liệu mẫu." /></div>}
          </div>
        </div>
      </section>

      <section className="bg-[var(--mf-surface)] py-16">
        <div className="mf-container">
          <SectionHeader eyebrow="Blog" title="Bài viết nổi bật" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.length ? posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="mf-card p-5 transition hover:-translate-y-1">
                <p className="mf-eyebrow">{post.category.name}</p>
                <h3 className="mf-display mt-3 text-2xl font-bold text-[var(--mf-midnight)]">{post.title}</h3>
                <p className="mf-muted mt-3 text-sm leading-6">{post.excerpt}</p>
              </Link>
            )) : <div className="md:col-span-3"><EmptyState title="Chưa có bài blog" description="Chạy npm run db:setup để nạp dữ liệu mẫu." /></div>}
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <SectionHeader eyebrow="Dịch vụ" title="Sản phẩm và dịch vụ Phase 1" />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="mf-card p-5">
                <p className="mf-badge">{service.status}</p>
                <h3 className="mt-4 font-bold text-[var(--mf-midnight)]">{service.title}</h3>
                <p className="mf-muted mt-2 text-sm">{service.description}</p>
                <p className="mt-4 font-bold text-[var(--mf-obsidian)]">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--mf-obsidian)] py-16 text-[var(--mf-ivory)]">
        <div className="mf-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mf-eyebrow">Bước tiếp theo</p>
            <h2 className="mf-display mt-2 text-4xl font-bold">Bạn muốn nhìn rõ bản đồ tài chính của mình?</h2>
            <p className="mt-3 max-w-2xl text-[rgba(244,240,232,0.76)]">
              Bắt đầu bằng ebook miễn phí hoặc gửi yêu cầu tư vấn. MONEYFEST sẽ giúp bạn có một bước tiếp theo rõ ràng.
            </p>
          </div>
          <CTAButton href="/contact" variant="gold">Đăng ký tư vấn 1:1</CTAButton>
        </div>
      </section>
    </PageShell>
  );
}
