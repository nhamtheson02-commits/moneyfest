"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type ActionState = {
  ok: boolean;
  message: string;
};

type AdminFormAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

const initialState: ActionState = { ok: false, message: "" };

function SubmitButton({ label, variant = "primary" }: { label: string; variant?: "primary" | "secondary" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn("mf-btn", variant === "primary" ? "mf-btn-primary" : "mf-btn-secondary")}
    >
      {pending ? "Đang lưu..." : label}
    </button>
  );
}

export function AdminActionForm({
  action,
  children,
  submitLabel = "Lưu",
  submitVariant = "primary",
  className,
}: {
  action: AdminFormAction;
  children: React.ReactNode;
  submitLabel?: string;
  submitVariant?: "primary" | "secondary";
  className?: string;
}) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className={cn("grid gap-3", className)}>
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton label={submitLabel} variant={submitVariant} />
        {state.message ? (
          <p className={cn("text-sm font-semibold", state.ok ? "text-emerald-700" : "text-[var(--mf-danger)]")}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
