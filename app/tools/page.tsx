import type { Metadata } from "next";
import { PageShell } from "@/components/site-shell";
import { HeroSection } from "@/components/marketing";
import { ToolsLab } from "@/components/tools-lab";
import { SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Công cụ miễn phí",
  alternates: { canonical: "/tools" },
  description:
    "Công cụ miễn phí của MONEYFEST: bản đồ dòng tiền, kiểm tra sức khỏe tài chính, chân dung tiền bạc và kế hoạch cho mục tiêu của bạn.",
};

const steps = [
  { title: "Chọn điều bạn muốn làm rõ", text: "Mỗi công cụ trả lời một câu hỏi cụ thể về tiền của bạn, và chỉ mất 1–3 phút." },
  { title: "Trả lời vài câu đơn giản", text: "Từng bước một, có thanh tiến độ. Bạn có thể quay lại sửa bất cứ lúc nào." },
  { title: "Nhận kết quả và bước tiếp theo", text: "Kết quả hiện ngay trên màn hình, kèm gợi ý tài liệu hoặc tư vấn phù hợp." },
];

export default function ToolsPage() {
  return (
    <PageShell>
      <HeroSection
        title={<>Nhìn rõ tiền của mình <span className="text-[var(--mf-gold)]">chỉ trong vài phút.</span></>}
        description="Bốn công cụ ngắn gọn giúp bạn hiểu dòng tiền, nền tảng tài chính, cách mình ứng xử với tiền và con số cần có cho mục tiêu."
        image="/images/moneyfest/about/about-hero-ai.png"
        primary={{ href: "#lab", label: "Chọn công cụ" }}
        secondary={{ href: "/ebooks", label: "Xem ebook miễn phí" }}
        badges={["Miễn phí", "Vài phút", "Không cần đăng ký"]}
      />

      <section className="mf-cream-section py-12">
        <div className="mf-container">
          <SectionHeader title="Ba bước đơn giản" />
          <ol className="tl-steps mt-8">
            {steps.map((step, index) => (
              <li key={step.title} className="tl-step-item">
                <b>{index + 1}</b>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mf-muted mt-5 text-sm">
            Thông tin bạn nhập chỉ dùng để tính kết quả trên màn hình. MONEYFEST chỉ lưu kết quả khi bạn chủ động để lại email và đồng ý với Chính sách bảo mật.
          </p>
        </div>
      </section>

      <section id="lab" className="mf-dark-section scroll-mt-20 py-14">
        <div className="mf-container">
          <SectionHeader
            title="Bạn muốn làm rõ điều gì?"
            description="Chọn một thẻ để bắt đầu."
            tone="light"
          />
          <div className="mt-8">
            <ToolsLab />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
