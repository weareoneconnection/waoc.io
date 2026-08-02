"use client";

import type { Locale } from "@/content/site";
import { copy } from "@/content/site";
import { useScrollDirector } from "@/lib/useScrollDirector";
import UniverseCanvas from "@/components/visual/UniverseCanvas";
import SiteHeader from "@/components/layout/SiteHeader";
import Reveal from "./Reveal";
import ProtocolEngine from "@/components/network/ProtocolEngine";
import InteractiveAtlas from "@/components/network/InteractiveAtlas";

export default function V10Experience({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const isZh = locale === "zh";
  const scroll = useScrollDirector(6);

  return (
    <main className="experienceRoot">
      <UniverseCanvas {...scroll} />
      <div className="atmosphere" aria-hidden="true" />
      <div className="filmGrain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <SiteHeader locale={locale} act={scroll.act} />

      <aside className="journeyRail" aria-hidden="true">
        <span className="journeyFill" style={{ transform: `scaleY(${scroll.progress})` }} />
        {t.nav.map((item, index) => <i key={item} className={scroll.act === index ? "isActive" : ""} />)}
      </aside>

      <section className="heroScene" id="top">
        <div className="heroAura" aria-hidden="true" />
        <div className="heroContent shell">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>
            <span>{t.hero.line1}</span>
            <span>{t.hero.line2}</span>
            <strong>{t.hero.line3}</strong>
          </h1>
          <p className="heroBody">{t.hero.body}</p>
          <div className="heroActions">
            <a href="#act-1" className="actionPrimary"><span>{t.hero.enter}</span><i>↘</i></a>
            <a href="https://www.weareoneconnection.org" target="_blank" rel="noreferrer" className="actionText"><span>{t.hero.manifesto}</span><i>↗</i></a>
          </div>
        </div>
        <div className="heroMeta">
          <span>PROJECT / GENESIS 10</span>
          <span>01.3521° N · 103.8198° E</span>
          <span>SCROLL TO CONNECT</span>
        </div>
      </section>

      <section className="act conditionAct" id="act-1">
        <div className="shell">
          <ChapterHeader chapter={t.chapters[0]} />
          <div className="conditionStage" aria-hidden="true">
            {t.nodes.slice(0, 7).map((node, index) => (
              <span key={node.label} className={`isolatedNode isolated-${index + 1}`}>
                <i />{node.label}
              </span>
            ))}
            <div className="failedConnection line-1" />
            <div className="failedConnection line-2" />
            <div className="failedConnection line-3" />
            <div className="conditionPulse"><span>WAOC</span></div>
          </div>
          <Reveal className="conditionStatement">
            {isZh ? "碎片化制造摩擦。连接创造可能。" : "Fragmentation creates friction. Connection creates possibility."}
          </Reveal>
        </div>
      </section>

      <section className="act protocolAct" id="act-2">
        <div className="shell">
          <ChapterHeader chapter={t.chapters[1]} />
          <ProtocolEngine locale={locale} />
        </div>
      </section>

      <section className="act networkAct" id="act-3">
        <div className="shell">
          <ChapterHeader chapter={t.chapters[2]} />
          <InteractiveAtlas locale={locale} />
        </div>
      </section>

      <section className="act ecosystemAct" id="act-4">
        <div className="shell">
          <ChapterHeader chapter={t.chapters[3]} />
          <div className="ecosystemConstellation">
            <div className="ecosystemPole networkPole">
              <span className="microLabel">CONNECTION NETWORK</span>
              <h3>WAOC</h3>
              <div className="poleItems">{t.ecosystem.network.map(item => <span key={item}>{item}</span>)}</div>
            </div>
            <div className="sharedField">
              <div className="sharedCore"><span>ONEFIELD</span><small>{isZh ? "共享记忆与证据" : "SHARED MEMORY & EVIDENCE"}</small></div>
              {t.ecosystem.shared.map((item, index) => <span key={item} className={`sharedSatellite shared-${index + 1}`}>{item}</span>)}
              <i className="bridgeLine bridgeLeft" /><i className="bridgeLine bridgeRight" />
            </div>
            <div className="ecosystemPole intelligencePole">
              <span className="microLabel">INTELLIGENCE INFRASTRUCTURE</span>
              <h3>OneAI Labs</h3>
              <div className="poleItems">{t.ecosystem.intelligence.map(item => <span key={item}>{item}</span>)}</div>
            </div>
          </div>
          <div className="realitySpectrum">
            <span className="microLabel">REAL-WORLD EXPRESSION</span>
            <div>{t.ecosystem.reality.map((item, index) => <b key={item}><i>0{index + 1}</i>{item}</b>)}</div>
          </div>
        </div>
      </section>

      <section className="act participationAct" id="act-5">
        <div className="shell">
          <ChapterHeader chapter={t.chapters[4]} />
          <div className="rolePortal">
            {t.roles.map((role, index) => (
              <Reveal key={role.title} className="rolePath" delay={index * 60}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{role.title}</h3>
                <p>{role.body}</p>
                <i>↗</i>
              </Reveal>
            ))}
          </div>
          <div className="trustProtocol">
            <span className="microLabel">TRUST PROTOCOL</span>
            <div>
              {t.trust.map((item, index) => (
                <span key={item}><b>{item}</b>{index < t.trust.length - 1 ? <i>→</i> : null}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="act horizonAct" id="act-6">
        <div className="shell horizonShell">
          <ChapterHeader chapter={t.chapters[5]} centered />
          <div className="horizonSequence">
            {t.horizon.map((item, index) => <Reveal key={item} className="horizonStep" delay={index * 90}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b></Reveal>)}
          </div>
          <Reveal className="finalDeclaration" delay={250}>WE ARE ONE CONNECTION.</Reveal>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="shell footerLayout">
          <div className="footerStatement"><span className="brandNode large"><i /></span><h2>{t.footer}</h2></div>
          <div className="footerLinks">
            <a href="https://www.weareoneconnection.org" target="_blank" rel="noreferrer">Manifesto ↗</a>
            <a href="https://www.oneai.network" target="_blank" rel="noreferrer">OneAI Labs ↗</a>
            <a href="https://github.com/weareoneconnection" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://x.com/WAOCConnectOne" target="_blank" rel="noreferrer">X ↗</a>
          </div>
          <div className="footerLegal"><span>WAOC / V10</span><span>CONNECTED INTELLIGENCE INTERFACE</span></div>
        </div>
      </footer>
    </main>
  );
}

function ChapterHeader({ chapter, centered = false }: { chapter: { kicker: string; title: string; body: string }; centered?: boolean }) {
  return (
    <div className={`chapterHeader ${centered ? "isCentered" : ""}`}>
      <Reveal className="chapterKicker">{chapter.kicker}</Reveal>
      <Reveal as="h2" delay={70}>{chapter.title}</Reveal>
      <Reveal as="p" delay={130}>{chapter.body}</Reveal>
    </div>
  );
}
