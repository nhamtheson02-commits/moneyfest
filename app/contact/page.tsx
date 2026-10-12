import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consultation-form";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Đăng ký tư vấn",
  alternates: { canonical: "/contact" },
  description: "Đăng ký tư vấn 1:1 với MONEYFEST về dòng tiền, bảo vệ tài chính và mục tiêu dài hạn.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mf-container grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            as="h1"
            eyebrow="Tư vấn"
            title="Đăng ký tư vấn 1:1"
            description="Hãy chia sẻ ngắn gọn điều bạn đang muốn làm rõ. MONEYFEST sẽ liên hệ để sắp xếp buổi trao đổi phù hợp với bạn."
          />
          <div className="mt-8 grid gap-3 text-sm">
            <p className="mf-info-alert">Phù hợp nếu bạn muốn xem xét lại dòng tiền, sắp xếp việc trả nợ, xây quỹ dự phòng hoặc lập kế hoạch 90 ngày.</p>
            <p className="mf-info-alert">Sau khi bạn gửi thông tin, đội ngũ MONEYFEST sẽ chủ động liên hệ lại để thống nhất thời gian.</p>
          </div>
        </div>
        <ConsultationForm />
      </section>
    </PageShell>
  );
}
