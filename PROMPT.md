# Portfolio — Build Prompt

> Copy everything below this line into your AI of choice. Fill in the
> `<<YOUR ... >>` placeholders with your own info, then let it build.

---

## Your job

Build me a single-page, scroll-as-experience personal portfolio in **Next.js (App Router) + TypeScript + Tailwind CSS v4**. The site behaves like a **short film**, not a webpage: a hero statement, a dramatic pinned WORK reveal, and a quiet closing section. Motion is the design — not a polish layer added at the end.

Build it in a directory called `portfolio/`. Use **pnpm**. Use **TypeScript everywhere** (no `.js`/`.jsx`). Single page at `app/page.tsx`. No sub-routes.

## About me (fill these in)

- **Name:** `<<YOUR FULL NAME>>` (will display in giant type as two stacked words, e.g. `JASON` / `SZE`)
- **Tagline:** `<<ONE LINE>>`
- **About paragraph (Act 4):** `<<ONE SENTENCE, ~20 words>>`
- **Location for footer:** `<<CITY, STATE>>`
- **Email:** `<<your@email.com>>`
- **Resume URL:** `<<public link, e.g. Google Drive>>`
- **GitHub:** `<<https://github.com/handle>>` (display handle: `<<handle>>`)
- **LinkedIn:** `<<https://linkedin.com/in/handle>>` (display handle: `<<handle>>`)
- **X (Twitter):** `<<https://x.com/handle>>` (display handle: `<<handle>>`)
- **Instagram:** `<<https://instagram.com/handle>>` (display handle: `<<handle>>`)
- **Headshot:** I will place a file at `public/headshot.jpg`. Reference it everywhere as `/headshot.jpg`.
- **Projects:** see `projects` array at the bottom — fill in 4 of them.

If I leave a placeholder unfilled, leave a clearly-labeled `TODO` in the code instead of inventing content.

---

## Design principles (load-bearing — every decision defers to these)

1. **Confidence through reduction.** Two typefaces, one accent color. No decoration that isn't structural. The refusal to embellish is what reads as expensive.
2. **Scale as drama.** The hero name and the WORK heading are sized to _impact_, not to fit. Bigness is the message.
3. **Choreographed reveals, not a list.** Sections enter, get pinned, get overtaken. Every scroll position should look composed.
4. **Pauses are part of the composition.** Empty space between beats. Silence makes the next moment land.
5. **No images until they earn it.** Type carries Act 1. Project visuals only appear in Act 3.

---

## Tech stack (exact)

- **Next.js 15** (App Router) + React 19 + TypeScript 5
- **Tailwind CSS v4** (using `@import "tailwindcss";` and `@theme inline` block — no `tailwind.config.js`)
- **`motion`** package (formerly Framer Motion) — import from `motion/react`
- **`lenis`** for smooth scrolling
- **`next/font/google`** for Bodoni Moda (display) and Montserrat (body). No local font files.
- **`next/image`** for all images.
- No GSAP. No other animation libraries. No CSS-in-JS libraries.

