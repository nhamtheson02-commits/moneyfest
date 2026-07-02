"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
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
  callbackUrl = "/account",
  showOAuth = true,
  children,
}: {
  action: AuthAction;
  submitLabel: string;
  callbackUrl?: string;
  showOAuth?: boolean;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const encodedCallback = encodeURIComponent(callbackUrl);
  return (
    <div className="mf-card grid gap-4 p-5">
      {showOAuth ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`/auth/oauth/google?callbackUrl=${encodedCallback}`}
              className="mf-btn mf-btn-secondary justify-center"
            >
              Tiếp tục với Google
            </Link>
            <Link
              href={`/auth/oauth/facebook?callbackUrl=${encodedCallback}`}
              className="mf-btn mf-btn-secondary justify-center"
            >
              Tiếp tục với Facebook
            </Link>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--mf-slate)]">
            <span className="h-px flex-1 bg-[var(--mf-border)]" />
            Hoặc dùng email
            <span className="h-px flex-1 bg-[var(--mf-border)]" />
          </div>
        </>
      ) : null}
      <form action={formAction} className="grid gap-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        {children}
        <Submit label={submitLabel} />
        {state.message ? (
          <p className={cn("text-sm font-semibold", state.ok ? "text-emerald-700" : "text-[var(--mf-danger)]")}>
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
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
