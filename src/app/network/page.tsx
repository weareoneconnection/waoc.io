import type { Metadata } from "next";
import LiveNetwork from "@/components/network/LiveNetwork";

export const metadata: Metadata = {
  title: "WAOC — The Live Network",
  description: "Live contribution and relationship data from One Mission and OneField.",
  alternates: { canonical: "/network", languages: { en: "/network", "zh-CN": "/zh/network" } }
};

export default function Page() {
  return <LiveNetwork locale="en" />;
}
