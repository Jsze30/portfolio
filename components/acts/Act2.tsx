"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "motion/react";

type Side = "left" | "right";

const SLASH_TOP_X = 58;
const SLASH_BOTTOM_X = 42;

function Half({
  side,
  label,
  subtext,
  progress,
}: {
  side: Side;
  label: string;
  subtext: string;
  progress: MotionValue<number>;
}) {
  const isLeft = side === "left";

  const exitX = useTransform(
    progress,
    [0.62, 1],
    ["0vw", isLeft ? "-105vw" : "105vw"],
  );

  const stop1 = useTransform(progress, [0.08, 0.34], [-30, 100]);
  const stop2 = useTransform(progress, [0.08, 0.34], [0, 130]);
  const maskImage = useMotionTemplate`linear-gradient(${isLeft ? "to bottom" : "to top"}, #000 ${stop1}%, transparent ${stop2}%)`;

  const upperX = useTransform(progress, [0.02, 0.28], [50, SLASH_TOP_X]);
  const upperY = useTransform(progress, [0.02, 0.28], [50, 0]);
  const lowerX = useTransform(progress, [0.02, 0.28], [50, SLASH_BOTTOM_X]);
  const lowerY = useTransform(progress, [0.02, 0.28], [50, 100]);

  const clipPath = isLeft
    ? `polygon(0 0, ${SLASH_TOP_X}% 0, ${SLASH_BOTTOM_X}% 100%, 0 100%)`
    : `polygon(${SLASH_TOP_X}% 0, 100% 0, 100% 100%, ${SLASH_BOTTOM_X}% 100%)`;

  const align = isLeft
    ? "items-start justify-start pt-[10vw] pl-[6vw]"
    : "items-end justify-end pb-[10vw] pr-[12vw]";

  return (
    <motion.div
      style={{ x: exitX, clipPath }}
      className="absolute inset-0 will-change-transform"
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <motion.line
          x1={50}
          y1={50}
          stroke="#000"
          strokeWidth={8}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          x2={upperX}
          y2={upperY}
        />
        <motion.line
          x1={50}
          y1={50}
          stroke="#000"
          strokeWidth={8}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          x2={lowerX}
          y2={lowerY}
        />
      </svg>
      <div className={`flex h-full w-full ${align}`}>
        <motion.div
          style={{
            WebkitMaskImage: maskImage,
            maskImage,
          }}
          className={`flex flex-col will-change-transform ${
            isLeft ? "items-start" : "items-end"
          }`}
        >
          {!isLeft && (
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "1.1vw",
                letterSpacing: "0.01em",
                lineHeight: 1.5,
                marginBottom: "1.6vw",
                maxWidth: "24vw",
                textAlign: "right",
              }}
              className="font-light text-fg-muted"
            >
              {subtext}
            </span>
          )}
          <span
            style={{
              fontSize: "7.5vw",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
            className="font-display font-medium text-fg"
          >
            {label}
          </span>
          {isLeft && (
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "1.1vw",
                letterSpacing: "0.01em",
                lineHeight: 1.5,
                marginTop: "1.6vw",
                maxWidth: "26vw",
              }}
              className="font-light text-fg-muted pl-4"
            >
              {subtext}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Act2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative hidden h-[300vh] w-full md:block"
      aria-label="Creator and Coder"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Half
          side="left"
          label="CREATOR"
          subtext="I create for the sake of creating. All my work serves the purpose of sharing my knowledge with the world and helping people become the best versions of themselves."
          progress={scrollYProgress}
        />
        <Half
          side="right"
          label="CODER"
          subtext="I focus on creating code that's functional, maintainable, and scalable. I treat my work as a craft and strive to create digital experiences that look good and feel good."
          progress={scrollYProgress}
        />
      </div>
    </section>
  );
}
