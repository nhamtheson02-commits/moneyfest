"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Download, LockKeyhole } from "lucide-react";
import { downloadEbookForCurrentUser } from "@/lib/ebook-access-actions";

type Props = {
  ebookSlug: string;
  accessLevel: string;
  isLoggedIn: boolean;
  canAccess: boolean;
  reason: string;
  price?: number | null;
};

type EbookDownloadActionState = {
  ok: boolean;
  message: string;
  downloadUrl?: string | null;
};

const initialState: EbookDownloadActionState = {
  ok: false,
  message: "",
  downloadUrl: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="mf-btn mf-btn-gold w-full justify-center">
      <Download size={16} />
      {pending ? "Đang kiểm tra..." : "Tải / xem ebook"}
    </button>
  );
}

function accessLabel(accessLevel: string, price?: number | null) {
  if (accessLevel === "FREE") return "Ebook miễn phí";
  if (accessLevel === "PAID") return price ? `${price.toLocaleString("vi-VN")} VND` : "Ebook trả phí";
  return "Dành cho thành viên";
}

export function EbookAccessPanel({ ebookSlug, accessLevel, isLoggedIn, canAccess, reason, price }: Props) {
  const [state, action] = useActionState(downloadEbookForCurrentUser, initialState);
  const callback = `/ebooks/${ebookSlug}`;

  return (
    <div className="mf-card grid gap-4 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--mf-ivory)] text-[var(--mf-midnight)]">
          <LockKeyhole size={18} />
        </div>
        <div>
          <p className="font-bold text-[var(--mf-midnight)]">{accessLabel(accessLevel, price)}</p>
          <p className="mf-muted mt-1 text-sm leading-6">{reason}</p>
        </div>
      </div>

      {!isLoggedIn ? (
        <Link href={`/auth/login?callbackUrl=${encodeURIComponent(callback)}`} className="mf-btn mf-btn-primary justify-center">
          Đăng nhập để tiếp tục
        </Link>
      ) : canAccess ? (
        <form action={action} className="grid gap-3">
          <input type="hidden" name="ebookSlug" value={ebookSlug} />
          <SubmitButton />
          {state.message ? (
            <p className={state.ok ? "mf-success-alert text-sm" : "mf-error-text text-sm"}>{state.message}</p>
          ) : null}
          {state.downloadUrl ? (
            <Link href={state.downloadUrl} target="_blank" rel="noreferrer" className="mf-btn mf-btn-secondary justify-center">
              Mở file ebook
            </Link>
          ) : null}
        </form>
      ) : (
        <div className="grid gap-3">
          <Link href="/contact" className="mf-btn mf-btn-primary justify-center">
            Đăng ký tư vấn để mở khóa
          </Link>
          <Link href="/services" className="mf-btn mf-btn-secondary justify-center">
            Xem gói dịch vụ
          </Link>
        </div>
      )}
    </div>
  );
}
