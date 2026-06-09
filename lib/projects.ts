export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  screenshot: string;
  links: { live?: string; github?: string };
};

export const projects: Project[] = [
  {
    id: "01",
    title: "ELeet",
    category: "AI Interview Prep",
    description:
      "10x your LeetCode prep. Practice with a live AI interviewer on any problem, anytime.",
    tags: ["Next.js", "OpenAI", "Postgres"],
    screenshot: "/eleetcoder.png",
    links: {
      live: "https://eleetcoder.com/",
      github: "https://github.com/Jsze30/ELeet_Web",
    },
  },
  {
    id: "02",
    title: "Apollo",
    category: "Dynamic MCP Agent",
    description:
      "An agent that synthesizes its own tools at runtime to extend its capabilities. Built for HackIllinois 2026.",
    tags: ["Python", "MCP", "LangChain"],
    screenshot: "/apollo.png",
    links: {
      live: "https://devpost.com/software/apollo-1nlme8",
      github: "https://github.com/Jsze30/Apollo",
    },
  },
  {
    id: "03",
    title: "Content Scheduler",
    category: "X Post Scheduler",
    description:
      "Schedule and manage X posts with AI assistance, a visual calendar, and a smart queue.",
    tags: ["Next.js", "Supabase", "OpenAI"],
    screenshot: "/content_scheduler.png",
    links: {
      live: "https://github.com/Jsze30/content_scheduler",
      github: "https://github.com/Jsze30/content_scheduler",
    },
  },
  {
    id: "04",
    title: "Life Tracker",
    category: "Personal Productivity",
    description:
      "Track habits, goals, and daily progress in one place. Calm by default, opinionated where it matters.",
    tags: ["Next.js", "Prisma", "Postgres"],
    screenshot: "/Life%20Tracker.png",
    links: {
      live: "https://life-tracker-chi-liart.vercel.app/",
      github: "https://github.com/Jsze30/life_tracker",
    },
  },
];
