"use client";

import { useEffect, useState } from "react";

export type ScrollState = {
  progress: number;
  act: number;
  reducedMotion: boolean;
};

export function useScrollDirector(actCount = 6): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, act: 0, reducedMotion: false });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const act = Math.min(actCount - 1, Math.floor(progress * actCount));
      setState({ progress, act, reducedMotion: media.matches });
    };

    const request = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    media.addEventListener("change", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      media.removeEventListener("change", request);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [actCount]);

  return state;
}
