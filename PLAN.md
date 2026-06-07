# Portfolio v2 — Plan

## North Star

A single-page, scroll-as-experience portfolio for Jason Sze (CS @ UIUC). The visitor should know within 3 seconds that *someone who cares about craft made this* — and that conclusion should land *before* they read a single project. Motion is the persuasion the résumé can't do.

The site behaves like a **short film**, not a webpage. Four acts, choreographed reveals, generous pauses. Inspired by inette.co — not copied — and distilled to its essence: **confidence through reduction, scale as drama, choreographed reveals.**

## Design Principles

These rules are load-bearing. Every decision defers to them.

1. **Confidence through reduction.** Two typefaces, split by scale (display serif + body sans). One accent color. No decoration that isn't structural. The refusal to embellish is what reads as expensive.
2. **Scale as drama.** Type is sized to *impact*, not to fit. Hero name is bigger than it needs to be. Section headings can exceed the viewport. Bigness is the message.
3. **Choreographed reveals, not a list.** Sections don't just appear — they enter, get pinned, get overtaken. Every scroll position should look composed.
4. **Pauses are part of the composition.** Big empty space between beats. Silence makes the next moment land.
5. **No images until they earn it.** Type carries Acts 1 and 2. Project visuals don't show up until Act 3, so when they do, they feel like a *reveal*.

## Structure: A 4-Act Scroll

Total scroll length: ~4 viewport heights. Tight. The page ends when it has nothing more to say.

### Act 1 — Statement (0–100vh)
**Goal:** Establish the visitor's confidence in 3 seconds.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   ┌──────┐                                                   ── work   │  ← headshot (~96–120px square),
│   │ JS   │  ●                                                ── about  │     signature dot beside it,
│   └──────┘                                                             │     minimal nav top-right
│                                                                        │
│                                                                        │
│  JASON                                                                 │  ← Bodoni Moda 500, ~12vw
│  SZE                                                                   │     fully visible, never bleeds
│                                                                        │     stacked, left-aligned
│                                                                        │
│                                                                        │
│  computer science @ UIUC                              ── 2026, IL      │  ← Montserrat 400, ~14px
│                                                                        │     baseline of viewport
└────────────────────────────────────────────────────────────────────────┘
```

**Mechanics:**
- Name fades up + slightly in on initial load (single 800ms move, no scroll-bound). Full name `JASON SZE` is fully visible within the viewport — sized for *impact* but never clipped. Approximate target: 18vw, capped at ~280px line-height equivalent on very wide screens so it doesn't get cartoonish on ultrawides.
- **Headshot (top-left masthead).** Small square portrait, ~96–120px, sits beside the signature dot. Subtle rounded corner (~4px) or sharp square — pick whichever reads more editorial in tests. Black-and-white or full-color, but desaturated slightly to keep it from competing with the type. Treated as *signage*, not a hero image — it identifies the author the way a magazine masthead photo does.
- The signature dot (deep navy-gray-purple, ~12px) **stays fixed** as you scroll the entire page. It's the anchor. The headshot scrolls away naturally with the rest of Act 1 — only the dot persists. Color subtly shifts hue between acts (optional polish).
- Nothing pinned. As you scroll, the hero leaves naturally.

### Act 2 — Thesis (100vh–250vh)
**Goal:** Make the visitor understand *how you think* before showing what you've made.

Three principles. Each one gets its own ~50vh moment. Headings alternate sides. Each pairs with a short paragraph that earns the heading.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  BUILD                                                                 │  ← Bodoni Moda 500, ~12vw
│                                            I ship fast and iterate     │     left-aligned, bleeds off
│                                            faster. Code is the         │     right paragraph in
│                                            cheapest way to find out    │     Montserrat 400, ~1rem
│                                            if an idea is real.         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                                                              THINK     │  ← right-aligned, mirrors
│  My favorite tools are the ones I                                      │     Build's structure
│  reach for to understand the                                           │
│  problem before solving it.                                            │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  SHIP                                                                  │
│                                            Done is better than perfect.│
│                                            Shipped is better than done.│
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mechanics:**
- Each principle word slides in from its side (transform translateX, ~120px) as it enters the viewport. Subtle, not whippy.
- Paragraph fades in ~150ms after the word lands.
- Each principle holds the viewport for one beat (~50vh of scroll) before releasing.
- *(Words BUILD / THINK / SHIP are placeholders — see open items.)*

### Act 3 — Work (250vh–350vh)
**Goal:** Reveal the projects dramatically. The work should feel earned, not listed.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│ WORK                                                              WORK │  ← Bodoni Moda 500, ~32vw
│                                                                        │     larger than viewport,
│                                                                        │     clipped at edges,
│                                                                        │     PINNED to background
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

  As you continue to scroll, project cards slide UP and OVER the pinned
  WORK heading. Heading stays behind, anchoring them.

┌────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────┐                                          │
│  │  ELeet                   │                                          │
│  │  AI Interview Prep       │                                          │
│  │                          │           WORK   ← pinned behind         │
│  │  [project screenshot]    │                                          │
│  │                          │                                          │
│  │  Next.js · OpenAI        │                                          │
│  └──────────────────────────┘                                          │
│                                                                        │
│                              ┌──────────────────────────┐              │
│              WORK            │  Apollo                  │              │
│            ↑ pinned          │  Dynamic MCP Agent       │              │
│                              │                          │              │
│                              │  [project screenshot]    │              │
│                              │                          │              │
│                              │  Python · MCP · LangChain│              │
│                              └──────────────────────────┘              │
│                                                                        │
│  ┌──────────────────────────┐                                          │
│  │  Content Scheduler       │                                          │
│  │  ...                     │                                          │
│  └──────────────────────────┘                                          │
│                                                                        │
│                              ┌──────────────────────────┐              │
│                              │  Life Tracker            │              │
│                              │  ...                     │              │
│                              └──────────────────────────┘              │
└────────────────────────────────────────────────────────────────────────┘
```

