import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email không hợp lệ").transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  email: z.email("Email không hợp lệ").transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Email không hợp lệ").transform((value) => value.toLowerCase()),
});

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
});
