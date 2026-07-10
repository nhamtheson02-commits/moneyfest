import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  Download,
  Globe2,
  Handshake,
  Landmark,
  Lightbulb,
  Lock,
  Mail,
  Map,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const icons = {
  arrow: ArrowRight,
  book: BookOpen,
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  check: CheckCircle2,
  compass: Compass,
  dollar: CircleDollarSign,
  download: Download,
  globe: Globe2,
  handshake: Handshake,
  landmark: Landmark,
  lightbulb: Lightbulb,
  lock: Lock,
  mail: Mail,
  map: Map,
  message: MessageCircle,
  scale: Scale,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  trend: TrendingUp,
  users: Users,
};

export function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="mf-btn mf-btn-gold whitespace-nowrap">
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function OutlineButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="mf-btn mf-btn-outline whitespace-nowrap">
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow?: string; title: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {eyebrow ? <p className="mf-eyebrow">{eyebrow}</p> : null}
      <h2 className={cn("mf-display mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight", light ? "text-[var(--mf-ivory)]" : "text-[var(--mf-midnight)]")}>
        <span className="text-[var(--mf-gold)]">✦</span> {title} <span className="text-[var(--mf-gold)]">✦</span>
      </h2>
    </div>
  );
}

export function HeroSection({
  eyebrow,
  title,
  description,
  image,
  primary,
  secondary,
  badges = [],
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  badges?: string[];
}) {
  return (
    <section className="border-b border-[rgba(212,168,63,0.72)] bg-[var(--mf-obsidian)] text-[var(--mf-ivory)]">
      <div className="grid w-full overflow-hidden lg:min-h-[382px] lg:grid-cols-[50%_50%]">
        <div className="relative z-10 flex items-center bg-[var(--mf-midnight)] px-6 py-10 sm:px-10 lg:px-[6.3vw]">
          <div className="w-full max-w-[520px]">
          <p className="mf-eyebrow">{eyebrow}</p>
          <h1 className="mf-display mt-3 text-[clamp(3.1rem,4.45vw,4.55rem)] font-semibold leading-[1.05]">
            {title}
          </h1>
          <p className="mt-4 max-w-[500px] text-[1rem] leading-7 text-[rgba(244,240,232,0.86)]">{description}</p>
          {(primary || secondary) ? (
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              {primary ? <GoldButton href={primary.href}>{primary.label}</GoldButton> : null}
              {secondary ? <OutlineButton href={secondary.href}>{secondary.label}</OutlineButton> : null}
            </div>
          ) : null}
          {badges.length ? (
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
              {badges.map((badge) => (
                <span key={badge} className="mf-hero-badge"><CheckCircle2 size={16} />{badge}</span>
              ))}
            </div>
          ) : null}
          </div>
        </div>
        <div className="relative hidden min-h-[382px] lg:block">
          <Image src={image} alt="" fill priority className="object-cover object-center" sizes="50vw" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--mf-midnight)] to-transparent" />
        </div>
      </div>
    </section>
  );
}

export function ProblemCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="mf-problem-card">
      <div className="mf-problem-icon">
        {icon}
      </div>
      <div>
        <h3 className="mf-problem-card-title">{title}</h3>
        <p className="mf-problem-card-copy">{children}</p>
      </div>
    </div>
  );
}

export function ProblemSectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-center gap-5 text-center">
      <span className="mf-title-rule" aria-hidden="true" />
      <h2 className="mf-display whitespace-nowrap text-[clamp(1.38rem,1.7vw,1.62rem)] font-semibold leading-none text-[var(--mf-midnight)]">
        {children}
      </h2>
      <span className="mf-title-rule mf-title-rule-right" aria-hidden="true" />
    </div>
  );
}

export function ProblemMoneyIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true">
      <path d="M9.2 11.4H20c1.3 0 2.3 1 2.3 2.3v6.6c0 1.3-1 2.3-2.3 2.3H8.2c-1.3 0-2.3-1-2.3-2.3v-6.6c0-1.3 1-2.3 2.3-2.3h1Z" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.4 11.2c.2-2.6 1.7-4 3.7-4s3.5 1.4 3.7 4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
      <path d="M6.4 16.2h15.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
      <path d="M14.1 14.7v3.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
      <path d="M11.8 5.9c.7-.9 1.5-1.3 2.4-1.3.8 0 1.5.3 2.1.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function ProblemPriorityIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true">
      <path d="M14.5 4.8v19.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
      <path d="M8.2 8.2h11.5l2.2 2.4-2.2 2.4H8.2L6 10.6l2.2-2.4Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round"/>
      <path d="M20.8 16H9.3l-2.2 2.4 2.2 2.4h11.5l2.2-2.4-2.2-2.4Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round"/>
    </svg>
  );
}

