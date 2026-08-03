import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FALLBACK_BASE = "https://onefield.vercel.app";

export async function GET() {
  const base = process.env.ONEFIELD_BASE_URL || FALLBACK_BASE;

  try {
    const res = await fetch(`${base}/api/network-preview`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000)
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
