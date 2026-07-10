import Image from "next/image";
import { PageShell } from "@/components/site-shell";
import { CTASection, GoldButton, HeroSection, IconBox, ProblemCard, ProblemChatIcon, ProblemGrowthIcon, ProblemMoneyIcon, ProblemPriorityIcon, ProblemSectionTitle, SectionTitle, Timeline, icons } from "@/components/marketing";
import { products } from "@/data/products";

const problems = [
  ["Thu nhập ổn định nhưng tài sản mơ hồ", "Đi làm nhiều năm nhưng chưa rõ mình đã tích lũy được gì và sẽ đạt tự do tài chính khi nào."],
  ["Không biết nên ưu tiên điều gì trước", "Nên trả nợ, tiết kiệm, mua bảo hiểm, đầu tư hay mua nhà trước? Làm sao để không hối tiếc?"],
  ["Nhiều thông tin nhưng rối hơn", "Nghe ai cũng có lý. Nhưng quyết định sai thì mình phải chịu."],
  ["Cần một kế hoạch phù hợp với mình", "Không phải công thức chung. Bạn cần một lộ trình phù hợp với thu nhập, mục tiêu và hoàn cảnh."],
];

export default function Home() {
  return (
    <PageShell>
      <HeroSection
        eyebrow="Moneyfest"
        title={<>Hiểu rõ tiền của bạn đang đi về đâu.</>}
        description="Moneyfest giúp bạn lập bản đồ dòng tiền, tài sản, rủi ro và mục tiêu tài chính — trước khi ra quyết định về tiết kiệm, nợ, bảo hiểm, đầu tư hay mua nhà."
        image="/images/moneyfest/hero/homepage-hero-ai.png"
        primary={{ href: "/contact", label: "Đặt lịch soi dòng tiền 1:1" }}
        secondary={{ href: "/tools", label: "Làm quiz sức khỏe tài chính" }}
        badges={["Không FOMO", "Không phím hàng", "Không cam kết lợi nhuận", "Bắt đầu từ hoàn cảnh của bạn"]}
      />

      <section className="mf-problem-section">
        <div className="mx-auto w-[min(100%-2rem,1200px)]">
          <ProblemSectionTitle>
            Bạn có đang gặp những vấn đề này?
          </ProblemSectionTitle>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {problems.map(([title, desc], index) => {
              const problemIcons = [<ProblemMoneyIcon key="money" />, <ProblemPriorityIcon key="priority" />, <ProblemChatIcon key="chat" />, <ProblemGrowthIcon key="growth" />];
              return <ProblemCard key={title} icon={problemIcons[index]} title={title}>{desc}</ProblemCard>;
            })}
          </div>
        </div>
      </section>

      <section className="money-map-service-section">
        <div className="money-map-service-inner">
          <div className="money-map-service-copy">
            <p className="mf-eyebrow">Dịch vụ chủ lực</p>
            <h2 className="mf-display mt-2 max-w-[520px] text-[clamp(1.8rem,2.35vw,2.45rem)] font-bold leading-[1.12] text-[var(--mf-ivory)]">
              Money Map 1:1 – Lập bản đồ tài chính cá nhân
            </h2>
            <p className="mt-3 max-w-[560px] text-[0.92rem] leading-6 text-[rgba(244,240,232,0.8)]">
              Một buổi làm việc riêng giúp bạn nhìn rõ bức tranh tài chính và xác định 3–5 bước ưu tiên trong 90 ngày tới.
            </p>
            <div className="mt-4 h-px max-w-[520px] bg-[rgba(212,168,63,0.45)]" />
            <ul className="mt-4 grid gap-2 text-[0.82rem] font-medium text-[rgba(244,240,232,0.9)]">
              {["Bản đồ dòng tiền: thu nhập – chi tiêu – tiết kiệm – nợ", "Chẩn đoán sức khỏe tài chính: điểm mạnh, điểm yếu, rủi ro", "Thứ tự ưu tiên 90 ngày: việc nào làm trước, việc nào chưa nên làm", "Gợi ý giải pháp và công cụ phù hợp với bạn"].map((item) => (
                <li key={item} className="flex items-start gap-2"><icons.check className="mt-0.5 text-[var(--mf-gold)]" size={15} />{item}</li>
              ))}
            </ul>
          </div>
          <div className="money-map-service-card">
            {[
              ["60 – 90 phút", "Online 1:1 với chuyên gia", icons.calendar],
              ["Phù hợp với", "Người đi làm, gia đình trẻ, muốn tối ưu tài chính", icons.users],
              ["Đầu tư", "Từ 1.500.000đ / buổi", icons.dollar],
            ].map(([title, desc, Icon]) => (
              <div key={title as string} className="money-map-service-row">
                <Icon className="money-map-service-icon" size={18} />
                <div>
                  <p className="text-[0.82rem] font-black text-[var(--mf-ivory)]">{title as string}</p>
                  <p className="mt-1 text-[0.72rem] leading-5 text-[rgba(244,240,232,0.68)]">{desc as string}</p>
                </div>
              </div>
            ))}
            <GoldButton href="/contact">Đặt lịch ngay</GoldButton>
          </div>
          <div className="money-map-service-art">
            <Image src="/images/moneyfest/hero/money-map-service-native.png" alt="" fill className="object-cover object-center" sizes="44vw" />
            <div className="money-map-service-art-fade" />
          </div>
        </div>
      </section>

      <section className="mf-cream-section py-14">
        <div className="mf-container">
          <SectionTitle eyebrow="Quy trình làm việc" title="Đơn giản – Rõ ràng – Hiệu quả" />
          <div className="mt-8"><Timeline items={["Đăng ký", "Chuẩn bị", "Buổi tư vấn 1:1", "Nhận Money Map"]} /></div>
        </div>
      </section>

      <section className="mf-cream-section py-14 mf-soft-divider">
        <div className="mf-container">
          <SectionTitle eyebrow="Sản phẩm & dịch vụ" title="Hệ sinh thái Moneyfest" />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {products.map((product) => (
              <div key={product.title} className="mf-card p-6">
                <icons.compass className="text-[var(--mf-gold)]" />
                <h3 className="mt-4 font-bold text-[var(--mf-midnight)]">{product.title}</h3>
                <p className="mf-muted mt-2 text-sm leading-6">{product.description}</p>
                <p className="mt-4 font-bold text-[var(--mf-gold)]">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-dark-section py-12">
        <div className="mf-container grid gap-6 md:grid-cols-4">
          {["Độc lập", "Minh bạch", "Cá nhân hóa", "Đồng hành"].map((title) => (
            <IconBox key={title} dark icon={<icons.shield />} title={title}>Đặt lợi ích của bạn lên trước và giúp bạn ra quyết định bình tĩnh hơn.</IconBox>
          ))}
        </div>
      </section>

      <CTASection title="Sẵn sàng nhìn rõ bức tranh tài chính và làm chủ tương lai của bạn?" description="Bắt đầu bằng quiz miễn phí hoặc một buổi tư vấn để có bước tiếp theo rõ ràng." />
    </PageShell>
  );
}