export function ProblemChatIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true">
      <path d="M10.4 18.6h-.9l-4 3.1.9-4.1A8.2 8.2 0 0 1 5 13c0-4.4 3.8-7.8 8.6-7.8 4.9 0 8.7 3.4 8.7 7.8s-3.8 7.8-8.7 7.8c-1.1 0-2.2-.2-3.2-.6Z" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.2 20.8c1.1.8 2.5 1.2 4 1.2h.7l3.6 2.6-.8-3.4a6 6 0 0 0 2.3-4.7c0-1.6-.7-3.1-1.9-4.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ProblemGrowthIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true">
      <path d="M5.7 20.8 11 15.5l4 4L23.4 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.8 10.8h5.8v5.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.7 23.2h18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  );
}

export function IconBox({ icon, title, children, dark = false }: { icon: ReactNode; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={cn("mf-card p-6 text-center", dark && "mf-card-dark text-[var(--mf-ivory)]")}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-gold)] text-[var(--mf-gold)]">{icon}</div>
      <h3 className={cn("mf-display mt-4 text-2xl font-semibold", dark ? "text-[var(--mf-ivory)]" : "text-[var(--mf-midnight)]")}>{title}</h3>
      <p className={cn("mt-2 text-sm leading-6", dark ? "text-[rgba(244,240,232,0.72)]" : "mf-muted")}>{children}</p>
    </div>
  );
}

export function EditorialCard({ image, eyebrow, title, description, href = "#" }: { image?: string; eyebrow?: string; title: string; description: string; href?: string }) {
  return (
    <Link href={href} className="mf-editorial-card group block overflow-hidden">
      {image ? <div className="relative h-56"><Image src={image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /></div> : null}
      <div className="p-5">
        {eyebrow ? <p className="mf-tag-dark">{eyebrow}</p> : null}
        <h3 className="mf-display mt-3 text-2xl font-semibold leading-tight text-[var(--mf-ivory)]">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-[rgba(244,240,232,0.76)]">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--mf-gold)]">Xem chi tiết <ArrowRight size={15} /></span>
      </div>
    </Link>
  );
}

export function ArticleCard({ article, image }: { article: { title: string; description: string; category: string; date: string; readTime: string }; image: string }) {
  return (
    <EditorialCard image={image} eyebrow={article.category} title={article.title} description={`${article.description} · ${article.readTime} · ${article.date}`} href="/blog" />
  );
}

export function EbookCard({ ebook, paid = false }: { ebook: { title: string; description: string; category: string; price: string }; paid?: boolean }) {
  return (
    <div className="mf-editorial-card overflow-hidden">
      <div className="relative h-52 bg-[var(--mf-obsidian)]">
        <Image src="/images/moneyfest/ebook/ebook-moneyfest.jpg" alt="" fill className="object-cover opacity-70" sizes="(max-width: 768px) 100vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--mf-obsidian)] to-transparent" />
        <span className="absolute left-4 top-4 mf-tag-dark">{ebook.category}</span>
      </div>
      <div className="p-5">
        <h3 className="mf-display text-2xl font-semibold leading-tight text-[var(--mf-ivory)]">{ebook.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[rgba(244,240,232,0.74)]">{ebook.description}</p>
        <p className="mt-4 text-2xl font-semibold text-[var(--mf-gold)]">{ebook.price}</p>
        <GoldButton href="/ebooks">{paid ? "Xem chi tiết" : "Tải miễn phí"}</GoldButton>
      </div>
    </div>
  );
}

export function CommunityCard({ title, description, cta }: { title: string; description: string; cta: string }) {
  return (
    <div className="mf-card-dark p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[var(--border-gold)] text-[var(--mf-gold)]">
          <Users size={30} />
        </div>
        <div>
          <h3 className="mf-display text-2xl font-semibold text-[var(--mf-gold)]">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[rgba(244,240,232,0.75)]">{description}</p>
        </div>
      </div>
      <div className="mt-5"><GoldButton href="/community">{cta}</GoldButton></div>
    </div>
  );
}

export function Timeline({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item, index) => (
        <div key={item} className="mf-card relative p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mf-gold)] font-semibold text-[var(--mf-obsidian)]">{index + 1}</span>
          <h3 className="mt-4 font-semibold text-[var(--mf-midnight)]">{item}</h3>
          {index < items.length - 1 ? <ArrowRight className="absolute -right-5 top-1/2 hidden text-[var(--mf-gold)] md:block" /> : null}
        </div>
      ))}
    </div>
  );
}

export function CTASection({ title, description, primary = "Đặt lịch tư vấn 1:1", secondary = "Nhận ebook miễn phí" }: { title: string; description: string; primary?: string; secondary?: string }) {
  return (
    <section className="bg-[var(--mf-obsidian)] py-10 text-[var(--mf-ivory)]">
      <div className="mf-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="mf-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight">{title}</h2>
          <p className="mt-3 max-w-2xl text-[rgba(244,240,232,0.72)]">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <GoldButton href="/contact">{primary}</GoldButton>
          <OutlineButton href="/ebooks">{secondary}</OutlineButton>
        </div>
      </div>
    </section>
  );
}
