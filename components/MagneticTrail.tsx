"use client";

import { useEffect, useRef } from "react";

const DOT_COUNT = 20;
const ACCENT = "#ff6b4a";
const GLOW = "rgba(255, 107, 74, 0.55)";
const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor]';

export function MagneticTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100, w: 14, h: 14, r: 999 });
  const positions = useRef(
    Array.from({ length: DOT_COUNT }, () => ({ x: -100, y: -100 })),
  );
  const visible = useRef(false);
  const hoveredEl = useRef<Element | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.style.cursor = "none";

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        if (containerRef.current) containerRef.current.style.opacity = "1";
      }
      const t = e.target as Element | null;
      let hover = t?.closest?.(HOVER_SELECTOR) ?? null;
      if (hover && hover.closest("[data-no-cursor]")) hover = null;
      hoveredEl.current = hover;
    };

    const onLeave = () => {
      visible.current = false;
      hoveredEl.current = null;
      if (containerRef.current) containerRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Trail dots — hidden when hovering an interactive element
      const trailHidden = !!hoveredEl.current;
      let px = target.current.x;
      let py = target.current.y;
      for (let i = 0; i < DOT_COUNT; i++) {
        const pos = positions.current[i];
        const stiffness = 0.2 + (1 - i / DOT_COUNT) * 0.22;
        pos.x += (px - pos.x) * stiffness;
        pos.y += (py - pos.y) * stiffness;
        const el = dotsRef.current[i];
        if (el) {
          const scale = 1 - i / DOT_COUNT;
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
          el.style.opacity = trailHidden
            ? "0"
            : String(Math.max(0.25, 1 - i / DOT_COUNT));
        }
        px = pos.x;
        py = pos.y;
      }

      // Ring target: either the hovered element's rect, or follow mouse
      let tx = target.current.x;
      let ty = target.current.y;
      let tw = 14;
      let th = 14;
      let tr = 999;
      if (hoveredEl.current) {
        const rect = hoveredEl.current.getBoundingClientRect();
        tx = rect.left + rect.width / 2;
        ty = rect.top + rect.height / 2;
        tw = rect.width + 10;
        th = rect.height + 10;
        const styles = window.getComputedStyle(hoveredEl.current);
        const parsed = parseFloat(styles.borderRadius);
        tr = Number.isFinite(parsed) && parsed > 0 ? parsed + 5 : 12;
      }

      const ease = 0.22;
      ringPos.current.x += (tx - ringPos.current.x) * ease;
      ringPos.current.y += (ty - ringPos.current.y) * ease;
      ringPos.current.w += (tw - ringPos.current.w) * ease;
      ringPos.current.h += (th - ringPos.current.h) * ease;
      ringPos.current.r += (tr - ringPos.current.r) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.width = `${ringPos.current.w}px`;
        ringRef.current.style.height = `${ringPos.current.h}px`;
        ringRef.current.style.borderRadius = `${ringPos.current.r}px`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity 200ms ease",
      }}
    >
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: `1.5px solid ${ACCENT}`,
          boxShadow: `0 0 12px ${GLOW}`,
          willChange: "transform, width, height, border-radius",
        }}
      />
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: ACCENT,
            opacity: Math.max(0.25, 1 - i / DOT_COUNT),
            boxShadow: `0 0 ${10 + i * 0.5}px ${GLOW}`,
            filter: `blur(${i * 0.35}px)`,
            willChange: "transform, opacity",
            transition: "opacity 180ms ease",
          }}
        />
      ))}
    </div>
  );
}
