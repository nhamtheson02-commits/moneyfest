import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "vietnamese"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | MONEYFEST",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description:
      "Hệ sinh thái tri thức và tư vấn tài chính giúp bạn có nhiều lựa chọn hơn trong cuộc sống.",
    images: ["/brand/logo/moneyfest-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MONEYFEST - Hiểu luật chơi, làm chủ cuộc đời",
    description:
      "Hệ sinh thái tri thức và tư vấn tài chính giúp bạn có nhiều lựa chọn hơn trong cuộc sống.",
    images: ["/brand/logo/moneyfest-og.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/brand/logo/moneyfest-logo-horizontal.png"),
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "vi-VN",
    },
  ];

  return (
    <html
      lang="vi"
      className={`${inter.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
