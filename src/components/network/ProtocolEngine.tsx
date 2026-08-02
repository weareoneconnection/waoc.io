"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/site";
import { copy } from "@/content/site";

export default function ProtocolEngine({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const range = window.innerHeight + rect.height;
      setProgress(Math.min(1, Math.max(0, (window.innerHeight - rect.top) / range)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="protocolEngine" ref={ref} style={{ "--protocol-progress": progress } as React.CSSProperties}>
      <div className="protocolSpine"><i /></div>
      {t.protocol.map((step, index) => {
        const local = Math.min(1, Math.max(0, progress * 9 - index * 0.85));
        return (
          <article className={`protocolNode ${local > 0.45 ? "isActive" : ""}`} key={step.title}>
            <div className="protocolSignal"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
