"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Calculator, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { submitCashflow, submitFinancialQuiz } from "@/lib/actions";
import { cashflowSchema, financialQuizSchema } from "@/lib/validation";
import type { z } from "zod";

type CashflowValues = z.input<typeof cashflowSchema>;
type QuizValues = z.input<typeof financialQuizSchema>;

export function CashflowTool() {
  const [result, setResult] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<CashflowValues>({
    resolver: zodResolver(cashflowSchema),
    defaultValues: {
      email: "",
      consentGiven: false,
      company: "",
      income: 0,
      fixedExpense: 0,
      flexibleExpense: 0,
      debtPayment: 0,
      saving: 0,
    },
  });

  function onSubmit(values: CashflowValues) {
    startTransition(async () => {
      const response = await submitCashflow(values);
      setResult(response.result ?? response.message);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mf-card grid gap-4 p-5">
      <div className="flex items-center gap-3">
        <span className="mf-icon-chip"><Calculator size={20} /></span>
        <div>
          <h2 className="mf-display text-xl font-bold text-[var(--mf-midnight)]">Tính dòng tiền cá nhân</h2>
          <p className="mf-muted text-sm">Nhập số theo tháng. Email là tùy chọn nếu bạn muốn lưu kết quả.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberInput label="Thu nhập" register={form.register("income")} />
        <NumberInput label="Chi phí cố định" register={form.register("fixedExpense")} />
        <NumberInput label="Chi phí linh hoạt" register={form.register("flexibleExpense")} />
        <NumberInput label="Trả nợ hằng tháng" register={form.register("debtPayment")} />
        <NumberInput label="Tiết kiệm/đầu tư" register={form.register("saving")} />
        <label className="mf-label">
          Email (không bắt buộc)
          <input className="mf-field mt-1" type="email" {...form.register("email")} />
          {form.formState.errors.email?.message ? <span className="mf-error-text mt-1 block">{form.formState.errors.email.message}</span> : null}
        </label>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cashflow-company">Công ty</label>
        <input id="cashflow-company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
      </div>
      <ConsentCheckbox
        register={form.register("consentGiven")}
        error={form.formState.errors.consentGiven?.message}
      />
      <button disabled={isPending} className="mf-btn mf-btn-primary">
        {isPending ? "Đang tính..." : "Tính ngay"}
      </button>
      {result ? <p className="mf-info-alert text-sm font-bold">{result}</p> : null}
    </form>
  );
}

export function FinancialQuiz() {
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<QuizValues>({
    resolver: zodResolver(financialQuizSchema),
    defaultValues: {
      email: "",
      consentGiven: false,
      company: "",
      emergencyFund: 0,
      tracking: 0,
      debt: 0,
      investing: 0,
      goal: 0,
    },
  });

  function onSubmit(values: QuizValues) {
    startTransition(async () => {
      const response = await submitFinancialQuiz(values);
      setResult(response.result ?? response.message);
      setScore(response.score ?? null);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mf-card grid gap-4 p-5">
      <div className="flex items-center gap-3">
        <span className="mf-icon-chip"><ClipboardCheck size={20} /></span>
        <div>
          <h2 className="mf-display text-xl font-bold text-[var(--mf-midnight)]">Quiz sức khỏe tài chính</h2>
          <p className="mf-muted text-sm">Chấm điểm nhanh từ 0 đến 15 điểm.</p>
        </div>
      </div>
      <QuizSelect label="Quỹ dự phòng của bạn" register={form.register("emergencyFund")} />
      <QuizSelect label="Bạn có theo dõi chi tiêu hằng tháng" register={form.register("tracking")} />
      <QuizSelect label="Tình trạng nợ hiện tại" register={form.register("debt")} />
      <QuizSelect label="Bạn đã bắt đầu đầu tư dài hạn" register={form.register("investing")} />
      <QuizSelect label="Mục tiêu tài chính có rõ ràng" register={form.register("goal")} />
      <label className="mf-label">
        Email (không bắt buộc)
        <input className="mf-field mt-1" type="email" {...form.register("email")} />
        {form.formState.errors.email?.message ? <span className="mf-error-text mt-1 block">{form.formState.errors.email.message}</span> : null}
      </label>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quiz-company">Công ty</label>
        <input id="quiz-company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
      </div>
      <ConsentCheckbox
        register={form.register("consentGiven")}
        error={form.formState.errors.consentGiven?.message}
      />
      <button disabled={isPending} className="mf-btn mf-btn-primary">
        {isPending ? "Đang chấm điểm..." : "Làm quiz sức khỏe tài chính"}
      </button>
      {result ? (
        <div className="mf-info-alert text-sm">
          <p className="font-bold">Điểm: {score}/15</p>
          <p className="mt-1">{result}</p>
        </div>
      ) : null}
    </form>
  );
}

function ConsentCheckbox({ register, error }: { register: UseFormRegisterReturn; error?: string }) {
  return (
    <label className="flex items-start gap-3 text-sm leading-6 text-[var(--mf-slate)]">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-[var(--mf-border)] accent-[var(--mf-gold)]"
        {...register}
      />
      <span>
        Tôi đồng ý để MONEYFEST lưu thông tin và liên hệ với tôi theo{" "}
        <Link href="/privacy" className="font-bold text-[var(--mf-midnight)] underline">
          Chính sách bảo mật
        </Link>
        .
        {error ? <span className="mf-error-text mt-1 block">{error}</span> : null}
      </span>
    </label>
  );
}

function NumberInput({ label, register }: { label: string; register: UseFormRegisterReturn }) {
  return (
    <label className="mf-label">
      {label}
      <input className="mf-field mt-1" type="number" min="0" step="100000" {...register} />
    </label>
  );
}

function QuizSelect({ label, register }: { label: string; register: UseFormRegisterReturn }) {
  return (
    <label className="mf-label">
      {label}
      <select className="mf-field mt-1" {...register}>
        <option value="0">0 - Chưa có</option>
        <option value="1">1 - Mới bắt đầu</option>
        <option value="2">2 - Khá ổn</option>
        <option value="3">3 - Rất tốt</option>
      </select>
    </label>
  );
}
