"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/content/site";
import { copy } from "@/content/site";

const positions = [
  [12, 24], [76, 16], [48, 22], [18, 64], [82, 58], [40, 78], [68, 80], [50, 50]
] as const;

const relations = [
  [0, 2], [0, 3], [0, 7], [1, 2], [1, 3], [1, 6], [2, 4], [2, 5], [2, 7], [3, 6], [3, 7], [4, 7], [5, 6], [5, 7], [6, 7]
] as const;

export default function InteractiveAtlas({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [active, setActive] = useState(7);
  const connected = useMemo(() => {
    const set = new Set<number>([active]);
    relations.forEach(([a, b]) => {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    });
    return set;
  }, [active]);

  return (
    <div className="atlasShell">
      <div className="atlasStage" role="application" aria-label="Interactive WAOC network atlas">
        <svg className="atlasLines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {relations.map(([a, b], index) => {
            const highlighted = active === a || active === b;
            return (
              <line
                key={`${a}-${b}-${index}`}
                x1={positions[a][0]}
                y1={positions[a][1]}
                x2={positions[b][0]}
                y2={positions[b][1]}
                className={highlighted ? "isHighlighted" : ""}
              />
            );
          })}
        </svg>
        <div className="atlasCore">
          <span>WAOC</span>
          <small>{locale === "zh" ? "协同场" : "COORDINATION FIELD"}</small>
        </div>
        {t.nodes.map((node, index) => (
          <button
            type="button"
            key={node.label}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            className={`atlasNode node-${node.type} ${active === index ? "isActive" : ""} ${connected.has(index) ? "isConnected" : ""}`}
            style={{ left: `${positions[index][0]}%`, top: `${positions[index][1]}%` }}
            aria-pressed={active === index}
          >
            <i /><span>{node.label}</span>
          </button>
        ))}
        <div className="atlasOrbit orbitOne" />
        <div className="atlasOrbit orbitTwo" />
      </div>
      <aside className="atlasInspector" aria-live="polite">
        <span className="microLabel">ACTIVE NODE / {String(active + 1).padStart(2, "0")}</span>
        <h3>{t.nodes[active].label}</h3>
        <p>{t.nodes[active].detail}</p>
        <div className="connectedList">
          {t.nodes.map((node, index) => connected.has(index) && index !== active ? <span key={node.label}>{node.label}</span> : null)}
        </div>
      </aside>
    </div>
  );
}