**Mechanics:**
- `WORK` heading uses `position: sticky` + scale-up on entry. As the project cards' container scrolls into view, the heading pins.
- Cards alternate sides (left, right, left, right). Each card slides up + fades in as it enters viewport. Modest parallax — ~30px translation differential — gives a feeling of depth without nausea.
- The whole projects container is taller than 1 viewport; WORK remains pinned for its duration.
- Each card: clickable → live site in new tab. Hover: subtle scale (1 → 1.02) and shadow lift.

### Act 4 — Quiet Exit (350vh–400vh)
**Goal:** After the drama, the page goes quiet. That contrast is what makes Act 3 feel earned.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                                                                        │
│   Hey, I'm Jason. I'm a computer science student at UIUC who           │  ← Montserrat 500, ~1.4rem
│   builds things because I want to see ideas exist in the world.        │     centered, max-w 65ch
│                                                                        │
│                                                                        │
│   ──                                                                   │  ← short hairline
│                                                                        │
│   ✉ jsze2020@gmail.com   ↗ GitHub   ↗ LinkedIn   ↗ X                  │  ← icon row
│                                                                        │
│                                                                        │
│   © 2026 Jason Sze · Champaign, IL                                    │  ← mono, ~12px, muted
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mechanics:**
- Fade-up on entry. No scroll choreography here — the *absence* of motion is the design choice.
- Email click copies to clipboard with a "Copied!" swap (carried over from v1's good idea).

## Visual System

### Typography — Bodoni Moda + Montserrat, split by scale
Two typefaces, both from `next/font/google`. Inspired by the luxury-fashion playbook (Armani / Burberry / Vogue): high-contrast modern serif for couture moments, geometric sans for everything else. The discipline is in *when* each one is used — not how many you load.

- **Bodoni Moda** (display, serif) — every typographic moment ≥ 40px. The hero name, all Act 2 section headings (BUILD/THINK/SHIP), the giant WORK marquee in Act 3, project titles, project numbers ("01", "02"), the closing line in Act 4. Default weight 500, letter-spacing −0.02em, line-height 0.82 on the big slabs. **Never use Bodoni below ~40px** — its hairlines disappear and it stops feeling expensive. Italic Bodoni reserved for one or two surgical accent words across the entire site.
- **Montserrat** (body, geometric sans) — everything else, full stop. Body paragraphs, the Act 4 prose, nav, captions, dates, metadata, footer, hover labels. Weights 400 (body, 16–18px, line-height ~1.6, max 65ch), 500 (hover/active states), 600 (rare emphasis). For small all-caps labels (e.g., "SELECTED WORK", year markers): Montserrat 500 uppercase, +0.15em tracking, ~12px — the fashion-magazine subhead trick.
- **No mono.** Numbers use `tabular-nums` on Montserrat. Year markers and tags use Bodoni's beautiful figures.
- Load both via `next/font/google` (no local font files, no licensing). Expose as CSS variables `--font-bodoni` and `--font-montserrat`; the body inherits Montserrat, headings opt into Bodoni explicitly.

### Color — extreme restraint
```
--bg          #F5F4F0   warm off-white (slightly warmer than v1's plan, reads more editorial)
--fg          #0F0E14   near-black with violet undertone
--fg-muted    #6B6878   muted purple-gray
--accent      #2D2A52   deep navy-gray-purple — used only for the signature dot
--rule        #DCDAD3   hairline rules
```
- That's it. No `--accent-soft`, no hover-surface tokens. If we need a hover state, we use opacity or a slight translateY, not a different color.

### The signature element
- A small filled circle in `--accent`, ~12px, fixed position at top-left of the viewport with margin.
- Stays on screen through the entire scroll. The visitor never loses it. It's your "red dot" — a tiny constant that says *this is one composed thing*.
- Optional: subtle hue shift between acts (deep purple → slightly bluer → back) — only if it doesn't feel gimmicky in build.

### Layout grid
- No explicit grid. Each act composes itself. Generous margins (~6vw side gutters on desktop).
- Vertical rhythm by feel, not by token. Empty space is content.

### Motion language
- **Easing:** custom cubic-bezier `[0.22, 1, 0.36, 1]` (slow start, smooth release). Used everywhere.
- **Durations:** 600–900ms for entrances, 200–300ms for hover/micro.
- **Distances:** small. 20–120px translations max. No huge swooshes.
- **No bounces, no overshoots, no spring physics.** Everything is restrained and intentional.

## Tech Stack

- **Next.js (App Router) + TypeScript.** Single page: `app/page.tsx`. No `/work` or `/about` subroutes — everything lives in the scroll.
- **Tailwind CSS** for utilities. CSS variables for tokens.
- **Lenis** (`@studio-freight/lenis` or its current package name — verify before installing) for smooth scroll. Without it, the choreography feels jittery on Mac trackpads.
- **Framer Motion** (`motion/react`) for scroll-driven animations. Uses `useScroll`, `useTransform`, and `motion.div` sticky containers.
- **No GSAP.** Framer Motion + Lenis is enough for this scope and avoids a second animation library.
- **Fonts:** `next/font/google` for Bodoni Moda (display) and Montserrat (body). Two faces total. No local font files, no foundry license required.
- **Hard rules:**
  - No inline styles. Everything Tailwind classes or CSS modules.
  - All color via CSS variables — never a hardcoded hex in a component.
  - TypeScript everywhere. No `.js` / `.jsx`.
  - Build in `portfoliov2/` (currently empty).

## Data Model

```ts
type Project = {
  slug: string;
  title: string;
  type: string;          // "AI Interview Prep" — shown as subtitle
  description: string;   // one short sentence on the card
  tags: string[];        // ["Next.js", "OpenAI", "Postgres"]
  screenshot: string;    // /public path
  links: { live?: string; github?: string };
};
```

Seeded from v1: ELeet, Apollo, Content Scheduler, Life Tracker — all four shown in Act 3.

## What's Different From the Previous Plan

- **Single page, not multi-page.** No `/work`, no `/about`. Everything is one scroll.
- **No experience timeline, no skills list.** They don't fit the format. Internships and skills can live on a LinkedIn link in the footer, or be folded into Act 4 copy if needed.
- **No project metadata columns** (year / role / type / tags as separate fields). Each card has a title, a one-line subtitle, a one-sentence description, and a tag row. Cleaner.
- **Scroll choreography is the structural feature**, not a polish item added at the end.

## What Carries Over From v1

- The 4 projects (titles, descriptions, screenshots, links).
- Email-copy-on-click interaction (good idea, kept).
- Contact destinations (email, GitHub, LinkedIn, X).
- The custom `ease` curve.

## What Does NOT Carry Over

- Dark palette, glows, photo-centric hero.
- ClashDisplay, 15vw shouting name (we still go big, but with Bodoni Moda and discipline).
- Inline styles.
- Multi-section "About / Experience / Skills" structure.
- Multi-page IA from the prior version of this plan.

## Build Order

1. **Scaffold** Next.js + Tailwind + TypeScript in `portfoliov2/`.
2. **Tokens + fonts.** CSS variables, Bodoni Moda + Montserrat via `next/font/google`. No mono.
3. **Persistent shell.** Fixed signature dot + minimal top-right nav. Lenis smooth scroll initialized in root layout.
4. **Act 1.** Hero name + tagline. Initial fade-up only. Verify it feels right at full viewport.
5. **Act 2.** Three principle blocks. Build the scroll-triggered slide-in mechanic *once*, reuse across all three. This is the test of the motion language.
6. **Act 3.** Pinned WORK heading + alternating project cards. The hardest piece — budget time. Get the pin mechanic correct before styling cards.
7. **Act 4.** Quiet about + contact + footer. Fade-up only.
8. **Lenis tuning.** Scroll feel pass. Adjust easing / duration until it feels luxurious, not slow.
9. **Mobile.** Choreography degrades to non-pinned, all-fade-up. No horizontal mirror layouts on mobile — everything left-aligned.
10. **Polish.** Focus states, OG/metadata, favicon, perf check.
11. **Deploy** preview to Vercel.

## Open Items Needing User Input

- **Act 2's three principles.** Currently placeholders (BUILD / THINK / SHIP). These should be *your* words — what you'd want a recruiter to know about how you operate. Could be:
  - Verbs (BUILD / THINK / SHIP)
  - Nouns (CRAFT / CURIOSITY / SPEED)
  - Domains (SOFTWARE / PRODUCT / WRITING) ← maps to your SWE → PM → content trajectory
  - Something else entirely
- **Act 2's three short paragraphs** (one per principle, ~2 sentences each).
- **Act 4's about line** — currently a draft.
- **Per-project subtitles + tags** — confirm what to show on the 4 cards in Act 3.
- **The signature dot color** — does `#2D2A52` feel right, or want to tune the hue?
- **LinkedIn URL** for the footer (v1 has it, just confirming).
