import type { Metadata } from "next";
import Link from "next/link";
import { AuthField, AuthForm } from "@/components/auth-form";
import { PageShell } from "@/components/site-shell";
import { loginAction } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản MONEYFEST để xem ebook và kết quả công cụ đã lưu.",
};

export default function LoginPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-14">
        <p className="mf-eyebrow">Tài khoản MONEYFEST</p>
        <h1 className="mf-display mt-3 text-4xl font-bold text-[var(--mf-midnight)]">Đăng nhập</h1>
        <p className="mf-muted mt-3 text-sm">Sau khi đăng nhập, bạn sẽ được chuyển về trang tài khoản.</p>
        <div className="mt-6">
          <AuthForm action={loginAction} submitLabel="Đăng nhập">
            <AuthField label="Email" name="email" type="email" autoComplete="email" />
            <AuthField label="Mật khẩu" name="password" type="password" autoComplete="current-password" />
          </AuthForm>
        </div>
        <div className="mt-4 flex justify-between text-sm font-semibold">
          <Link href="/auth/register" className="text-[var(--mf-midnight)] hover:text-[var(--mf-gold)]">Tạo tài khoản</Link>
          <Link href="/auth/forgot-password" className="text-[var(--mf-midnight)] hover:text-[var(--mf-gold)]">Quên mật khẩu</Link>
        </div>
      </section>
    </PageShell>
  );
}
