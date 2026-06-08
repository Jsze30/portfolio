# Mobile Optimization Plan

## Scope

This plan focuses on the three mobile issues currently visible in the portfolio:

- Make the hero section social links more vertically compact.
- Make the work/projects section stack projects vertically, with each project taking the full available mobile width.
- Make the about section social links fit cleanly on small screens.

The affected files are:

- `components/acts/Act1.tsx`
- `components/acts/Act3.tsx`
- `components/acts/Act4.tsx`

Use Tailwind responsive prefixes so the desktop layout stays close to the current design. Treat mobile as the default styles, then add `sm:` or `md:` classes for the existing desktop behavior.

## Breakpoint Strategy

Use these breakpoints:

- Mobile default: below `768px`
- Desktop/tablet layout: `md:` and up
- Only use `sm:` if a phone-specific layout needs a slight adjustment at `640px`

Recommended rule:

- Default classes should be mobile-safe.
- Existing desktop classes should move behind `md:` prefixes when they conflict with mobile.

## 1. Hero Layout: `Act1.tsx` (Nav + Footer)

### Current Problems

1. The `Nav` sits flush at the very top of the viewport, which feels cramped on phones (no breathing room above the logo/menu).
2. The hero footer puts the "Computer Science @ UIUC" label and the social/action icons on the same horizontal row:

```tsx
<div className="flex w-full items-start justify-between text-sm text-fg-muted">
  <motion.span>Computer Science @ UIUC</motion.span>
  <motion.div className="flex items-center gap-5">...icons...</motion.div>
</div>
```

On phones, the label and the six-icon group fight for width. The icons either crowd the label or wrap awkwardly.

### Target Behavior

On mobile:

- Push the `Nav` slightly down from the top edge so it doesn't sit flush against the viewport.
- Stack the education label on its own row, with the social/action icons in a compact row **directly underneath** it (not to the right).
- Keep the icons left-aligned with the label so the footer reads as a single grouped block.

On desktop:

- Preserve the current top-aligned `Nav`.
- Preserve the current left-label / right-icons footer row.

### Changes

**Nav vertical offset.** The `Nav` is rendered at the top of `Act1`'s root section. Add a mobile-only top padding to the section (or a wrapper) so the nav drops slightly:

```tsx
<section className="relative flex h-screen w-full flex-col pt-4 md:pt-0">
  <Nav />
  ...
</section>
```

If `Nav` itself controls its own spacing internally, prefer adding a mobile-only `mt-*` class on the `Nav` instance instead:

```tsx
<Nav className="mt-4 md:mt-0" />
```

Use `pt-4` (~16px) as a starting value; bump to `pt-6` if it still feels tight. Avoid going taller than `pt-8` — the hero needs to stay within one viewport.

**Footer stacking.** Change the footer wrapper from a single horizontal row into a vertical stack on mobile, horizontal on desktop:

```tsx
<div className="flex flex-1 items-start px-[6vw] pt-3 md:pt-4">
  <div className="flex w-full flex-col items-start gap-3 text-sm text-fg-muted md:flex-row md:items-start md:justify-between md:gap-6">
    <motion.span>Computer Science @ UIUC</motion.span>
    <motion.div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-5">
      ...icons...
    </motion.div>
  </div>
</div>
```

Key points:

- `flex-col` on mobile puts the label on top and the icons in the row below it.
- `md:flex-row md:justify-between` restores the current left/right desktop layout.
- `gap-3` between the label and the icon row keeps them visually grouped, not floating apart.
- `flex-wrap` on the icon row lets the six items wrap to a second line only if the phone is unusually narrow.

**Tap targets.** Each icon link should be at least 44px to meet mobile accessibility minimums:

```tsx
className="inline-flex h-11 w-11 items-center justify-center -m-2 text-fg-muted hover:text-fg transition-colors md:h-auto md:w-auto md:m-0"
```

The negative margin keeps the visual icon spacing tight while expanding the hit area. Apply consistently to the resume link, `MailCopy`, and each social `<a>`.

### Acceptance Criteria

- At `390px` wide, the `Nav` is visibly offset from the top edge (not flush).
- The "Computer Science @ UIUC" label appears on its own row, with the social/action icons directly beneath it, left-aligned.
- The icon row fits within the content width without forcing horizontal scroll.
- The hero still fits within the first viewport without overflow.
- Desktop remains visually equivalent to the current layout (nav flush, label left / icons right).

## 2. Work Section: `Act3.tsx`

### Current Problem

The work section uses scroll-driven absolute cards:

```tsx
className={`group absolute top-0 flex w-[48vw] max-w-[640px] ... ${sideClass}`}
```

Each card is positioned left or right with `left-[6vw]` / `right-[6vw]`. That works on desktop, but on mobile the cards should not be side-by-side or edge-positioned. They should become full-width project blocks stacked vertically.

### Target Behavior

On mobile:

- Projects should take the full content width.
- Projects should be one above the other.
- Project cards should not depend on left/right absolute positioning.
- The section should be easy to scroll normally.
- The animated `WORK` background can remain, but it should not make the project stack hard to read.

On desktop:

- Preserve the current animated split-left/split-right behavior.

### Recommended Implementation

Create a separate mobile project card component, or let `ProjectCard` branch with responsive classes. The cleanest option is to render two layouts:

- Mobile static stack: visible below `md`
- Desktop animated cards: hidden below `md`

This keeps the scroll animation logic from fighting the mobile stack.

### Add a Mobile Card

Add this component near `ProjectCard`:

