"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { projects, type Project } from "@/lib/projects";
import { scrollToImmediate } from "@/components/SmoothScroll";

const EASE = [0.22, 1, 0.36, 1] as const;
const featured = projects.filter((p) => p.featured);
const featuredDisplayId = (index: number) =>
  String(index + 1).padStart(2, "0");

type Direction = "left" | "right";

type LetterConfig = {
  char: string;
  from: Direction;
  start: number;
  end: number;
};

const LETTERS: LetterConfig[] = [
  { char: "W", from: "right", start: 0.04, end: 0.2 },
  { char: "O", from: "right", start: 0.11, end: 0.22 },
  { char: "R", from: "left", start: 0.17, end: 0.3 },
  { char: "K", from: "left", start: 0.2, end: 0.32 },
];

type CardWindow = {
  side: Direction;
  start: number;
  end: number;
};

const CARD_WINDOWS: CardWindow[] = [
  { side: "left", start: 0.32, end: 0.57 },
  { side: "right", start: 0.43, end: 0.67 },
  { side: "left", start: 0.53, end: 0.8 },
  { side: "right", start: 0.64, end: 0.9 },
];

function Letter({
  config,
  progress,
}: {
  config: LetterConfig;
  progress: MotionValue<number>;
}) {
  const offscreen = config.from === "right" ? "120vw" : "-120vw";
  const x = useTransform(
    progress,
    [config.start, config.end],
    [offscreen, "0vw"],
    { clamp: true },
  );
  const opacity = useTransform(
    progress,
    [config.start, config.start + 0.02, config.end - 0.05, config.end],
    [0, 0.55, 0.55, 0.55],
  );

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block will-change-transform"
      aria-hidden
    >
      {config.char}
    </motion.span>
  );
}

