"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { projects, type Project } from "@/lib/projects";
import { Act4 } from "@/components/acts/Act4";
import { scrollToImmediate } from "@/components/SmoothScroll";

const EASE = [0.22, 1, 0.36, 1] as const;
const TITLE = "ALL WORK";

// The first N rows get the timed entrance stagger on load; everything after
// stays hidden until scrolled to.
const INITIAL_ROWS = 4;
// The next row reveals when the last revealed row's top climbs above this
// fraction of the viewport height (0.75 = 75vh line). Lower = reveals later
// (previous row must be higher on screen); higher = reveals sooner.
const REVEAL_AT_VH = 0.68;

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const heroLetter: Variants = {
  hidden: { opacity: 0, y: "-0.25em" },
  show: { opacity: 1, y: "0em", transition: { duration: 0.7, ease: EASE } },
};

const ROW_DELAY_BASE = 1.2;
const ROW_STAGGER = 0.2;
// The gate opens when the last intro row *starts* animating; the queue's
// tick then lands the next row exactly one stagger beat later, keeping the
// cascade rhythm unbroken across the intro/scroll boundary.
const INTRO_TOTAL_MS =
  (ROW_DELAY_BASE + (INITIAL_ROWS - 1) * ROW_STAGGER) * 1000;

const GithubIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

function primaryLabel(url: string) {
  return url.includes("devpost.com") ? "devpost" : "live!";
}

function CursorTip({ hovered }: { hovered: Project | null }) {
  const primary = hovered?.links.primary;
  const label = primary ? primaryLabel(primary) : null;
  // Keep the last label so the text persists through the fade-out.
  const lastRef = useRef<string>("");
  if (label) lastRef.current = label;
  const shown = label ?? lastRef.current;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!shown) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9997] hidden md:block"
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: label ? 1 : 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      aria-hidden
    >
      <div className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-body text-sm font-medium text-fg-muted">
        {shown} ↗
      </div>
    </motion.div>
  );
}

function WorkRow({
  project,
  onHover,
}: {
  project: Project;
  onHover: (p: Project | null) => void;
}) {
  const primary = project.links.primary;

  const open = () => {
    if (primary) window.open(primary, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      role={primary ? "link" : undefined}
      tabIndex={primary ? 0 : undefined}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter") open();
      }}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      data-cursor-hide={primary ? "" : undefined}
      className={`group flex flex-col gap-2 py-7 md:flex-row md:items-baseline md:gap-[2.5vw] md:py-9 ${
        primary ? "cursor-pointer md:cursor-none" : ""
      }`}
    >
      <div className="flex min-w-0 items-baseline gap-4 transition-transform duration-300 ease-out group-hover:translate-x-8 md:flex-1 md:gap-[1.5vw]">
        <span className="shrink-0 font-body text-sm tabular-nums text-fg-muted">
          {project.id}
        </span>
        <h2
          className="min-w-0 truncate font-display font-medium text-fg transition-colors duration-300 group-hover:text-accent"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {project.title}
        </h2>
      </div>

      <div className="flex items-baseline gap-6 pl-9 md:shrink-0 md:pl-0">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => onHover(null)}
            onMouseLeave={() => onHover(project)}
            aria-label={`${project.title} on GitHub`}
            className="-m-[10px] inline-flex h-[38px] w-[38px] items-center justify-center self-center text-fg-muted transition-all duration-300 hover:text-fg md:opacity-0 md:group-hover:opacity-100"
          >
            {GithubIcon}
          </a>
        )}
        <span
          className="uppercase text-fg-muted"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.16em",
            fontWeight: 500,
          }}
        >
          {project.category}
        </span>
        <span className="font-body text-sm tabular-nums text-fg-muted">
          {project.year}
        </span>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<Project | null>(null);
  // Rows show only up to revealedCount. It advances when the last revealed
  // row's position crosses the REVEAL_AT_VH line, never before the intro
  // stagger finishes — so the cascade is driven by scroll position.
  const [introDone, setIntroDone] = useState(false);
  const [revealedCount, setRevealedCount] = useState(INITIAL_ROWS);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const all = [...projects].sort((a, b) => a.id.localeCompare(b.id));

  // Lenis persists across routes, so the homepage's deep scroll position
  // carries over — reset to the top on arrival, through Lenis itself so its
  // internal animation state can't scroll us back down. Runs before paint
  // (useLayoutEffect) so nothing measures against the stale position.
  useLayoutEffect(() => {
    scrollToImmediate(0);
  }, []);

  useEffect(() => {
    if (reduce) {
      setIntroDone(true);
      return;
    }
    const t = setTimeout(() => setIntroDone(true), INTRO_TOTAL_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  // Scroll-driven reveal: release the next row whenever the last revealed
  // row's top has climbed above the REVEAL_AT_VH line. Cascades on fast
  // scrolls because each newly revealed row is re-checked in the same pass.
  useEffect(() => {
    if (!introDone) return;
    const total = all.length;
    const check = () => {
      setRevealedCount((current) => {
        let count = current;
        while (count < total) {
          const lastRow = rowRefs.current[count - 1];
          if (!lastRow) break;
          const top = lastRow.getBoundingClientRect().top;
          if (top < window.innerHeight * REVEAL_AT_VH) count += 1;
          else break;
        }
        return count;
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [introDone, all.length]);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const handleBack = () => {
    sessionStorage.setItem("scroll-to-pill", "1");
    // Ask Act3 to play the reverse of the pill's expansion wipe on arrival.
    if (!reduce) sessionStorage.setItem("return-wipe", "1");
    router.push("/", { scroll: false });
  };

  return (
    <main className="relative min-h-screen w-full">
      <button
        type="button"
        data-no-cursor
        onClick={handleBack}
        className="absolute left-[6vw] top-10 z-20 cursor-pointer text-sm font-medium text-fg-muted transition-all duration-300 ease-out hover:translate-x-5 hover:text-fg"
      >
        ← back
      </button>

      <header className="px-[6vw] pt-[16vh]">
        <motion.h1
          variants={reduce ? undefined : heroContainer}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="flex items-baseline whitespace-nowrap font-display font-medium leading-none text-fg"
          style={{
            fontSize: "clamp(3rem, 14vw, 14rem)",
            letterSpacing: "-0.03em",
            opacity: 0.55,
          }}
        >
          <span className="sr-only">All work</span>
          {TITLE.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={reduce ? undefined : heroLetter}
              className="inline-block will-change-transform"
              aria-hidden
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.h1>
      </header>

      <div className="mt-[6vh] px-[6vw] pb-[12vh] md:mt-[10vh]">
        {all.map((project, i) => {
          const timed = i < INITIAL_ROWS;
          const shown = timed || revealedCount > i;
          return (
            <motion.div
              key={project.id}
              ref={(el: HTMLDivElement | null) => {
                rowRefs.current[i] = el;
              }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={!reduce && shown ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: timed ? ROW_DELAY_BASE + i * ROW_STAGGER : 0,
              }}
              className="border-t border-rule last:border-b"
            >
              <WorkRow project={project} onHover={setHovered} />
            </motion.div>
          );
        })}
      </div>

      <CursorTip hovered={hovered} />

      <Act4 />
    </main>
  );
}
