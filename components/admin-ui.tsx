import Link from "next/link";
import { EmptyState } from "@/components/ui";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mf-eyebrow">Quản trị MONEYFEST</p>
        <h1 className="mf-display mt-2 text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight text-[var(--mf-midnight)]">
          {title}
        </h1>
        <p className="mf-muted mt-3 max-w-3xl text-sm leading-6">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function AdminCard({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mf-card overflow-hidden", className)}>
      {title || description ? (
        <div className="border-b border-[var(--mf-border)] p-4">
          {title ? <h2 className="font-bold text-[var(--mf-midnight)]">{title}</h2> : null}
          {description ? <p className="mf-muted mt-1 text-sm">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function AdminTableShell({
  emptyTitle,
  emptyDescription,
  hasRows,
  children,
}: {
  emptyTitle: string;
  emptyDescription: string;
  hasRows: boolean;
  children: React.ReactNode;
}) {
  if (!hasRows) {
    return <div className="p-4"><EmptyState title={emptyTitle} description={emptyDescription} /></div>;
  }

  return <div className="overflow-x-auto">{children}</div>;
}

export function SearchFilterBar({
  q,
  status,
  statusOptions = [],
  toolType,
  toolTypes = [],
  placeholder = "Tìm kiếm",
}: {
  q: string;
  status?: string;
  statusOptions?: readonly string[];
  toolType?: string;
  toolTypes?: string[];
  placeholder?: string;
}) {
  return (
    <form className="mf-card mt-6 grid gap-3 p-4 md:grid-cols-[1fr_auto_auto]">
      <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
        Tìm kiếm
        <input
          name="q"
          defaultValue={q}
          placeholder={placeholder}
          className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base"
        />
      </label>
      {statusOptions.length ? (
        <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
          Trạng thái
          <select
            name="status"
            defaultValue={status}
            className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base"
          >
            <option value="">Tất cả</option>
            {statusOptions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      ) : null}
      {toolTypes.length ? (
        <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
          Công cụ
          <select
            name="toolType"
            defaultValue={toolType}
            className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base"
          >
            <option value="">Tất cả</option>
            {toolTypes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      ) : null}
      <div className="flex items-end gap-2">
        <button className="mf-btn mf-btn-primary" type="submit">Lọc</button>
        <Link href="?" className="mf-btn mf-btn-secondary">Xóa</Link>
      </div>
    </form>
  );
}

export function Pagination({
  page,
  pageCount,
  basePath,
  query,
}: {
  page: number;
  pageCount: number;
  basePath: string;
  query: URLSearchParams;
}) {
  const previous = new URLSearchParams(query);
  previous.set("page", String(Math.max(1, page - 1)));
  const next = new URLSearchParams(query);
  next.set("page", String(Math.min(pageCount, page + 1)));

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
      <p className="mf-muted">Trang {page} / {pageCount}</p>
      <div className="flex gap-2">
        <Link
          href={`${basePath}?${previous.toString()}`}
          className={cn("mf-btn mf-btn-secondary", page <= 1 && "pointer-events-none opacity-50")}
        >
          Trước
        </Link>
        <Link
          href={`${basePath}?${next.toString()}`}
          className={cn("mf-btn mf-btn-secondary", page >= pageCount && "pointer-events-none opacity-50")}
        >
          Sau
        </Link>
      </div>
    </div>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-[var(--mf-midnight)]">
      {label}
      <textarea
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="rounded-[var(--mf-radius-sm)] border border-[var(--mf-border)] bg-white px-3 py-2 text-base"
      />
    </label>
  );
}