### `package.json` dependencies

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "motion": "^11.15.0",
    "lenis": "^1.1.20"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.5.0"
  }
}
```

### Hard rules

- All color via CSS variables — never hardcode a hex in a component.
- Tailwind utility classes preferred; inline `style={}` is OK only for dynamic motion values (transforms, opacity tied to scroll) and for size clamps that can't be expressed as utilities.
- The `ease` curve `[0.22, 1, 0.36, 1]` is reused everywhere — define it as a constant.
- The email is `EMAIL` constant. The resume URL is `RESUME_URL` constant. Don't sprinkle string literals.

---

## Visual system

### Color tokens (in `app/globals.css`)

```css
:root {
  --bg: #f5f4f0; /* warm off-white */
  --fg: #0f0e14; /* near-black, violet undertone */
  --fg-muted: #6b6878; /* muted purple-gray */
  --accent: #2d2a52; /* deep navy-gray-purple */
  --rule: #dcdad3; /* hairline rules */

  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Expose these to Tailwind v4 with an `@theme inline` block so utilities like `text-fg`, `bg-bg`, `text-fg-muted`, `border-rule`, `text-accent` exist.

### Typography

- **Bodoni Moda** (display, serif) → used for the hero name, the giant WORK marquee, project titles, project numbers, and the closing about line. Weight 500, `letter-spacing: -0.02em`, `line-height: 0.82` on big slabs. **Never below ~40px.**
- **Montserrat** (body, geometric sans) → everything else. Body, nav, captions, footer, link handles.
- Load both via `next/font/google` in `app/layout.tsx`. Expose as `--font-bodoni` and `--font-montserrat`. In `globals.css`, set `--font-display: var(--font-bodoni)…` and `--font-body: var(--font-montserrat)…`. The body inherits Montserrat; the hero/WORK/project titles use `font-display` (Bodoni).
- For small all-caps labels (project category, footer copyright): Montserrat 500 uppercase, `letter-spacing: 0.18em`, ~11px.
- Use `tabular-nums` for any numbers (project IDs in the small position).

### Motion language

- **Easing:** `[0.22, 1, 0.36, 1]` everywhere.
- **Durations:** 600–900ms entrances, 200–300ms hover/micro.
- **Distances:** small. 20–120px translations max for non-scroll-bound moves. Scroll-bound moves can travel much farther (cards in Act 3 traverse `115vh → -80vh`).
- **No bounces, no springs, no overshoots.**

### Layout

- No explicit grid. ~6vw side gutters (`px-[6vw]`).
- Generous vertical space. Empty space is content.

---

## Persistent shell

### `app/layout.tsx`

- Load Bodoni Moda + Montserrat via `next/font/google` as `--font-bodoni` and `--font-montserrat`.
- Wrap `{children}` in a `<SmoothScroll>` client component that runs Lenis.
- Metadata: title = `"<<YOUR NAME>>"`, description = `"<<TAGLINE>>"`.

### `components/SmoothScroll.tsx`

Client component. On mount, instantiate Lenis with `{ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true }`, drive its `raf` loop with `requestAnimationFrame`, and clean up on unmount. Render `{children}` straight through.

### Page composition

`app/page.tsx`:

```tsx
import { Act1 } from "@/components/acts/Act1";
import { Act2 } from "@/components/acts/Act2";
import { Act3 } from "@/components/acts/Act3";
import { Act4 } from "@/components/acts/Act4";

export default function Home() {
  return (
    <main>
      <Act1 />
      <Act2 />
      <Act3 />
      <Act4 />
    </main>
  );
}
```

---

## Act 1 — Statement (`components/acts/Act1.tsx`)

A full-viewport section. Three horizontal bands stacked vertically:

1. **Top band** (`flex-1`, items-end): the giant animated name, left-aligned, with ~6vw side padding and `pb-0`.
2. **Hairline divider** (`h-px` full-width, `background: var(--rule)`, `transform-origin: left`) that scales in from `scaleX: 0` to `1` over 0.9s with a 0.2s delay.
3. **Bottom band** (`flex-1`, items-start, `pt-3 md:pt-4`): tagline on the left, social/action icon row on the right.

**Top-right nav (`components/Nav.tsx`):** absolutely positioned (`absolute top-10 right-[6vw] z-50 md:top-[6vw]`), two stacked links: `work` (→ `#work`) and `about` (→ `#about`). Each link is rendered as `<a><span aria-hidden>──</span><span>{label}</span></a>`. On hover, the entire link translates right by `5` (Tailwind `hover:translate-x-5`) with a 300ms ease-out transition. The links fade and slide in from the right (`opacity 0 → 1`, `x: 12 → 0`) staggered by 0.08s starting at 1.3s.

Nav scroll behavior: clicking either link runs `window.scrollTo` to a computed target. For each item, store `{ href, scrollProgress, offsetPx }`. Find the section by id (note: Act 3 may render two copies for mobile/desktop with the same id — pick the one whose `getBoundingClientRect().height > 0`). Compute `top = sectionTop + sectionHeight * scrollProgress + offsetPx`. Use `scrollProgress = 0` for about. For work, use `0.38` on desktop (so the user lands inside the pinned WORK section, not at its top). Replace history state with the hash so the URL updates without re-scrolling.

**Animated name (`components/AnimatedName.tsx`):**

- `<h1>` with `font-bodoni`, `font-weight: 500`, `font-size: clamp(64px, 12vw, 180px)`, `line-height: 0.82`, `letter-spacing: -0.02em`, `margin-left: -0.05em`. `select-none whitespace-nowrap`.
- Renders two `<Word>` components: first word (e.g. `JASON`) with `baseDelay: 0.5`, then a `0.35em` spacer, then second word (e.g. `SZE`) with `baseDelay: 0.7`.
- Each `<Word>` splits its text into per-letter spans. Each letter sits inside an `overflow-hidden` clip span (`line-height: 0.82, padding-bottom: 1vh`). Inside the clip, a `motion.span` animates `y: "calc(100% + 1vh)" → "0%"` with `duration: 0.75`, `delay: baseDelay + i * 0.03`, `ease: [0.22, 1, 0.36, 1]`. Net effect: each letter rises into view as if from behind a mask.

**Bottom band content:**

- Left: tagline (`<<TAGLINE>>`), small text, `text-fg-muted`. Fades up (`opacity 0→1`, `y: 8→0`, duration 0.45) at delay 1.5s.
- Right: icon row, same fade-up at delay 1.55s. From left to right: **Resume** (link → `RESUME_URL`, new tab), **MailCopy** (button → copies `EMAIL` to clipboard, see below), **GitHub**, **LinkedIn**, **X**, **Instagram** (all links open in a new tab with `rel="noopener noreferrer"`). Each is an 18×18 icon (16 for X) in `text-fg-muted` with `hover:text-fg` color transition. Use inline SVGs — don't pull in an icon library.

**MailCopy component (used here and in Act 4):** A `<button>`. On click, `navigator.clipboard.writeText(EMAIL)` in a try/catch, then set `copied = true` for 1.5s. Use `<AnimatePresence mode="wait">` to swap between the mail icon and the text `"copied"` (or, in Act 4, between the email handle text and `"copied"`). Transitions: `opacity 0/y ±4 → opacity 1/y 0`, duration 0.2, ease `[0.22, 1, 0.36, 1]`.

---

## Act 2 — Thesis (`components/acts/Act2.tsx`)

A simple three-beat section that tells the visitor _how you think_ before showing _what you've made_. Three principle words, each ~50vh tall, alternating sides.

### Placeholders (fill these in)

- **Principle 1:** `<<WORD>>` — `<<ONE-TO-TWO-SENTENCE PARAGRAPH>>`
- **Principle 2:** `<<WORD>>` — `<<ONE-TO-TWO-SENTENCE PARAGRAPH>>`
- **Principle 3:** `<<WORD>>` — `<<ONE-TO-TWO-SENTENCE PARAGRAPH>>`

(Defaults if I leave it blank: `BUILD` / `THINK` / `SHIP`.)

### Layout

```tsx
const principles = [
  { word: "<<WORD 1>>", body: "<<PARAGRAPH 1>>", side: "left" },
  { word: "<<WORD 2>>", body: "<<PARAGRAPH 2>>", side: "right" },
  { word: "<<WORD 3>>", body: "<<PARAGRAPH 3>>", side: "left" },
];
```

`<section className="w-full">`, then for each principle a `<div className="flex h-[50vh] w-full items-center px-[6vw]">` that lays out the word and the paragraph horizontally. Word side alternates: `justify-between` when `side === "left"` (word left, body right) and `flex-row-reverse justify-between` when `side === "right"` (word right, body left).

### Visual

- **Word:** `font-display font-medium text-fg`, `fontSize: "clamp(64px, 12vw, 180px)"`, `letterSpacing: -0.02em`, `lineHeight: 0.82`. Use `text-left` on left-side principles, `text-right` on right-side.
- **Body paragraph:** `font-body text-fg-muted`, `max-w-[28ch]`, `text-base md:text-lg`, `lineHeight: 1.6`. Aligned to its own side (left paragraph → `text-left`, right paragraph → `text-right`).

### Motion

Each principle is a `motion.div` with:

- `initial={{ opacity: 0, x: side === "left" ? -120 : 120 }}`
- `whileInView={{ opacity: 1, x: 0 }}`
- `viewport={{ once: true, amount: 0.4 }}`
- `transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}`

The paragraph inside fades in 150ms after its word lands — either a nested `motion.p` with its own `transition.delay: 0.15`, or split into two `motion` elements with the paragraph delayed.

Respect `useReducedMotion()` — if reduced, skip the slide and just fade.

That's it. Three beats, generous space, no scroll pinning. The point is rhythm, not spectacle — the spectacle is Act 3.

---

## Act 3 — Work (`components/acts/Act3.tsx`)

**The most important section.** A `position: sticky` heading of the word `WORK`, sized larger than the viewport, with each letter sliding in from offscreen and project cards then traversing up the screen over the pinned heading.

### Structure (desktop)

```tsx
<section id="work" ref={desktopRef} className="relative h-[900vh] w-full">
  <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
    {/* The giant WORK heading */}
    <h2
      className="font-display font-medium leading-none text-fg flex w-full justify-between whitespace-nowrap"
      style={{
        fontSize: "32vw",
        letterSpacing: "-0.04em",
        fontOpticalSizing: "auto",
      }}
    >
      <span className="sr-only">Work</span>
      {LETTERS.map((letter, i) => (
        <Letter key={i} config={letter} progress={scrollYProgress} />
      ))}
    </h2>

    {/* Card layer + view-all pill on top */}
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="pointer-events-auto relative mx-auto h-full w-full">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            window={CARD_WINDOWS[i]}
            progress={scrollYProgress}
          />
        ))}
        <DesktopViewAllPill progress={scrollYProgress} />
      </div>
    </div>
  </div>
</section>
```

The outer section is `h-[900vh]` — 9 viewports tall. The `sticky` inner div pins for the full duration, giving us a long scroll budget for the choreography.

### Scroll progress

Use `useScroll({ target: desktopRef, offset: ["start end", "end start"] })`. The resulting `scrollYProgress` is 0 when the section's top hits the bottom of the viewport, 1 when the section's bottom hits the top.

### The WORK letters

Each letter slides in from offscreen as you scroll. Constants:

```ts
const LETTERS = [
  { char: "W", from: "right", start: 0.04, end: 0.2 },
  { char: "O", from: "right", start: 0.11, end: 0.22 },
  { char: "R", from: "left", start: 0.17, end: 0.3 },
  { char: "K", from: "left", start: 0.2, end: 0.32 },
];
```

Inside `<Letter>`: `x = useTransform(progress, [start, end], [from === "right" ? "120vw" : "-120vw", "0vw"], { clamp: true })`. Opacity: `useTransform(progress, [start, start+0.02, end-0.05, end], [0, 0.55, 0.55, 0.55])` — the letters sit at 55% opacity so the project cards (which travel over them) remain the focal point. Render as `<motion.span style={{ x, opacity }} className="inline-block will-change-transform" aria-hidden>{char}</motion.span>`.

### Project cards (four)

Each card has a scroll-bound `y` that takes it from below the viewport all the way through and out the top, while the WORK heading stays pinned behind it. The cards alternate sides.

```ts
const CARD_WINDOWS = [
  { side: "left", start: 0.32, end: 0.57 },
  { side: "right", start: 0.43, end: 0.67 },
  { side: "left", start: 0.53, end: 0.8 },
  { side: "right", start: 0.64, end: 0.9 },
];
```

For each card: `y = useTransform(progress, [w.start, w.end], ["115vh", "-80vh"])`. Position the card with `absolute top-0`, then either `left-[6vw] items-start text-left` or `right-[6vw] items-end text-right`. Width: `w-[48vw] max-w-[640px]`. Use `flex flex-col gap-5`. Wrap the whole card in a `motion.a` (links to `project.links.live ?? project.links.github ?? "#"`, opens in a new tab) with `style={{ y }}` and `will-change-transform`.

**Card visual:**

- Image container: `relative w-full overflow-hidden`, `aspectRatio: "4 / 3"`, `borderRadius: 24px`, `boxShadow: "0 30px 80px rgba(15, 14, 20, 0.10)"`, `background: var(--rule)` as a placeholder color. Wrap it in a `motion.div` with `whileHover={{ scale: 1.02, y: -8 }}`, transition `{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }`. Inside, render `<Image src={project.screenshot} alt={project.title} fill sizes="(max-width: 768px) 90vw, 48vw" className="object-cover" />`.
- Caption row beneath: `flex w-full items-baseline justify-between gap-6`.
  - Left: `<span className="font-display tabular-nums text-fg-muted" style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}>{project.id}</span>` then `<h3 className="font-display font-medium text-fg" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>{project.title}</h3>`.
  - Right: `<span className="shrink-0 uppercase text-fg-muted" style={{ fontSize: "11px", letterSpacing: "0.18em", fontWeight: 500 }}>{project.category}</span>`.

### View-all pill

A pill that fades in at the end of the section, centered over the pinned heading. It currently links to `#` — that's intentional, it's a placeholder for a future `/work` route.

```tsx
function DesktopViewAllPill({ progress }) {
  const opacity = useTransform(progress, [0.8, 0.87, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.8, 0.87], ["20px", "0px"]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <ViewAllPill />
    </motion.div>
  );
}
```

`ViewAllPill` is an `<a href="#">` with:

- `inline-flex items-center gap-1 rounded-full border border-fg/30 bg-bg px-8 py-4 font-body font-medium text-fg`
- `transition-all hover:border-fg hover:shadow-[0_12px_32px_rgba(15,14,20,0.14)]`
- `style={{ boxShadow: "0 8px 24px rgba(15, 14, 20, 0.10)" }}`
- Content: `View all <span className="tabular-nums text-fg">(10)</span>` — the number is `VIEW_ALL_COUNT`, currently `10`.

---

## Act 4 — Quiet exit (`components/acts/Act4.tsx`)

After the spectacle, the page goes quiet. No scroll-bound animation here — just a fade-up on view.

### Layout

`<section id="about" className="relative flex min-h-screen w-full items-center justify-center px-6" style={{ paddingTop: "12vh", paddingBottom: "8vh" }}>`

Inside, a `motion.div` (`max-w-[65ch] flex flex-col items-center text-center`) with `whileInView="show"`, `viewport={{ once: true, amount: 0.05 }}`, and a stagger container variant.

### Stagger variants

```ts
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};
```

Respect `useReducedMotion()` — if true, skip the variants entirely (`variantsContainer = undefined`, `initial={false}`).

### Children, in order

1. **Headshot.** A circular crop. `clamp(140px, 16vw, 220px)` square. `overflow-hidden rounded-full`. Box-shadow `0 20px 60px rgba(15, 14, 20, 0.12)`. Inside, `<Image src="/headshot.jpg" alt="<<YOUR NAME>>" width={440} height={440} className="h-full w-full object-cover" style={{ filter: "saturate(0.85) contrast(1.02)" }} />`.

2. **About line.** `<<ABOUT PARAGRAPH>>`. Style: `text-fg`, `fontWeight: 500`, `fontSize: clamp(1.05rem, 1.5vw, 1.4rem)`, `lineHeight: 1.55`, `letterSpacing: -0.005em`. Use the body (Montserrat) font.

3. **Link grid.** A 2-column grid on mobile / single-row flex on desktop with the following links, each shown as `<icon> <handle>`:
   - **Resume** → `RESUME_URL`, label `Resume`
   - **Email** (the `MailCopy` button, shows the email and swaps to `copied` when clicked)
   - **GitHub** → `<<github url>>`, handle `<<github handle>>`
   - **LinkedIn** → `<<linkedin url>>`, handle `<<linkedin handle>>`
   - **X** → `<<x url>>`, handle `<<x handle>>`
   - **Instagram** → `<<instagram url>>`, handle `<<instagram handle>>`

   All `text-fg-muted hover:text-fg transition-colors`, font-weight 500, text-sm. Each icon sits in an `h-[18px] w-[18px]` flex box.

4. **Footer line.** `<p className="mt-20 uppercase text-fg-muted" style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 500 }}>© <<YOUR NAME>> · <<CITY, STATE>></p>`.

---

## Inline SVG icons (use these exact paths)

Reuse the same SVG markup in both Act 1 and Act 4:

- **Resume:** `viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none"` with paths `M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`, `M14 2v6h6`, `M8 13h8`, `M8 17h8`, `M8 9h2`.
- **Mail:** `viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none"` with `<rect x="2" y="4" width="20" height="16" rx="2" />` and `<path d="M22 4L12 13L2 4" />`.
- **GitHub, LinkedIn, X, Instagram:** standard brand glyphs at 18×18 (X is 16×16), `fill="currentColor"`. Use the canonical single-path versions.

---

## Data: projects

Create `lib/projects.ts`:

```ts
export type Project = {
  id: string; // "01" .. "04"
  title: string;
  category: string; // short tag shown on the card, e.g. "AI Interview Prep"
  description: string; // one short sentence
  tags: string[]; // ["Next.js", "OpenAI", "Postgres"]
  screenshot: string; // "/something.png"
  links: { live?: string; github?: string };
};

export const projects: Project[] = [
  // <<FILL IN YOUR 4 PROJECTS HERE>>
  // {
  //   id: "01",
  //   title: "Your Project",
  //   category: "Short tagline",
  //   description: "One sentence describing it.",
  //   tags: ["Next.js", "..."],
  //   screenshot: "/your-screenshot.png",
  //   links: { live: "https://…", github: "https://github.com/…" },
  // },
];
```

I will drop screenshot files into `public/`. Reference them via their `/filename.png` paths (URL-encode spaces as `%20`).

---

## File tree to produce

```
portfolio/
├── app/
│   ├── globals.css         # color tokens, @theme inline, base font on body
│   ├── layout.tsx          # next/font, SmoothScroll wrapper, metadata
│   └── page.tsx            # <Act1 /> <Act3 /> <Act4 />
├── components/
│   ├── SmoothScroll.tsx
│   ├── Nav.tsx
│   ├── AnimatedName.tsx
│   └── acts/
│       ├── Act1.tsx
│       ├── Act2.tsx
│       ├── Act3.tsx
│       └── Act4.tsx
├── lib/
│   └── projects.ts
├── public/
│   ├── headshot.jpg        # I provide
│   └── *.png               # project screenshots I provide
├── package.json
├── tsconfig.json
├── postcss.config.mjs      # { plugins: { "@tailwindcss/postcss": {} } }
├── next.config.ts
└── next-env.d.ts
```

---

## Build order (do it in this order)

1. **Scaffold** Next.js 15 + TypeScript + Tailwind v4 in `portfolio/`. Verify `pnpm dev` runs an empty page.
2. **Tokens + fonts.** Write `globals.css` with the color variables and `@theme inline`. Wire Bodoni Moda + Montserrat into `layout.tsx` via `next/font/google`. Body inherits Montserrat.
3. **Smooth scroll shell.** Build `SmoothScroll.tsx` and wrap `{children}` in `layout.tsx`. Test that wheel scrolling feels eased, not snappy.
4. **Act 1.** Build `AnimatedName` first (verify the per-letter mask reveal feels right). Then `Nav`. Then the full Act 1 layout with the hairline divider and the bottom social row. Wire the `MailCopy` interaction. Do NOT proceed until Act 1 feels composed at full viewport.
5. **Act 2.** Three principle blocks with alternating sides and the slide-in-on-view motion. Simple — this is the rhythm before the spectacle.
6. **Act 3 — letters first.** Build the sticky `h-[900vh]` shell and get the four `WORK` letters sliding in from their sides with the constants above. Don't add cards yet. Verify the choreography on a slow scroll.
7. **Act 3 — cards.** Add the four project cards traveling over the pinned heading. Tune `CARD_WINDOWS` if cards collide visually. Add the view-all pill last.
8. **Act 4.** Build the centered headshot + about + link grid + footer. Use the stagger variants. Respect `useReducedMotion`.
9. **Polish.** Focus states (visible focus ring using the accent color), OG metadata, favicon (use `app/icon.png`), perf check (`pnpm build`).

---

## Things NOT to do

- Don't add an "About" / "Experience" / "Skills" section in the body. The about line in Act 4 is the entire bio.
- Don't add a `/work` or `/about` route. Everything is one scroll.
- Don't introduce a second accent color, gradient backgrounds, glows, or noise overlays.
- Don't use a monospace font anywhere visible. Use `tabular-nums` for numbers if needed.
- Don't use GSAP, ScrollTrigger, Framer Motion's `<LayoutGroup>` magic, react-three-fiber, or any 3D library.
- Don't hardcode hex colors in components. Always reference CSS variables via Tailwind utilities (`text-fg`, `bg-bg`, etc.).
- Don't replace `motion/react` with `framer-motion`. The package is now `motion`.

---

## When you're done

Print a short summary of:

- What I need to add to `public/` (headshot + project screenshots, with filenames matching `lib/projects.ts`).
- Any placeholders left as `TODO` that need my input.
- The exact command to run the dev server.

That's it. Build.
