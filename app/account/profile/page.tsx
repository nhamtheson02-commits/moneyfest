import type { Metadata } from "next";
import { AuthForm, AuthField } from "@/components/auth-form";
import { requireUser } from "@/lib/auth";
import { updateProfileAction } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Hồ sơ tài khoản",
};

export const dynamic = "force-dynamic";

export default async function AccountProfilePage() {
  const user = await requireUser();
  return (
    <section className="max-w-xl">
      <h2 className="mf-display text-3xl font-bold text-[var(--mf-midnight)]">Hồ sơ cá nhân</h2>
      <p className="mf-muted mt-2 text-sm">Cập nhật tên hiển thị trong tài khoản MONEYFEST.</p>
      <div className="mt-6">
        <AuthForm action={updateProfileAction} submitLabel="Cập nhật">
          <AuthField label="Họ tên" name="name" autoComplete="name" defaultValue={user.name} />
        </AuthForm>
      </div>
      <p className="mf-muted mt-4 text-sm">Email đăng nhập: {user.email}</p>
    </section>
  );
}
