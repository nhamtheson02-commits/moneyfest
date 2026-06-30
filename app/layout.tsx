import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moneyfest.vn"),
  title: {
    default: "MONEYFEST - Hiểu luật chơi, làm chủ cuộc đời",
    template: "%s | MONEYFEST",
  },
  description:
    "MONEYFEST giúp bạn hiểu tiền, hiểu bản thân và hiểu thế giới để ra quyết định tài chính bình tĩnh hơn.",
  openGraph: {
    title: "MONEYFEST - Hiểu luật chơi, làm chủ cuộc đời",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
