import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleDot, Compass, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const HeadingTag = as;

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="mf-eyebrow">{eyebrow}</p> : null}
      <HeadingTag className={cn(
        "mf-display mt-3 text-[clamp(2rem,5vw,3.3rem)] font-bold leading-tight",
        tone === "light" ? "text-[var(--mf-ivory)]" : "text-[var(--mf-midnight)]",
      )}>
        {title}
      </HeadingTag>
      {description ? (
        <p className={cn(
          "mt-4 text-base leading-7",
          tone === "light" ? "text-[rgba(244,240,232,0.76)]" : "mf-muted",
        )}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mf-card p-8 text-center">
      <CircleDot className="mx-auto text-[var(--mf-gold)]" size={26} />
      <p className="mt-4 font-bold text-[var(--mf-midnight)]">{title}</p>
      <p className="mf-muted mt-2 text-sm">{description}</p>
    </div>
  );
}

export function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "mf-btn",
        variant === "primary" && "mf-btn-primary",
        variant === "secondary" && "mf-btn-secondary",
        variant === "gold" && "mf-btn-gold",
      )}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="mf-card p-5">
      <p className="mf-eyebrow">{label}</p>
      <p className="mf-display mt-3 text-4xl font-bold text-[var(--mf-midnight)]">{value}</p>
    </div>
  );
}

export function EbookCover({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--mf-radius-lg)] bg-[var(--mf-obsidian)] p-5 text-[var(--mf-ivory)]">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[rgba(212,168,63,0.32)]" />
      <div className="absolute bottom-10 right-8 h-24 w-24 rounded-full border border-[rgba(232,207,139,0.18)]" />
      <div>
        <Star className="text-[var(--mf-gold)]" size={22} />
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--mf-champagne)]">
          Ebook MONEYFEST
        </p>
      </div>
      <div>
        <p className="mf-display text-2xl font-bold leading-tight">{title}</p>
        {subtitle ? <p className="mt-3 text-sm leading-6 text-[rgba(244,240,232,0.72)]">{subtitle}</p> : null}
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--mf-gold)]">
        Tải miễn phí
      </p>
    </div>
  );
}

export function BrandMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo/moneyfest-logo-horizontal-dark-bg.png"
      alt="MONEYFEST"
      width={707}
      height={353}
      priority={priority}
      className={cn("h-auto w-36 object-contain", className)}
    />
  );
}

export function Emblem({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo/moneyfest-emblem.png"
      alt=""
      width={500}
      height={500}
      className={cn("h-10 w-10 object-contain", className)}
    />
  );
}

export function MotifCard({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mf-card p-6">
      <div className="mf-icon-chip">{icon ?? <Compass size={20} />}</div>
      <h3 className="mt-5 text-lg font-bold text-[var(--mf-midnight)]">{title}</h3>
      <p className="mf-muted mt-2 text-sm leading-6">{children}</p>
    </div>
  );
}
