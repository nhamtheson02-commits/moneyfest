"use client";

export type MarketingAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;
};

const STORAGE_KEY = "moneyfest_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function captureMarketingAttribution() {
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const search = new URLSearchParams(window.location.search);
  const attribution: MarketingAttribution = {
    landing_page: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined,
  };

  for (const key of UTM_KEYS) {
    const value = search.get(key)?.trim();
    if (value) attribution[key] = value.slice(0, 200);
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
}

export function getMarketingAttribution(): MarketingAttribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") as MarketingAttribution;
  } catch {
    return {};
  }
}
