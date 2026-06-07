"use client";

import { motion } from "motion/react";

const items = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
];

export function Nav() {
  return (
    <nav className="absolute top-[6vw] right-[6vw] z-50 flex flex-col items-start gap-1 text-sm">
      {items.map((item, i) => (
        <motion.a
          key={item.label}
          href={item.href}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 1.3 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-2 text-fg/85 hover:text-fg transition-colors"
        >
          <span className="text-fg-muted select-none">──</span>
          <span>{item.label}</span>
        </motion.a>
      ))}
    </nav>
  );
}
