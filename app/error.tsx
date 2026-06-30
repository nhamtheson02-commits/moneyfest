"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mf-card max-w-md p-6 text-center">
        <p className="mf-display font-bold text-[var(--mf-midnight)]">Có lỗi xảy ra</p>
        <p className="mf-muted mt-2 text-sm">Thử tải lại trang. Nếu database chưa khởi tạo, hãy chạy npm run db:setup.</p>
        <button onClick={reset} className="mf-btn mf-btn-primary mt-4">
          Thử lại
        </button>
      </div>
    </div>
  );
}
