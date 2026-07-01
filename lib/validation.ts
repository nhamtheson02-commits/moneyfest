import { z } from "zod";

const honeypotSchema = z.string().optional();
const consentSchema = z.boolean().refine((value) => value === true, {
  message: "Vui lòng đồng ý với Chính sách bảo mật",
});
const optionalEmailSchema = z.union([z.literal(""), z.email("Email không hợp lệ")]).optional();
const phoneOptionalSchema = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || /^[0-9+\-\s().]{8,20}$/.test(value), {
    message: "Số điện thoại chưa hợp lệ",
  });

const attributionFields = {
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  landing_page: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),
};

export const ebookDownloadSchema = z.object({
  ebookSlug: z.string().min(1),
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  email: z.email("Email không hợp lệ"),
  phone: phoneOptionalSchema,
  consentGiven: consentSchema,
  company: honeypotSchema,
  ...attributionFields,
});

export const consultationSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  email: z.email("Email không hợp lệ"),
  phone: z.string().trim().regex(/^[0-9+\-\s().]{8,20}$/, "Số điện thoại chưa hợp lệ"),
  financialGoal: z.string().min(3, "Vui lòng chọn mục tiêu"),
  message: z.string().min(10, "Hãy chia sẻ ngắn gọn nhu cầu của bạn"),
  consentGiven: consentSchema,
  company: honeypotSchema,
  ...attributionFields,
});

export const cashflowSchema = z
  .object({
    email: optionalEmailSchema,
    consentGiven: z.boolean().optional(),
    company: honeypotSchema,
    income: z.coerce.number().min(0),
    fixedExpense: z.coerce.number().min(0),
    flexibleExpense: z.coerce.number().min(0),
    debtPayment: z.coerce.number().min(0),
    saving: z.coerce.number().min(0),
  })
  .refine((value) => !value.email || value.consentGiven === true, {
    message: "Vui lòng đồng ý với Chính sách bảo mật nếu muốn lưu kết quả",
    path: ["consentGiven"],
  });

export const financialQuizSchema = z
  .object({
    email: optionalEmailSchema,
    consentGiven: z.boolean().optional(),
    company: honeypotSchema,
    emergencyFund: z.coerce.number().min(0).max(3),
    tracking: z.coerce.number().min(0).max(3),
    debt: z.coerce.number().min(0).max(3),
    investing: z.coerce.number().min(0).max(3),
    goal: z.coerce.number().min(0).max(3),
  })
  .refine((value) => !value.email || value.consentGiven === true, {
    message: "Vui lòng đồng ý với Chính sách bảo mật nếu muốn lưu kết quả",
    path: ["consentGiven"],
  });