function ProjectCard({
  project,
  displayId,
  window: w,
  progress,
}: {
  project: Project;
  displayId: string;
  window: CardWindow;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [w.start, w.end], ["115vh", "-80vh"]);

  const sideClass =
    w.side === "left"
      ? "left-[6vw] items-start text-left"
      : "right-[6vw] items-end text-right";

  return (
    <motion.a
      href={project.links.primary ?? project.links.github ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-no-cursor
      style={{ y }}
      className={`group absolute top-0 flex w-[48vw] flex-col gap-[1.04vw] will-change-transform ${sideClass}`}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4 / 3",
          borderRadius: "1.67vw",
          boxShadow: "0 2.08vw 5.56vw rgba(15, 14, 20, 0.10)",
          background: "var(--rule)",
        }}
      >
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 90vw, 48vw"
          className="object-cover"
          priority={false}
        />
      </motion.div>

      <div className="flex w-full items-baseline justify-between gap-[1.25vw]">
        <div className="flex items-baseline gap-[0.83vw]">
          <span
            className="font-display tabular-nums text-fg-muted"
            style={{ fontSize: "1.15vw", letterSpacing: "-0.02em" }}
          >
            {displayId}
          </span>
          <h3
            className="font-display font-medium text-fg"
            style={{
              fontSize: "2.4vw",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {project.title}
          </h3>
        </div>
        <span
          className="shrink-0 uppercase text-fg-muted"
          style={{
            fontSize: "0.76vw",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          {project.category}
        </span>
      </div>
    </motion.a>
  );
}

function MobileProjectCard({
  project,
  displayId,
}: {
  project: Project;
  displayId: string;
}) {
  return (
    <a
      href={project.links.primary ?? project.links.github ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-no-cursor
      className="group flex w-full flex-col gap-3"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4 / 3",
          borderRadius: "16px",
          boxShadow: "0 18px 50px rgba(15, 14, 20, 0.10)",
          background: "var(--rule)",
        }}
      >
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          sizes="88vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="flex w-full items-baseline justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-3">
          <span
            className="font-display tabular-nums text-fg-muted"
            style={{ fontSize: "0.95rem", letterSpacing: "-0.02em" }}
          >
            {displayId}
          </span>
          <h3
            className="min-w-0 truncate font-display font-medium text-fg"
            style={{
              fontSize: "clamp(1.25rem, 5vw, 1.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {project.title}
          </h3>
        </div>
        <span
          className="shrink-0 uppercase text-fg-muted"
          style={{
            fontSize: "10px",
            letterSpacing: "0.16em",
            fontWeight: 500,
          }}
        >
          {project.category}
        </span>
      </div>
    </a>
  );
}

type WipeRect = { top: number; left: number; width: number; height: number };

function ViewAllPill({ className = "" }: { className?: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [wipe, setWipe] = useState<WipeRect | null>(null);

  useEffect(() => {
    router.prefetch("/work");
  }, [router]);

  const handleClick = () => {
    if (reduce || !btnRef.current) {
      router.push("/work", { scroll: false });
      return;
    }
    const r = btnRef.current.getBoundingClientRect();
    setWipe({ top: r.top, left: r.left, width: r.width, height: r.height });
  };

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        data-no-cursor
        data-view-all-pill
        onClick={handleClick}
        style={{ boxShadow: "0 8px 24px rgba(15, 14, 20, 0.10)" }}
        className={`inline-flex items-center gap-1 rounded-full border border-fg/30 bg-bg px-8 py-4 font-body font-medium text-fg transition-all hover:border-fg hover:shadow-[0_12px_32px_rgba(15,14,20,0.14)] md:px-8 md:py-4 ${className}`}
      >
        View all
        <span className="tabular-nums text-fg">({projects.length})</span>
      </button>
      {wipe &&
        createPortal(
          <motion.div
            className="fixed z-[9998]"
            style={{
              background: "var(--bg)",
              borderStyle: "solid",
              borderWidth: 2,
            }}
            initial={{
              top: wipe.top,
              left: wipe.left,
              width: wipe.width,
              height: wipe.height,
              borderRadius: 999,
              borderColor: "rgba(15, 14, 20, 0.65)",
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
              borderColor: [
                "rgba(15, 14, 20, 0.65)",
                "rgba(15, 14, 20, 0.65)",
                "rgba(15, 14, 20, 0)",
              ],
            }}
            transition={{
              duration: 0.25,
              ease: EASE,
              borderColor: { duration: 0.24, times: [0, 0.8, 1] },
            }}
            onAnimationComplete={() => router.push("/work", { scroll: false })}
          />,
          document.body,
        )}
    </div>
  );
}

function DesktopViewAllPill({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.8, 0.87, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.8, 0.87], ["20px", "0px"]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <ViewAllPill />
    </motion.div>
  );
}

function MobileViewAllPill({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.7, 0.8, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.7, 0.8], ["16px", "0px"]);
  // Only capture taps once the pill is actually visible — otherwise the
  // invisible pill (which now sits above the cards) would swallow taps on
  // cards scrolling through the viewport centre.
  const pointerEvents = useTransform(opacity, (o) =>
    o > 0.5 ? "auto" : "none",
  );
  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <ViewAllPill />
    </motion.div>
  );
}

export function Act3() {
  const desktopRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"],
  });

  // Returning from /work: the exact reverse of the pill's expansion wipe.
  // The overlay mounts already covering the viewport (lazy initializer, so
  // it's there on the very first paint and the route swap is never visible),
  // then collapses into the pill once the scroll jump below has settled.
  const [returnWipe, setReturnWipe] = useState(
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem("return-wipe") === "1",
  );
  const [returnTarget, setReturnTarget] = useState<WipeRect | null>(null);
  // Collapse finished — cross-fade the overlay out so the faux pill dissolves
  // into the real one instead of hard-cutting.
  const [returnDone, setReturnDone] = useState(false);
  // Whether this mount is a return-from-work. Stays true for the whole
  // sequence (unlike `returnWipe`, which flips off when the overlay unmounts)
  // so the WORK text stays hidden until we explicitly reveal it.
  const [isReturn] = useState(
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem("return-wipe") === "1",
  );
  // Flips true only after the pill is fully shown, so the WORK text fades in
  // from the pill outwards *after* the collapse rather than during it.
  const [revealText, setRevealText] = useState(false);
  // The sessionStorage flags are one-shot, but React's dev double-mount runs
  // this effect twice — cache them in a ref on first read so the second run
  // still knows to jump/collapse instead of finding the flags already cleared.
  const returnFlags = useRef<{ scroll: boolean; wipe: boolean } | null>(null);

  // Returning from /work: jump straight to the "View all" pill moment.
  useEffect(() => {
    if (!returnFlags.current) {
      returnFlags.current = {
        scroll: sessionStorage.getItem("scroll-to-pill") === "1",
        wipe: sessionStorage.getItem("return-wipe") === "1",
      };
      sessionStorage.removeItem("scroll-to-pill");
      sessionStorage.removeItem("return-wipe");
    }
    if (!returnFlags.current.scroll) return;
    const doReturn = returnFlags.current.wipe;

    const jump = () => {
      const isMobile = window.innerWidth < 768;
      const el = isMobile ? mobileRef.current : desktopRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const progress = isMobile ? 0.97 : 0.93;
      scrollToImmediate(top + (rect.height - window.innerHeight) * progress);
    };

    // Jump now, then re-apply next frame in case layout settles after mount.
    jump();
    const raf = requestAnimationFrame(jump);

    if (!doReturn) return () => cancelAnimationFrame(raf);

    // Only measure the pill (and start the collapse) once the jump AND the
    // sticky pinning have fully settled — measuring mid-settle captures the
    // pill lower than its final resting spot, so the overlay would land below
    // the real pill. The short hold also softens the reveal's start.
    const timer = setTimeout(() => {
      jump();
      const pill = Array.from(
        document.querySelectorAll<HTMLElement>("[data-view-all-pill]"),
      ).find((el) => el.getBoundingClientRect().width > 0);
      if (!pill) {
        setReturnWipe(false);
        return;
      }
      const r = pill.getBoundingClientRect();
      setReturnTarget({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    }, 90);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <section
        id="work"
        ref={mobileRef}
        className="relative z-0 -mt-[180vh] block w-full md:hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
            <motion.div
              className="w-full"
              style={{ willChange: "clip-path, opacity" }}
              initial={
                isReturn
                  ? {
                      clipPath: "circle(0% at 50% 50%)",
                      WebkitClipPath: "circle(0% at 50% 50%)",
                      opacity: 0,
                    }
                  : false
              }
              animate={
                isReturn
                  ? revealText
                    ? {
                        clipPath: "circle(150% at 50% 50%)",
                        WebkitClipPath: "circle(150% at 50% 50%)",
                        opacity: 1,
                      }
                    : {
                        clipPath: "circle(0% at 50% 50%)",
                        WebkitClipPath: "circle(0% at 50% 50%)",
                        opacity: 0,
                      }
                  : undefined
              }
              transition={{ duration: 1.5, ease: EASE }}
            >
              <h2
                className="relative z-0 flex w-full justify-between whitespace-nowrap font-display font-medium leading-none text-fg"
                style={{
                  fontSize: "32vw",
                  letterSpacing: "-0.04em",
                  fontOpticalSizing: "auto",
                }}
              >
                <span className="sr-only">Work</span>
                {LETTERS.map((letter, i) => (
                  <Letter key={i} config={letter} progress={mobileProgress} />
                ))}
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6 px-[6vw] pt-[150vh] pb-[100vh]">
          {featured.map((project, i) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              displayId={featuredDisplayId(i)}
            />
          ))}
        </div>

        {/* Pill lives in its own layer above the cards. Because position:sticky
            creates a stacking context, keeping the pill in the WORK-text layer
            trapped it below the cards' z-10, so taps never reached it. */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="sticky top-0 h-screen w-full">
            <MobileViewAllPill progress={mobileProgress} />
          </div>
        </div>
      </section>

      <section
        id="work"
        ref={desktopRef}
        className="relative z-0 hidden h-[900vh] w-full md:-mt-[200vh] md:block"
        aria-hidden
      >
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <motion.div
            className="w-full"
            style={{ willChange: "clip-path, opacity" }}
            initial={
              isReturn
                ? {
                    clipPath: "circle(0% at 50% 50%)",
                    WebkitClipPath: "circle(0% at 50% 50%)",
                    opacity: 0,
                  }
                : false
            }
            animate={
              isReturn
                ? revealText
                  ? {
                      clipPath: "circle(150% at 50% 50%)",
                      WebkitClipPath: "circle(150% at 50% 50%)",
                      opacity: 1,
                    }
                  : {
                      clipPath: "circle(0% at 50% 50%)",
                      WebkitClipPath: "circle(0% at 50% 50%)",
                      opacity: 0,
                    }
                : undefined
            }
            transition={{ duration: 1.5, ease: EASE }}
          >
            <h2
              className="relative z-0 flex w-full justify-between whitespace-nowrap font-display font-medium leading-none text-fg"
              style={{
                fontSize: "32vw",
                letterSpacing: "-0.04em",
                fontOpticalSizing: "auto",
              }}
            >
              <span className="sr-only">Work</span>
              {LETTERS.map((letter, i) => (
                <Letter key={i} config={letter} progress={scrollYProgress} />
              ))}
            </h2>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="pointer-events-auto relative mx-auto h-full w-full">
              {featured.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  displayId={featuredDisplayId(i)}
                  window={CARD_WINDOWS[i]}
                  progress={scrollYProgress}
                />
              ))}
              <DesktopViewAllPill progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </section>

      {returnWipe &&
        createPortal(
          <motion.div
            className="fixed z-[9998]"
            style={{
              background: "var(--bg)",
              borderStyle: "solid",
              borderWidth: 2,
            }}
            initial={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
              borderColor: "rgba(15, 14, 20, 0)",
              opacity: 1,
            }}
            animate={
              returnTarget
                ? {
                    top: returnTarget.top,
                    left: returnTarget.left,
                    width: returnTarget.width,
                    height: returnTarget.height,
                    borderRadius: 999,
                    borderColor: returnDone
                      ? "rgba(15, 14, 20, 0.65)"
                      : [
                          "rgba(15, 14, 20, 0)",
                          "rgba(15, 14, 20, 0.65)",
                          "rgba(15, 14, 20, 0.65)",
                        ],
                    opacity: returnDone ? 0 : 1,
                  }
                : undefined
            }
            transition={{
              duration: 0.25,
              ease: "easeInOut",
              borderColor: { duration: 0.1, times: [0, 0.2, 1] },
              opacity: { duration: 0.05, ease: "linear" },
            }}
            onAnimationComplete={() => {
              if (returnDone) {
                // Pill is fully revealed — now grow the WORK text out of it.
                setReturnWipe(false);
                setRevealText(true);
              } else {
                setReturnDone(true);
              }
            }}
          />,
          document.body,
        )}
    </>
  );
}
