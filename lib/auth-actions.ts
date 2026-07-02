"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createUserSession, destroyUserSession, hashPassword, requireUser, verifyPassword } from "@/lib/auth";
import { forgotPasswordSchema, loginSchema, profileUpdateSchema, registerSchema } from "@/lib/auth-validation";
import { revalidatePath } from "next/cache";

type AuthActionState = {
  ok: boolean;
  message: string;
};

function formToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

const invalidState: AuthActionState = {
  ok: false,
  message: "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại.",
};

export async function loginAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse(formToObject(formData));
  if (!parsed.success) return invalidState;
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return { ok: false, message: "Email hoặc mật khẩu chưa đúng." };
  }
  await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
  await createUserSession(user.id);
  redirect("/account");
}

export async function registerAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse(formToObject(formData));
  if (!parsed.success) return invalidState;
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { ok: false, message: "Email này đã có tài khoản. Vui lòng đăng nhập." };
  }
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: hashPassword(parsed.data.password),
    },
  });
  await createUserSession(user.id);
  redirect("/account");
}

export async function forgotPasswordAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse(formToObject(formData));
  if (!parsed.success) return invalidState;
  return {
    ok: true,
    message: "Nếu email tồn tại, MONEYFEST sẽ gửi hướng dẫn đặt lại mật khẩu khi email workflow được kích hoạt.",
  };
}

export async function logoutAction() {
  await destroyUserSession();
  redirect("/auth/login");
}

export async function updateProfileAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const user = await requireUser();
  const parsed = profileUpdateSchema.safeParse(formToObject(formData));
  if (!parsed.success) return invalidState;
  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });
  revalidatePath("/account");
  revalidatePath("/account/profile");
  return { ok: true, message: "Đã cập nhật hồ sơ." };
}
