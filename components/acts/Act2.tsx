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
type VSide = "top" | "bottom";

const SLASH_TOP_X = 58;
const SLASH_BOTTOM_X = 42;

const SLASH_LEFT_Y = 52;
const SLASH_RIGHT_Y = 48;

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
      className="absolute inset-0 bg-bg will-change-transform"
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

function MobileHalf({
  side,
  label,
  subtext,
  progress,
}: {
  side: VSide;
  label: string;
  subtext: string;
  progress: MotionValue<number>;
}) {
  const isTop = side === "top";

  const exitY = useTransform(
    progress,
    [0.62, 1],
    ["0vh", isTop ? "-105vh" : "105vh"],
  );

  const stop1 = useTransform(progress, [0.08, 0.34], [-30, 100]);
  const stop2 = useTransform(progress, [0.08, 0.34], [0, 130]);
  const maskImage = useMotionTemplate`linear-gradient(${isTop ? "to bottom" : "to top"}, #000 ${stop1}%, transparent ${stop2}%)`;

  const leftX = useTransform(progress, [0.02, 0.28], [50, 0]);
  const leftY = useTransform(progress, [0.02, 0.28], [50, SLASH_LEFT_Y]);
  const rightX = useTransform(progress, [0.02, 0.28], [50, 100]);
  const rightY = useTransform(progress, [0.02, 0.28], [50, SLASH_RIGHT_Y]);

  const clipPath = isTop
    ? `polygon(0 0, 100% 0, 100% ${SLASH_RIGHT_Y}%, 0 ${SLASH_LEFT_Y}%)`
    : `polygon(0 ${SLASH_LEFT_Y}%, 100% ${SLASH_RIGHT_Y}%, 100% 100%, 0 100%)`;

  const align = isTop
    ? "items-start justify-start pt-[13vh] pl-[6vw]"
    : "items-end justify-end pb-[15vh] pr-[6vw]";

  return (
    <motion.div
      style={{ y: exitY, clipPath }}
      className="absolute inset-0 bg-bg will-change-transform"
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <motion.line
          y2={50}
          stroke="#000"
          strokeWidth={6}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          x1={leftX}
          y1={leftY}
          x2={50}
        />
        <motion.line
          y1={50}
          stroke="#000"
          strokeWidth={6}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          x1={50}
          x2={rightX}
          y2={rightY}
        />
      </svg>
      <div className={`flex h-full w-full ${align}`}>
        <motion.div
          style={{
            WebkitMaskImage: maskImage,
            maskImage,
          }}
          className={`flex flex-col will-change-transform ${
            isTop ? "items-start" : "items-end"
          }`}
        >
          {!isTop && (
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "3.4vw",
                letterSpacing: "0.01em",
                lineHeight: 1.5,
                marginBottom: "3vw",
                maxWidth: "72vw",
                textAlign: "right",
              }}
              className="font-light text-fg-muted"
            >
              {subtext}
            </span>
          )}
          <span
            style={{
              fontSize: "16vw",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
            className="font-display font-medium text-fg"
          >
            {label}
          </span>
          {isTop && (
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "3.4vw",
                letterSpacing: "0.01em",
                lineHeight: 1.5,
                marginTop: "3vw",
                maxWidth: "82vw",
              }}
              className="font-light text-fg-muted pl-2"
            >
              {subtext}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

const CREATOR_TEXT =
  "I create for the sake of creating. All my work serves the purpose of sharing my knowledge with the world and helping people become the best versions of themselves.";
const CODER_TEXT =
  "I focus on creating code that's functional, maintainable, and scalable. I treat my work as a craft and strive to create digital experiences that look good and feel good.";

function MobileAct2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 block h-[300vh] w-full md:hidden"
      aria-label="Creator and Coder"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <MobileHalf
          side="top"
          label="CREATOR"
          subtext={CREATOR_TEXT}
          progress={scrollYProgress}
        />
        <MobileHalf
          side="bottom"
          label="CODER"
          subtext={CODER_TEXT}
          progress={scrollYProgress}
        />
      </div>
    </section>
  );
}

export function Act2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <MobileAct2 />
      <section
        id="about"
        ref={ref}
        className="relative z-10 hidden h-[300vh] w-full md:block"
        aria-label="Creator and Coder"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Half
            side="left"
            label="CREATOR"
            subtext={CREATOR_TEXT}
            progress={scrollYProgress}
          />
          <Half
            side="right"
            label="CODER"
            subtext={CODER_TEXT}
            progress={scrollYProgress}
          />
        </div>
      </section>
    </>
  );
}
