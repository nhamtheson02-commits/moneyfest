"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type AuthState = {
  ok: boolean;
  message: string;
};

type AuthAction = (state: AuthState, formData: FormData) => Promise<AuthState>;

const initialState: AuthState = { ok: false, message: "" };

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="mf-btn mf-btn-primary w-full justify-center">
      {pending ? "Đang xử lý..." : label}
    </button>
  );
}

export function AuthForm({
  action,
  submitLabel,
  children,
}: {
  action: AuthAction;
  submitLabel: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  return (
    <form action={formAction} className="mf-card grid gap-4 p-5">
      {children}
      <Submit label={submitLabel} />
      {state.message ? (
        <p className={cn("text-sm font-semibold", state.ok ? "text-emerald-700" : "text-[var(--mf-danger)]")}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

export function AuthField({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required
        className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base"
      />
    </label>
  );
}
