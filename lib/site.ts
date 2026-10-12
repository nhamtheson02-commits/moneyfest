const DEFAULT_SITE_URL = "https://moneyfest.vn";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, "");

export const siteConfig = {
  name: "MONEYFEST",
  title: "MONEYFEST - Thấu hiểu tài chính, chủ động tương lai",
  description:
    "MONEYFEST giúp bạn hiểu tiền, hiểu bản thân và hiểu bối cảnh xung quanh để ra quyết định tài chính bình tĩnh hơn.",
  url: siteUrl,
  locale: "vi_VN",
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

