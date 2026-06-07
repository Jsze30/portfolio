"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const LETTER_STAGGER = 0.03;
const LETTER_DURATION = 0.75;

function Word({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ lineHeight: 0.82 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: LETTER_DURATION,
              delay: baseDelay + i * LETTER_STAGGER,
              ease,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

type Props = {
  index: number;
  label: string;
  displayFont: string;
  bodyFont: string;
  displayWeight?: number;
  letterSpacing?: string;
};

export function Act1Preview({
  index,
  label,
  displayFont,
  bodyFont,
  displayWeight = 500,
  letterSpacing = "-0.05em",
}: Props) {
  return (
    <section
      className="relative flex h-screen w-full flex-col border-t"
      style={{ borderColor: "var(--rule)", fontFamily: bodyFont }}
    >
      <div
        className="absolute left-[6vw] top-4 text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--fg-muted)", fontFamily: bodyFont }}
      >
        {String(index).padStart(2, "0")} &middot; {label}
      </div>

      <div className="flex flex-1 items-end px-[6vw] pb-[3vh]">
        <h1
          className="select-none whitespace-nowrap"
          style={{
            fontFamily: displayFont,
            fontSize: "clamp(64px, 12vw, 180px)",
            fontWeight: displayWeight,
            lineHeight: 0.82,
            letterSpacing,
            marginLeft: "-0.1em",
          }}
        >
          <Word text="JASON" baseDelay={0.2} />
          <span className="inline-block" style={{ width: "0.35em" }} aria-hidden />
          <Word text="SZE" baseDelay={0.4} />
        </h1>
      </div>

      <div
        aria-hidden
        className="h-px w-full"
        style={{ background: "var(--rule)" }}
      />

      <div className="flex flex-1 items-start px-[6vw] pt-4">
        <div
          className="flex w-full items-start justify-between text-sm"
          style={{ color: "var(--fg-muted)", fontFamily: bodyFont }}
        >
          <span>Computer Science @ UIUC</span>
          <span className="tabular-nums">Illinois &middot; &rsquo;26</span>
        </div>
      </div>
    </section>
  );
}
