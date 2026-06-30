import type { MetadataRoute } from "next";
import { getEbooks, getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.moneyfest.vn";
  const [ebooks, posts] = await Promise.all([getEbooks(), getPosts()]);

  return [
    "",
    "/ebooks",
    "/blog",
    "/tools",
    "/services",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    ...ebooks.map((ebook) => `/ebooks/${ebook.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
