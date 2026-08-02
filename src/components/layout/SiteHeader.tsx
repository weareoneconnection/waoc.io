"use client";

import Link from "next/link";
import type { Locale } from "@/content/site";
import { copy } from "@/content/site";

export default function SiteHeader({ locale, act }: { locale: Locale; act: number }) {
  const t = copy[locale];
  const isZh = locale === "zh";

  return (
    <header className="siteHeader">
      <Link href={isZh ? "/zh" : "/"} className="brandLockup" aria-label="WAOC home">
        <span className="brandNode"><i /></span>
        <span className="brandWords"><b>WAOC</b><small>WE ARE ONE CONNECTION</small></span>
      </Link>
      <nav aria-label="Primary navigation">
        {t.nav.map((item, index) => (
          <a key={item} href={`#act-${index + 1}`} className={act === index ? "isActive" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item}
          </a>
        ))}
      </nav>
      <div className="headerActions">
        <a href="https://www.weareoneconnection.org" target="_blank" rel="noreferrer" className="manifestoMini">MANIFESTO ↗</a>
        <Link href={isZh ? "/" : "/zh"} className="languageSwitch">{isZh ? "EN" : "中文"}</Link>
      </div>
    </header>
  );
}
