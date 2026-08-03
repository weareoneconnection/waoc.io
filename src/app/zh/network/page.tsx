import type { Metadata } from "next";
import LiveNetwork from "@/components/network/LiveNetwork";

export const metadata: Metadata = {
  title: "WAOC — 实时网络",
  description: "来自 One Mission 与 OneField 的实时贡献与关系数据。",
  alternates: { canonical: "/zh/network", languages: { en: "/network", "zh-CN": "/zh/network" } }
};

export default function Page() {
  return <LiveNetwork locale="zh" />;
}
