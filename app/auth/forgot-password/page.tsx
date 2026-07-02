import type { Metadata } from "next";
import Link from "next/link";
import { AuthField, AuthForm } from "@/components/auth-form";
import { PageShell } from "@/components/site-shell";
import { forgotPasswordAction } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Yêu cầu hướng dẫn đặt lại mật khẩu MONEYFEST.",
};

export default function ForgotPasswordPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-14">
        <p className="mf-eyebrow">Tài khoản MONEYFEST</p>
        <h1 className="mf-display mt-3 text-4xl font-bold text-[var(--mf-midnight)]">Quên mật khẩu</h1>
        <p className="mf-muted mt-3 text-sm">Phase 1 ghi nhận yêu cầu an toàn, chưa gửi email reset tự động.</p>
        <div className="mt-6">
          <AuthForm action={forgotPasswordAction} submitLabel="Gửi yêu cầu">
            <AuthField label="Email" name="email" type="email" autoComplete="email" />
          </AuthForm>
        </div>
        <Link href="/auth/login" className="mt-4 inline-flex text-sm font-semibold text-[var(--mf-gold)]">Quay lại đăng nhập</Link>
      </section>
    </PageShell>
  );
}
