export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mf-card p-6 text-center">
        <p className="mf-display font-bold text-[var(--mf-midnight)]">Đang tải MONEYFEST...</p>
        <p className="mf-muted mt-2 text-sm">Vui lòng đợi trong giây lát.</p>
      </div>
    </div>
  );
}
