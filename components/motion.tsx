"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Các khối sẽ hiện dần khi người dùng cuộn tới. */
const TARGETS = [
  ".home-compact-title",
  ".home-section-kicker",
  ".mf-eyebrow",
  "section h2",
  ".mf-problem-card",
  ".mf-card",
  ".mf-card-dark",
  ".mf-editorial-card",
  ".home-process-step",
  ".home-mini-tool",
  ".home-product-card",
  ".home-tool-feature",
  ".home-principle-item",
  ".money-map-service-copy",
  ".money-map-service-card",
  ".money-map-service-art",
  ".home-final-cta-inner > *",
  "main article",
  "main form",
].join(",");

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const main = document.querySelector("main");
    if (!main) return;

    const hero = main.querySelector(".mf-hero-copy")?.closest("section") ?? null;
    const vh = window.innerHeight;
    const seen = new Set<Element>();
    const items: HTMLElement[] = [];

    main.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
      if (hero?.contains(el)) return;
      if (el.closest(".home-detail")) return;
      // Không làm động khối con của một khối đã được làm động.
      let p = el.parentElement;
      while (p && p !== main) {
        if (seen.has(p)) return;
        p = p.parentElement;
      }
      // Khối đã nằm trong màn hình đầu tiên: để nguyên (đã có hiệu ứng vào trang bằng CSS).
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      seen.add(el);
      items.push(el);
    });

    // Độ trễ lần lượt cho các khối cùng cha (lưới thẻ).
    const counts = new Map<Element, number>();
    items.forEach((el) => {
      const parent = el.parentElement as Element;
      const i = counts.get(parent) ?? 0;
      counts.set(parent, i + 1);
      el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 90}ms`);
      el.setAttribute("data-reveal", el.classList.contains("money-map-service-art") ? "right" : "up");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    items.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      items.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.classList.remove("is-in");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
