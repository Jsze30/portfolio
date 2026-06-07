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
          style={{ lineHeight: 0.82, paddingBottom: "1vh" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "calc(100% + 1vh)" }}
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

export function AnimatedName() {
  return (
    <h1
      className="select-none whitespace-nowrap"
      style={{
        fontFamily: "var(--font-bodoni), ui-serif, Georgia, serif",
        fontSize: "clamp(64px, 12vw, 180px)",
        fontWeight: 500,
        lineHeight: 0.82,
        letterSpacing: "-0.02em",
        marginLeft: "-0.05em",
      }}
    >
      <Word text="JASON" baseDelay={0.5} />
      <span className="inline-block" style={{ width: "0.35em" }} aria-hidden />
      <Word text="SZE" baseDelay={0.7} />
    </h1>
  );
}
