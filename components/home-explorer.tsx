"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";
import { GoldButton, icons } from "@/components/marketing";
import type { HomeCard } from "@/data/home-content";

type Variant = "process" | "tool" | "product";

const gridClass: Record<Variant, string> = {
  process: "home-process-strip",
  tool: "home-tools-grid",
  product: "home-products-grid",
};

const cardClass: Record<Variant, string> = {
  process: "home-process-step",
  tool: "home-mini-tool",
  product: "home-product-card",
};

export function HomeExplorer({
  cards,
  variant,
  lead,
  label,
}: {
  cards: HomeCard[];
  variant: Variant;
  lead?: ReactNode;
  label: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = cards.find((card) => card.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <div>
      <div className={gridClass[variant]}>
        {lead}
        {cards.map((card, index) => {
          const isActive = card.id === openId;
          const Icon = card.icon ? icons[card.icon] : null;
          const classes = [cardClass[variant], card.featured ? "is-featured" : "", isActive ? "is-active" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={card.id}
              type="button"
              className={classes}
              aria-expanded={isActive}
              aria-controls={`${variant}-detail`}
              onClick={() => setOpenId(isActive ? null : card.id)}
            >
              {variant === "process" ? <span className="home-step-num">{index + 1}</span> : null}
              {Icon ? <Icon size={variant === "tool" ? 30 : 34} aria-hidden="true" /> : null}
              <span className="block min-w-0">
                <span className="home-card-title">{card.title}</span>
                <span className="home-card-desc">{card.description}</span>
                {card.meta ? <span className="home-card-meta">{card.meta}</span> : null}
              </span>
              <ChevronDown className="home-card-chevron" size={16} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          key={active.id}
          ref={panelRef}
          id={`${variant}-detail`}
          className="home-detail"
          role="region"
          aria-label={`${label}: ${active.detail.title}`}
        >
          <div className="home-detail-head">
            <div>
              <p className="home-detail-kicker">{active.detail.kicker}</p>
              <h3>{active.detail.title}</h3>
              {active.detail.badge ? <span className="home-detail-badge">{active.detail.badge}</span> : null}
            </div>
            <button type="button" className="home-detail-close" aria-label="Đóng" onClick={() => setOpenId(null)}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="home-detail-lead">{active.detail.lead}</p>
          <ul className="home-detail-list">
            {active.detail.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {active.detail.cta ? (
            <div className="home-detail-foot">
              <GoldButton href={active.detail.cta.href}>{active.detail.cta.label}</GoldButton>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
