"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { projects, type Project } from "@/lib/projects";

type Direction = "left" | "right";

type LetterConfig = {
  char: string;
  from: Direction;
  start: number;
  end: number;
};

const LETTERS: LetterConfig[] = [
  // { char: "W", from: "right", start: 0.04, end: 0.42 },
  // { char: "O", from: "right", start: 0.11, end: 0.46 },
  // { char: "R", from: "left", start: 0.17, end: 0.52 },
  // { char: "K", from: "left", start: 0.23, end: 0.59 },
  { char: "W", from: "right", start: 0.04, end: 0.2 },
  { char: "O", from: "right", start: 0.11, end: 0.24 },
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
  window: w,
  progress,
}: {
  project: Project;
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
      href={project.links.live ?? project.links.github ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ y }}
      className={`group absolute top-0 flex w-[48vw] max-w-[640px] flex-col gap-5 will-change-transform ${sideClass}`}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4 / 3",
          borderRadius: "24px",
          boxShadow: "0 30px 80px rgba(15, 14, 20, 0.10)",
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

      <div className="flex w-full items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span
            className="font-display tabular-nums text-fg-muted"
            style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
          >
            {project.id}
          </span>
          <h3
            className="font-display font-medium text-fg"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
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
            fontSize: "11px",
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

function MobileProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.links.live ?? project.links.github ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
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
            {project.id}
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

export function Act3() {
  const desktopRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <section
        id="work"
        ref={mobileRef}
        className="relative block w-full md:hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
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
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6 px-[6vw] pt-[150vh] pb-[100vh]">
          {projects.map((project) => (
            <MobileProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section
        ref={desktopRef}
        className="relative hidden h-[900vh] w-full md:block"
        aria-hidden
      >
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
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

          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="pointer-events-auto relative mx-auto h-full w-full">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  window={CARD_WINDOWS[i]}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
