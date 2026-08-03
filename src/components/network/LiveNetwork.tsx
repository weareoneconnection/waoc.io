"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Locale } from "@/content/site";
import { copy } from "@/content/site";
import Reveal from "@/components/experience/Reveal";
import {
  buildFieldConstellation,
  compactNumber,
  maskWallet,
  useNetworkData,
  type GraphEdgeView,
  type GraphNodeView
} from "@/lib/networkField";

const ONE_MISSION_URL = "https://one-mission.vercel.app/";
const ONEFIELD_URL = "https://www.waoc.network/";

export default function LiveNetwork({ locale }: { locale: Locale }) {
  const t = copy[locale].network;
  const home = locale === "zh" ? "/zh" : "/";
  const { leaderboard, participants, field, loading, failed } = useNetworkData();

  const stats = field?.stats ?? { builders: 0, signals: 0, links: 0, circles: 0 };
  const constellation = useMemo(() => buildFieldConstellation(field?.graph), [field]);

  const signals = [
    { label: t.stats.contributors, value: participants },
    { label: t.stats.builders, value: stats.builders },
    { label: t.stats.links, value: stats.links },
    { label: t.stats.signals, value: stats.signals }
  ];

  return (
    <main className="networkRoot">
      <div className="networkBackdrop" aria-hidden="true" />
      <div className="filmGrain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <header className="networkBar">
        <Link href={home} className="brandLockup" aria-label="WAOC home">
          <span className="brandNode"><i /></span>
          <span className="brandWords"><b>WAOC</b><small>WE ARE ONE CONNECTION</small></span>
        </Link>
        <Link href={home} className="networkBack">← {t.back}</Link>
      </header>

      <section className="networkHero">
        <div className="shell">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="networkLede">{t.body}</p>
          <span className={`networkPulse ${failed ? "isStale" : ""}`}>
            <i />{failed ? t.stale : t.live}
          </span>
        </div>
      </section>

      <section className="shell">
        <div className="signalBar">
          {signals.map((signal, index) => (
            <Reveal key={signal.label} className="signalCell" delay={index * 70}>
              <b>{loading ? "—" : compactNumber(signal.value)}</b>
              <span className="microLabel">{signal.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="networkGrid">
          <section className="networkPanel">
            <span className="microLabel">{t.board.kicker}</span>
            <h2>{t.board.title}</h2>
            <p>{t.board.body}</p>

            <ol className="ladder">
              {loading ? (
                <li className="ladderEmpty">{t.loading}</li>
              ) : leaderboard.length === 0 ? (
                <li className="ladderEmpty">{t.empty}</li>
              ) : (
                leaderboard.map((row, index) => (
                  <li key={`${row.wallet}-${index}`} className={index === 0 ? "isLead" : ""}>
                    <span className="ladderRank">{String(index + 1).padStart(2, "0")}</span>
                    <span className="ladderWallet">{maskWallet(row.wallet)}</span>
                    <span className="ladderMeta">
                      {row.completed ?? row.missions ?? 0} {t.board.missions}
                    </span>
                    <b className="ladderPoints">
                      {compactNumber(row.points)}<i>{t.board.points}</i>
                    </b>
                  </li>
                ))
              )}
            </ol>

            <a href={ONE_MISSION_URL} target="_blank" rel="noreferrer" className="panelAction">
              <span>{t.board.open}</span><i>↗</i>
            </a>
          </section>

          <section className="networkPanel">
            <span className="microLabel">{t.field.kicker}</span>
            <h2>{t.field.title}</h2>
            <p>{t.field.body}</p>

            <div className="constellation">
              {loading ? (
                <p className="constellationEmpty">{t.loading}</p>
              ) : constellation.nodes.length === 0 ? (
                <p className="constellationEmpty">{t.empty}</p>
              ) : (
                <Constellation nodes={constellation.nodes} edges={constellation.edges} />
              )}
              <div className="atlasOrbit orbitOne" aria-hidden="true" />
              <div className="atlasOrbit orbitTwo" aria-hidden="true" />
            </div>
            <p className="constellationCaption">{t.field.caption}</p>

            <a href={ONEFIELD_URL} target="_blank" rel="noreferrer" className="panelAction">
              <span>{t.field.open}</span><i>↗</i>
            </a>
          </section>
        </div>

        <section className="networkEnter">
          <h2>{t.enter.title}</h2>
          <p>{t.enter.body}</p>
          <div className="heroActions">
            <a href={ONE_MISSION_URL} target="_blank" rel="noreferrer" className="actionPrimary">
              <span>{t.enter.mission}</span><i>↗</i>
            </a>
            <a href={ONEFIELD_URL} target="_blank" rel="noreferrer" className="actionText">
              <span>{t.enter.field}</span><i>↗</i>
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

function Constellation({ nodes, edges }: { nodes: GraphNodeView[]; edges: GraphEdgeView[] }) {
  const map = new Map(nodes.map(node => [node.id, node]));

  return (
    <>
      <svg className="atlasLines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map(edge => {
          const from = map.get(edge.from);
          const to = map.get(edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={edge.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={edge.strength >= 80 ? "isHighlighted" : ""}
            />
          );
        })}
      </svg>

      {nodes.map(node => (
        <span
          key={node.id}
          className={`fieldNode ${node.isCore ? "isCore" : ""}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <i />
          <b>{node.label}</b>
          {node.degree > 0 ? <small>{node.degree}</small> : null}
        </span>
      ))}
    </>
  );
}
