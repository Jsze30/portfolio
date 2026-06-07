# Fonts

The plan calls for **Mriya Grotesk** (Mriya Type foundry) as the primary typeface.
It is a paid foundry font and not bundled here.

## To swap in Mriya Grotesk

1. License from https://mriya.type.today/ (or your acquired source).
2. Drop the following `.woff2` files into this directory:
   - `MriyaGrotesk-Regular.woff2`  (400)
   - `MriyaGrotesk-Medium.woff2`   (500)
   - `MriyaGrotesk-Bold.woff2`     (700)
3. Edit `app/layout.tsx`:
   - Remove the `Bricolage_Grotesque` import from `next/font/google`.
   - Replace with `localFont` config (see commented-out block in `layout.tsx`).
4. Restart dev server.

Until then, the site uses **Bricolage Grotesque** via `next/font/google` as a
free editorial-grotesk stand-in with similar character.
