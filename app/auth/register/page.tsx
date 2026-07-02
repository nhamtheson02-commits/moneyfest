import type { Metadata } from "next";
import Link from "next/link";
import { AuthField, AuthForm } from "@/components/auth-form";
import { PageShell } from "@/components/site-shell";
import { registerAction } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản MONEYFEST.",
};

export default function RegisterPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-14">
        <p className="mf-eyebrow">Tài khoản MONEYFEST</p>
        <h1 className="mf-display mt-3 text-4xl font-bold text-[var(--mf-midnight)]">Đăng ký</h1>
        <p className="mf-muted mt-3 text-sm">Tài khoản giúp bạn xem lại ebook đã tải và kết quả công cụ đã lưu.</p>
        <div className="mt-6">
          <AuthForm action={registerAction} submitLabel="Tạo tài khoản">
            <AuthField label="Họ tên" name="name" autoComplete="name" />
            <AuthField label="Email" name="email" type="email" autoComplete="email" />
            <AuthField label="Mật khẩu" name="password" type="password" autoComplete="new-password" />
          </AuthForm>
        </div>
        <p className="mt-4 text-sm font-semibold">
          Đã có tài khoản? <Link href="/auth/login" className="text-[var(--mf-gold)]">Đăng nhập</Link>
        </p>
      </section>
    </PageShell>
  );
}
