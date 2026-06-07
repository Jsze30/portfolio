"use client";

import { motion } from "motion/react";

export function SignatureDot() {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-[6vw] left-[6vw] z-50 block h-3 w-3 rounded-full"
      style={{ background: "var(--accent)" }}
    />
  );
}
