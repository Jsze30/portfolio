"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function Headshot() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-[6vw] left-[calc(6vw+1.75rem)] z-40"
    >
      <div
        className="overflow-hidden rounded-[4px]"
        style={{ width: 110, height: 110 }}
      >
        <Image
          src="/headshot.jpg"
          alt="Jason Sze"
          width={220}
          height={220}
          priority
          className="h-full w-full object-cover"
          style={{ filter: "saturate(0.85) contrast(1.02)" }}
        />
      </div>
    </motion.div>
  );
}
