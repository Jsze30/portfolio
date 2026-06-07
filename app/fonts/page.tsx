import { Act1Preview } from "@/components/acts/Act1Preview";

const BODY = "var(--font-montserrat)";

const pairings = [
  {
    label: "Geist (current baseline)",
    display: "var(--font-display)",
    weight: 500,
    tracking: "-0.05em",
  },
  {
    label: "Bodoni Moda — Armani / Burberry",
    display: "var(--font-bodoni)",
    weight: 500,
    tracking: "-0.02em",
  },
  {
    label: "Bodoni Moda (bold) — high-contrast couture",
    display: "var(--font-bodoni)",
    weight: 700,
    tracking: "-0.03em",
  },
  {
    label: "Playfair Display — Vogue",
    display: "var(--font-playfair)",
    weight: 600,
    tracking: "-0.03em",
  },
  {
    label: "DM Serif Display — modern bespoke (Burberry / Prada feel)",
    display: "var(--font-dm-serif)",
    weight: 400,
    tracking: "-0.02em",
  },
  {
    label: "Libre Caslon Text — Granjon / Gucci feel",
    display: "var(--font-libre-caslon)",
    weight: 400,
    tracking: "-0.02em",
  },
  {
    label: "Marcellus — Nicholas Cochin / Dior feel",
    display: "var(--font-marcellus)",
    weight: 400,
    tracking: "0",
  },
  {
    label: "Cinzel — University Roman / Jimmy Choo feel",
    display: "var(--font-cinzel)",
    weight: 500,
    tracking: "0.02em",
  },
  {
    label: "Tinos — Times substitute (Gucci / Burberry secondary)",
    display: "var(--font-tinos)",
    weight: 700,
    tracking: "-0.03em",
  },
  {
    label: "Jost — Futura substitute (LV / Gucci / D&G)",
    display: "var(--font-jost)",
    weight: 500,
    tracking: "-0.04em",
  },
  {
    label: "Outfit — geometric sans, modern Futura feel",
    display: "var(--font-outfit)",
    weight: 500,
    tracking: "-0.04em",
  },
  {
    label: "Mulish — Avenir Next substitute (Tiffany feel)",
    display: "var(--font-mulish)",
    weight: 600,
    tracking: "-0.04em",
  },
  {
    label: "Manrope — Univers / humanist sans (Prada feel)",
    display: "var(--font-manrope)",
    weight: 600,
    tracking: "-0.04em",
  },
  {
    label: "Montserrat (display + body) — Armani primary",
    display: "var(--font-montserrat)",
    weight: 600,
    tracking: "-0.04em",
  },
];

export default function FontsPage() {
  return (
    <main>
      {pairings.map((p, i) => (
        <Act1Preview
          key={p.label}
          index={i + 1}
          label={`${p.label} · body: Montserrat`}
          displayFont={p.display}
          bodyFont={BODY}
          displayWeight={p.weight}
          letterSpacing={p.tracking}
        />
      ))}
    </main>
  );
}
