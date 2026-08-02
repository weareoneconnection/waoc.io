import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://waoc.io"),
  title: "WAOC — The Living Connection Network",
  description: "WAOC is the living coordination network where people, AI agents, organizations, knowledge and missions connect to create verifiable real-world value.",
  keywords: ["WAOC", "We Are One Connection", "connected intelligence", "AI coordination", "OneAI Labs", "human AI collaboration"],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/zh" }
  },
  openGraph: {
    title: "WAOC — Connected Intelligence",
    description: "The future is not built by isolated intelligence. It is built by connection.",
    url: "https://waoc.io",
    siteName: "WAOC",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"]
  },
  twitter: {
    card: "summary_large_image",
    title: "WAOC — Connected Intelligence",
    description: "Connection becomes coordination."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050403",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
