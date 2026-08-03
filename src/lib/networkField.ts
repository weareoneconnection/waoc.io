"use client";

import { useEffect, useState } from "react";

export type LeaderboardRow = {
  wallet: string;
  points: number;
  completed?: number;
  missions?: number;
  updatedAt?: number;
};

export type LeaderboardResponse = {
  ok: boolean;
  rows?: LeaderboardRow[];
  participants?: number;
  top1?: LeaderboardRow | null;
  error?: string;
};

type RawFieldNode = {
  id?: string | number;
  label?: string;
  name?: string;
  displayName?: string;
  score?: number;
  trust?: number;
  connections?: number;
  role?: string;
};

type RawFieldEdge = {
  id?: string | number;
  source?: string | number;
  target?: string | number;
  fromBuilderId?: string | number;
  toBuilderId?: string | number;
  from?: string | number;
  to?: string | number;
  weight?: number;
  strength?: number;
};

export type FieldStats = {
  builders: number;
  signals: number;
  links: number;
  circles: number;
};

export type FieldPreviewResponse = {
  ok: boolean;
  stats?: FieldStats;
  graph?: {
    nodes?: RawFieldNode[];
    edges?: RawFieldEdge[];
  };
  error?: string;
};

export type GraphNodeView = {
  id: string;
  label: string;
  x: number;
  y: number;
  degree: number;
  isCore: boolean;
};

export type GraphEdgeView = {
  id: string;
  from: string;
  to: string;
  strength: number;
};

export function maskWallet(wallet?: string) {
  const value = (wallet || "").trim();
  if (!value) return "—";
  if (value.length <= 10) return value;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

export function cutLabel(text?: string, max = 15) {
  const value = (text || "").trim();
  if (!value) return "Builder";
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}…`;
}

export function compactNumber(value?: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  if (value >= 1000) {
    const k = value / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return String(Math.trunc(value));
}

/**
 * Ranks the raw OneField snapshot down to a readable constellation: one core node
 * plus up to eight satellites placed on the same elliptical orbit the atlas uses.
 */
export function buildFieldConstellation(graph?: FieldPreviewResponse["graph"] | null): {
  nodes: GraphNodeView[];
  edges: GraphEdgeView[];
} {
  const rawNodes = Array.isArray(graph?.nodes) ? graph.nodes : [];
  const rawEdges = Array.isArray(graph?.edges) ? graph.edges : [];

  if (!rawNodes.length) {
    return { nodes: [], edges: [] };
  }

  const nodes = rawNodes.map((node, index) => ({
    id: String(node.id ?? `n-${index}`),
    label: node.label || node.name || node.displayName || `Builder ${index + 1}`,
    score: Number(node.score ?? 0),
    trust: Number(node.trust ?? 0),
    connections: Number(node.connections ?? 0)
  }));

  const edges = rawEdges
    .map((edge, index) => ({
      id: String(edge.id ?? `e-${index}`),
      from: String(edge.source ?? edge.fromBuilderId ?? edge.from ?? ""),
      to: String(edge.target ?? edge.toBuilderId ?? edge.to ?? ""),
      strength: Number(edge.weight ?? edge.strength ?? 0)
    }))
    .filter(edge => edge.from && edge.to && edge.from !== edge.to);

  const degree = new Map<string, number>();
  for (const node of nodes) degree.set(node.id, 0);
  for (const edge of edges) {
    if (degree.has(edge.from)) degree.set(edge.from, (degree.get(edge.from) || 0) + 1);
    if (degree.has(edge.to)) degree.set(edge.to, (degree.get(edge.to) || 0) + 1);
  }

  const ranked = nodes
    .map(node => ({
      ...node,
      importance:
        node.score * 0.42 +
        node.trust * 0.18 +
        node.connections * 10 +
        (degree.get(node.id) || 0) * 12
    }))
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 9);

  const rankedIds = new Set(ranked.map(node => node.id));

  const localEdges = edges
    .filter(edge => rankedIds.has(edge.from) && rankedIds.has(edge.to))
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 14);

  const localDegree = new Map<string, number>();
  for (const node of ranked) localDegree.set(node.id, 0);
  for (const edge of localEdges) {
    localDegree.set(edge.from, (localDegree.get(edge.from) || 0) + 1);
    localDegree.set(edge.to, (localDegree.get(edge.to) || 0) + 1);
  }

  const core =
    ranked
      .slice()
      .sort((a, b) => {
        const da = localDegree.get(a.id) || 0;
        const db = localDegree.get(b.id) || 0;
        if (db !== da) return db - da;
        return b.importance - a.importance;
      })[0] || ranked[0];

  const satellites = ranked.filter(node => node.id !== core.id).slice(0, 8);

  const positioned: GraphNodeView[] = [
    {
      id: core.id,
      label: cutLabel(core.label, 18),
      x: 50,
      y: 50,
      degree: localDegree.get(core.id) || 0,
      isCore: true
    }
  ];

  // Elliptical orbit, matching the .atlasOrbit proportions used elsewhere in V10.
  satellites.forEach((node, index) => {
    const angle = (index / satellites.length) * Math.PI * 2 - Math.PI / 2;
    positioned.push({
      id: node.id,
      label: cutLabel(node.label),
      x: 50 + Math.cos(angle) * 34,
      y: 50 + Math.sin(angle) * 30,
      degree: localDegree.get(node.id) || 0,
      isCore: false
    });
  });

  const finalIds = new Set(positioned.map(node => node.id));

  return {
    nodes: positioned,
    edges: localEdges
      .filter(edge => finalIds.has(edge.from) && finalIds.has(edge.to))
      .map(edge => ({ ...edge, strength: edge.strength || 60 }))
  };
}

export type NetworkData = {
  leaderboard: LeaderboardRow[];
  participants: number;
  field: FieldPreviewResponse | null;
  loading: boolean;
  failed: boolean;
};

export function useNetworkData(): NetworkData {
  const [state, setState] = useState<NetworkData>({
    leaderboard: [],
    participants: 0,
    field: null,
    loading: true,
    failed: false
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [leaderboardRes, fieldRes] = await Promise.all([
          fetch("/api/network/leaderboard", { cache: "no-store" }),
          fetch("/api/network/field", { cache: "no-store" })
        ]);

        const leaderboardJson: LeaderboardResponse = await leaderboardRes.json();
        const fieldJson: FieldPreviewResponse = await fieldRes.json();

        if (!active) return;

        setState({
          leaderboard: Array.isArray(leaderboardJson.rows) ? leaderboardJson.rows.slice(0, 5) : [],
          participants: leaderboardJson.participants ?? 0,
          field: fieldJson,
          loading: false,
          failed: leaderboardJson.ok === false && fieldJson.ok === false
        });
      } catch {
        if (active) setState(current => ({ ...current, loading: false, failed: true }));
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
