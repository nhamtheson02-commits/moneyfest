import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Lỗi đăng nhập",
  description: "Không thể hoàn tất đăng nhập MONEYFEST.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const messages: Record<string, string> = {
  missing_oauth_config: "Đăng nhập mạng xã hội chưa được cấu hình. Vui lòng thử email/mật khẩu hoặc cấu hình OAuth trên môi trường deploy.",
  invalid_oauth_state: "Phiên đăng nhập đã hết hạn. Vui lòng thử lại.",
  oauth_denied: "Bạn đã hủy hoặc nhà cung cấp không cấp quyền đăng nhập.",
  oauth_failed: "Không thể hoàn tất đăng nhập mạng xã hội. Vui lòng thử lại.",
};

export default async function AuthErrorPage({ searchParams }: Props) {
  const params = await searchParams;
  const code = typeof params.error === "string" ? params.error : "oauth_failed";
  return (
    <PageShell>
      <section className="mx-auto max-w-xl px-4 py-16">
        <div className="mf-card p-6">
          <p className="mf-eyebrow">Tài khoản MONEYFEST</p>
          <h1 className="mf-display mt-3 text-3xl font-bold text-[var(--mf-midnight)]">Không thể đăng nhập</h1>
          <p className="mf-muted mt-3 leading-7">{messages[code] ?? messages.oauth_failed}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/auth/login" className="mf-btn mf-btn-primary">
              Quay lại đăng nhập
            </Link>
            <Link href="/auth/register" className="mf-btn mf-btn-secondary">
              Tạo tài khoản mới
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
