"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

// Shared handle so pages can jump scroll position without fighting
// Lenis's internal animation state (plain window.scrollTo gets overridden).
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToImmediate(top: number) {
  const lenis = lenisRef.current;
  if (lenis) {
    // Lenis caches the document height via an async ResizeObserver; after a
    // route change to a taller page it clamps jumps to the stale height
    // unless we force a synchronous re-measure first.
    lenis.resize();
    lenis.scrollTo(top, { immediate: true, force: true });
  }
  window.scrollTo({ top, behavior: "auto" });
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
