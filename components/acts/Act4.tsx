"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

const EMAIL = "contact@szejason.com";
const RESUME_URL = "/Jason_Sze_Resume.pdf";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.25,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const ResumeIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h8" />
    <path d="M8 9h2" />
  </svg>
);

const MailIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13L2 4" />
  </svg>
);

const GithubIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = (
  <svg width="18" height="18" viewBox="24 24 208 208" fill="currentColor">
    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
  </svg>
);

function MailCopy() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? "Email copied" : "Copy email"}
      className="inline-flex items-center gap-2 text-fg-muted hover:text-fg transition-colors"
    >
      <span className="flex h-[18px] w-[18px] items-center justify-center">
        {MailIcon}
      </span>
      <span className="relative inline-flex h-[18px] items-center leading-none">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              copied
            </motion.span>
          ) : (
            <motion.span
              key="handle"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              {EMAIL}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

type LinkItem = {
  label: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
};

const LINKS: LinkItem[] = [
  { label: "Resume", handle: "Resume", href: RESUME_URL, icon: ResumeIcon },
  {
    label: "GitHub",
    handle: "Jsze30",
    href: "https://github.com/Jsze30",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    handle: "jason-sze30",
    href: "https://www.linkedin.com/in/jason-sze30/",
    icon: LinkedInIcon,
  },
  {
    label: "X (Twitter)",
    handle: "jason_sze30",
    href: "https://x.com/jason_sze30",
    icon: XIcon,
  },
  {
    label: "Instagram",
    handle: "jasonszeofficial",
    href: "https://www.instagram.com/jasonszeofficial/",
    icon: InstagramIcon,
  },
];

export function Act4() {
  const reduce = useReducedMotion();

  const variantsContainer = reduce ? undefined : container;
  const variantsItem = reduce ? undefined : item;

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center px-6"
      style={{ paddingTop: "12vh", paddingBottom: "8vh" }}
    >
      <motion.div
        variants={variantsContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.05 }}
        className="flex w-full max-w-[65ch] flex-col items-center text-center"
      >
        <motion.div
          variants={variantsItem}
          className="mb-10 overflow-hidden rounded-full"
          style={{
            width: "clamp(140px, 16vw, 220px)",
            height: "clamp(140px, 16vw, 220px)",
            boxShadow: "0 20px 60px rgba(15, 14, 20, 0.12)",
          }}
        >
          <Image
            src="/headshot.jpg"
            alt="Jason Sze"
            width={440}
            height={440}
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.85) contrast(1.02)" }}
          />
        </motion.div>

        <motion.p
          variants={variantsItem}
          className="text-fg"
          style={{
            fontWeight: 500,
            fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)",
            lineHeight: 1.55,
            letterSpacing: "-0.005em",
          }}
        >
          Hey, I&rsquo;m Jason. I&rsquo;m a computer science student at UIUC who
          creates because I want to see ideas exist in the world.
        </motion.p>

        <motion.div
          variants={variantsItem}
          className="mx-auto mt-10 grid w-max max-w-full grid-flow-col grid-cols-2 grid-rows-3 justify-center gap-x-18 gap-y-3 text-sm md:mt-14 md:w-auto md:grid-cols-none md:grid-rows-2 md:gap-x-10 md:gap-y-4"
          style={{ fontWeight: 500 }}
        >
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
            className="order-1 inline-flex items-center gap-2 justify-self-start text-fg-muted transition-colors hover:text-fg md:order-none"
          >
            <span className="flex h-[18px] w-[18px] items-center justify-center">
              {ResumeIcon}
            </span>
            <span>Resume</span>
          </a>
          <div className="order-3 inline-flex items-center justify-self-start md:order-none">
            <MailCopy />
          </div>
          {LINKS.filter(({ label }) => label !== "Resume").map(
            ({ label, handle, href, icon }) => {
              const mobileOrder =
                label === "GitHub"
                  ? "order-2"
                  : label === "LinkedIn"
                    ? "order-4"
                    : label === "X (Twitter)"
                      ? "order-5"
                      : "order-6";
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`${mobileOrder} inline-flex items-center gap-2 justify-self-start text-fg-muted transition-colors hover:text-fg md:order-none`}
                >
                  <span className="flex h-[18px] w-[18px] items-center justify-center">
                    {icon}
                  </span>
                  <span>{handle}</span>
                </a>
              );
            },
          )}
        </motion.div>

        <motion.p
          variants={variantsItem}
          className="mt-20 uppercase text-fg-muted"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          © Jason Sze · Chicago, IL
        </motion.p>
      </motion.div>
    </section>
  );
}
