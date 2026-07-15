export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: number;
  featured: boolean;
  screenshot: string;
  // primary: the best place to *experience* the project (live app, DevPost).
  // Never a repo URL — github is the fallback. Never duplicate URLs.
  links: { primary?: string; github?: string };
};

export const projects: Project[] = [
  {
    id: "01",
    title: "ELeet",
    category: "AI Interview Prep",
    description:
      "10x your LeetCode prep. Practice with a live AI interviewer on any problem, anytime.",
    tags: ["Next.js", "OpenAI", "Postgres"],
    year: 2025,
    featured: true,
    screenshot: "/eleetcoder.png",
    links: {
      primary: "https://eleetcoder.com/",
      github: "https://github.com/Jsze30/ELeet",
    },
  },
  {
    id: "02",
    title: "Apollo",
    category: "Dynamic MCP Agent",
    description:
      "An agent that synthesizes its own tools at runtime to extend its capabilities. Built for HackIllinois 2026.",
    tags: ["Python", "MCP", "LangChain"],
    year: 2026,
    featured: true,
    screenshot: "/apollo.png",
    links: {
      primary: "https://devpost.com/software/apollo-1nlme8",
      github: "https://github.com/Jsze30/Apollo",
    },
  },
  {
    id: "03",
    title: "Learnable",
    category: "AI Video Lectures",
    description:
      "Your personalized AI lecturer. Turns course materials into animated video lectures with synchronized narration, powered by ManimGL.",
    tags: ["Python", "LLMs", "ManimGL"],
    year: 2026,
    featured: false,
    screenshot: "",
    links: {
      primary: "https://devpost.com/software/learnable-0njfez",
      github: "https://github.com/Jsze30/Learnable",
    },
  },
  {
    id: "04",
    title: "ContextLint",
    category: "AI Context Linter",
    description:
      "Turns messy docs into Alignbase-shaped context entries — atomizes, classifies, dedupes, and lints Notion exports.",
    tags: ["Next.js", "TypeScript", "AI"],
    year: 2026,
    featured: false,
    screenshot: "",
    links: {
      primary: "https://contextlint.vercel.app/",
      github: "https://github.com/Jsze30/ContextLint",
    },
  },
  {
    id: "05",
    title: "ProfitPilot",
    category: "AI CFO Agent",
    description:
      "Your all-in-one AI CFO and scheduler — automating finances and reservations for data-driven growth.",
    tags: ["AI", "Automation"],
    year: 2025,
    featured: false,
    screenshot: "",
    links: {
      primary: "https://devpost.com/software/profitpilot",
      github: "https://github.com/Jsze30/ProfitPilot",
    },
  },
  {
    id: "06",
    title: "NotWhisprFlow",
    category: "macOS Dictation App",
    description:
      "A native macOS menu-bar dictation app: hold a key, speak, release — transcribed text lands in the focused app via Whisper.",
    tags: ["Swift", "Whisper", "macOS"],
    year: 2026,
    featured: false,
    screenshot: "",
    links: {
      github: "https://github.com/Jsze30/NotWhisprFlow",
    },
  },
  {
    id: "07",
    title: "Life Tracker",
    category: "Personal Productivity",
    description:
      "Track habits, goals, and daily progress in one place. Calm by default, opinionated where it matters.",
    tags: ["Next.js", "Prisma", "Postgres"],
    year: 2025,
    featured: true,
    screenshot: "/Life%20Tracker.png",
    links: {
      primary: "https://life-tracker-chi-liart.vercel.app/",
      github: "https://github.com/Jsze30/life_tracker",
    },
  },
  {
    id: "08",
    title: "Content Scheduler",
    category: "X Post Scheduler",
    description:
      "Schedule and manage X posts with AI assistance, a visual calendar, and a smart queue.",
    tags: ["Next.js", "Supabase", "OpenAI"],
    year: 2025,
    featured: true,
    screenshot: "/content_scheduler.png",
    links: {
      github: "https://github.com/Jsze30/content_scheduler",
    },
  },
  {
    id: "09",
    title: "Friday",
    category: "macOS Voice Assistant",
    description:
      "A menu-bar voice assistant that wakes on a local wake word and talks through a LiveKit cloud agent — local capabilities never leave the Mac.",
    tags: ["Python", "Swift", "LiveKit"],
    year: 2026,
    featured: false,
    screenshot: "",
    links: {
      github: "https://github.com/Jsze30/Friday",
    },
  },
  {
    id: "10",
    title: "Portfolio",
    category: "Personal Website",
    description:
      "This site — a scroll-driven, editorial portfolio built with Next.js and Motion.",
    tags: ["Next.js", "TypeScript", "Motion"],
    year: 2026,
    featured: false,
    screenshot: "",
    links: {
      github: "https://github.com/Jsze30/portfolio",
    },
  },
  {
    id: "11",
    title: "Uplift",
    category: "ML Ads Optimizer",
    description:
      "ML-driven Meta Ads clustering, Shopify revenue forecasting, and predictive budgeting in an interactive dashboard.",
    tags: ["Python", "ML", "Next.js"],
    year: 2025,
    featured: false,
    screenshot: "",
    links: {
      primary: "https://uplift-mu-ecru.vercel.app/",
      github: "https://github.com/Jsze30/marketing-optimization-platform",
    },
  },
  {
    id: "12",
    title: "Tennis Predictor",
    category: "Elo Prediction Model",
    description:
      "An Elo rating system for ATP players with surface-specific ratings to forecast match winners and win probabilities.",
    tags: ["Python", "Jupyter", "ML"],
    year: 2026,
    featured: false,
    screenshot: "",
    links: {
      github: "https://github.com/Jsze30/tennis_match_predictor",
    },
  },
];