```tsx
function MobileProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.links.live ?? project.links.github ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full flex-col gap-4"
    >
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "4 / 3",
          boxShadow: "0 18px 50px rgba(15, 14, 20, 0.10)",
          background: "var(--rule)",
        }}
      >
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          sizes="92vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="font-display tabular-nums text-fg-muted text-base">
            {project.id}
          </span>
          <h3 className="min-w-0 font-display text-2xl font-medium leading-none text-fg">
            {project.title}
          </h3>
        </div>
        <span className="shrink-0 pt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted">
          {project.category}
        </span>
      </div>
    </a>
  );
}
```

If project titles/categories collide on very narrow phones, switch the metadata row to:

```tsx
<div className="flex w-full flex-col gap-1">
```

### Update `Act3`

Change the section height so mobile does not inherit the giant scroll animation height:

```tsx
<section id="work" ref={ref} className="relative w-full md:h-[900vh]">
```

Add a mobile stack before the desktop sticky layout:

```tsx
<div className="px-[6vw] py-20 md:hidden">
  <h2 className="mb-10 font-display text-[18vw] font-medium leading-none text-fg">
    Work
  </h2>
  <div className="flex flex-col gap-12">
    {projects.map((project) => (
      <MobileProjectCard key={project.id} project={project} />
    ))}
  </div>
</div>
```

Then hide the current sticky animated desktop layout on mobile:

```tsx
<div className="sticky top-0 hidden h-screen w-full items-center overflow-hidden md:flex">
```

### Why This Is Safer

The current project cards rely on `position: absolute`, scroll progress, and large viewport translation values. A responsive-only class change would still leave the mobile layout tied to the animation timeline. A separate mobile stack is easier to reason about and less likely to create offscreen or overlapping cards.

### Acceptance Criteria

- At `390px` wide, every project image uses the full content width.
- Projects appear vertically, one after another.
- No project card is partially offscreen due to `left`, `right`, or `translateY`.
- The mobile section height is natural content height, not `900vh`.
- Desktop keeps the existing animated work sequence.

## 3. About Socials: `Act4.tsx`

### Current Problem

The about links use a two-row column-flow grid:

```tsx
className="mt-14 grid grid-flow-col grid-rows-2 justify-center gap-x-10 gap-y-4 text-sm"
```

On phones, `grid-flow-col` creates columns across the screen. Long handles like `contact@szejason.com` and `jasonszeofficial` can overflow or force the grid wider than the viewport.

### Target Behavior

On mobile:

- All about links fit within the viewport.
- Links can wrap into multiple rows naturally.
- Long handles should not force horizontal scroll.
- The email can be shortened visually if needed.

On desktop:

- Preserve the compact two-row social layout.

### Changes

Change the about links wrapper to be mobile-first:

```tsx
className="mt-10 flex w-full max-w-full flex-wrap justify-center gap-x-5 gap-y-3 text-sm md:mt-14 md:grid md:w-auto md:grid-flow-col md:grid-rows-2 md:gap-x-10 md:gap-y-4"
```

Update the link classes so each item can shrink cleanly:

```tsx
className="inline-flex min-w-0 max-w-full items-center gap-2 text-fg-muted hover:text-fg transition-colors md:justify-self-start"
```

For handle spans, allow truncation:

```tsx
<span className="min-w-0 truncate">{handle}</span>
```

For `MailCopy`, change the button class:

```tsx
className="inline-flex min-w-0 max-w-full items-center gap-2 text-fg-muted hover:text-fg transition-colors"
```

And change the animated text wrapper:

```tsx
<span className="relative inline-flex h-[18px] min-w-0 max-w-[72vw] items-center leading-none md:max-w-none">
```

For the email text itself, add truncation:

```tsx
className="min-w-0 truncate"
```

Apply that class to both the copied and email motion spans if needed. The copied text is short, but matching classes prevents width jumps.

### Optional Email Display Improvement

If the full email still feels too long on small phones, keep the copied value as `contact@szejason.com` but display a shorter mobile label:

```tsx
<span className="md:hidden">email</span>
<span className="hidden md:inline">{EMAIL}</span>
```

This is the most reliable way to keep the about social row compact.

### Acceptance Criteria

- At `390px` wide, the about social links do not overflow horizontally.
- The email and Instagram handle do not push the page wider than the viewport.
- Link wrapping looks intentional, with consistent row gaps.
- Desktop keeps the existing two-row layout.

## 4. Verification Checklist

Run the app:

```bash
npm run dev -- --host 0.0.0.0
```

Check these viewport widths:

- `375px`
- `390px`
- `430px`
- `768px`
- Desktop width

Manual checks:

- Hero socials fit compactly under the name.
- Hero footer has no overlap between the education label and social icons.
- Work projects are full-width and stacked on mobile.
- Work desktop animation still behaves as before.
- About social links wrap within the screen.
- There is no horizontal scrolling on the page.

Browser console check:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

This should return `true` on mobile widths.

## 5. Implementation Order

1. Update `Act1.tsx` hero footer layout and icon spacing.
2. Add `MobileProjectCard` in `Act3.tsx`.
3. Render the mobile project stack in `Act3.tsx`.
4. Hide the existing sticky work animation below `md`.
5. Update `Act4.tsx` social link wrapper and truncation behavior.
6. Test the app at the mobile widths listed above.

## 6. Expected Result

After these changes, the site should keep the current desktop visual language while using purpose-built mobile layouts where the desktop animation and social grids are too wide. The mobile experience should feel like the same portfolio, but with the hero links, project cards, and about socials sized around phone constraints instead of desktop spacing.
