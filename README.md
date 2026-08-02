# WAOC V10 — Connected Intelligence Interface

A clean, production-oriented rebuild of `waoc.io`, created from the WAOC Design System 1.0 rather than inherited website code.

## Positioning

**Connection becomes coordination.**

WAOC is the living coordination network where people, AI agents, organizations, knowledge and missions connect to create verifiable real-world value.

## Experience architecture

1. The Condition
2. The Coordination Protocol
3. The Living Network Atlas
4. WAOC × OneAI Labs Ecosystem
5. Participation and Trust
6. Connected Intelligence Horizon

## Design-system implementation

- Deep Space, Warm White and Signal Orange visual language
- Node, Line, Orbit, Field and Pulse primitives
- Connection, Flow, Grow, Orbit and Transform motion vocabulary
- One thought and one visual protagonist per scene
- Human agency, evidence and trust remain explicit
- Reduced-motion and mobile rendering support

## Stack

- Next.js 15.5.22
- React 19.1
- TypeScript
- Three.js
- React Three Fiber
- Native CSS and IntersectionObserver motion

No Framer Motion dependency is used, avoiding the Motion package mismatch that affected V9.

## Run

```bash
npm install --registry=https://registry.npmjs.org
npm run typecheck
npm run build
npm run dev
```

## Deploy

Set:

```env
NEXT_PUBLIC_SITE_URL=https://waoc.io
```

The project is suitable for Vercel, Railway or any Node.js hosting platform that supports Next.js.
