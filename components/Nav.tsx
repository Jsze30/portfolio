"use client";

import { motion } from "motion/react";
import type { MouseEvent } from "react";

// Tweak destinations here.
// - `href`: which section id this link targets (must match an `id="..."` on a section).
// - `scrollProgress`: where inside that section to land, as a fraction of the section's
//    own height. 0 = top of section, 1 = bottom of section.
//    Can be a single number, or { mobile, desktop } for per-breakpoint targets.
// - `offsetPx`: extra pixel nudge after the progress target. Negative = stop short.
type ScrollTarget = number | { mobile: number; desktop: number };

const items: {
  label: string;
  href: string;
  scrollProgress: ScrollTarget;
  offsetPx: number;
}[] = [
  { label: "about", href: "#about", scrollProgress: 0.3, offsetPx: 0 },
  {
    label: "work",
    href: "#work",
    scrollProgress: { mobile: 0.341, desktop: 0.39 },
    offsetPx: 0,
  },
  { label: "contact", href: "#contact", scrollProgress: 0, offsetPx: 0 },
];

const ease = [0.22, 1, 0.36, 1] as const;

function handleClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  scrollProgress: ScrollTarget,
  offsetPx: number,
) {
  const id = href.replace(/^#/, "");
  // Some sections (e.g. Act3) render two copies for mobile and desktop, both
  // with the same id. Find the one that's actually visible.
  const candidates = document.querySelectorAll<HTMLElement>(`[id="${id}"]`);
  const el =
    Array.from(candidates).find(
      (node) => node.getBoundingClientRect().height > 0,
    ) ?? candidates[0];
  if (!el) return;
  e.preventDefault();
  const isMobile = window.innerWidth < 768;
  const progress =
    typeof scrollProgress === "number"
      ? scrollProgress
      : isMobile
        ? scrollProgress.mobile
        : scrollProgress.desktop;
  const rect = el.getBoundingClientRect();
  const sectionTop = rect.top + window.scrollY;
  const top = sectionTop + rect.height * progress + offsetPx;
  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", href);
}

export function Nav() {
  return (
    <nav className="absolute top-10 right-[6vw] z-50 flex flex-col items-start gap-1 text-sm md:top-[6vw]">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 1.3 + i * 0.08,
            ease,
          }}
        >
          <a
            href={item.href}
            onClick={(e) =>
              handleClick(e, item.href, item.scrollProgress, item.offsetPx)
            }
            className="flex cursor-pointer items-center gap-2 text-fg/85 transition-transform duration-300 ease-out hover:translate-x-5 hover:text-fg"
          >
            <span aria-hidden className="select-none text-fg-muted">
              ──
            </span>
            <span>{item.label}</span>
          </a>
        </motion.div>
      ))}
    </nav>
  );
}
