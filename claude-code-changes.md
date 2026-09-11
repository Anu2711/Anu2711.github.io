# Claude Code — change log

Running log of what changed in each phase of turning the single-file prototype into the
static site described in `CLAUDE.md`. One entry per phase; updated as phases complete.

## Phase 1 — repo structure

- `git init`, `.nojekyll`, `.gitignore`, `README.md` added; committed.
- Split `index.html`'s inline `<style>` and `<script>` into the target layout:
  `css/site.css`; `js/render.js`, `js/reveal.js`, `js/rail.js`, `js/graph.js`;
  `data/facts.js`, `data/stack.js`, `data/experience.js`, `data/projects.js`,
  `data/notes.js`, `data/graph.js`. Content and logic moved verbatim — no visual or
  behavioural changes.
- Load order: data files, then `render.js`, `reveal.js`, `rail.js`, `graph.js`.
- Judgment call: the shared `reduce` (`prefers-reduced-motion`) flag was declared once
  in the original inline script and reused by the rail/reveal/graph blocks. Kept that
  pattern by declaring it once in `render.js` — classic `<script>` tags on the same page
  share a global lexical scope, so later files can reference it without recomputing it.

## Phase 2 — assets and placeholders

- `assets/resume.pdf` added; nav and footer links now resolve.
- `assets/favicon.svg` — amber node, two ink edges, 32×32, wired via `<link rel="icon">`.
- `assets/og-image.png` (1200×630) generated from the actual palette tokens and project
  fonts (Python/Pillow, since no `rsvg-convert`/`cairosvg` was available) — headline,
  hero-graph motif, no photo, no third-party marks. OG + Twitter meta tags added to
  `index.html`.
- 20 stack tools got local `assets/icons/<slug>-{ink,brand}.svg` pairs downloaded from
  Simple Icons; `js/render.js` points there instead of `cdn.simpleicons.org`.
- Judgment call: dbt, Astronomer, AWS and Tableau have no icon left in the Simple Icons
  library (confirmed via their GitHub repo — removed upstream). They were already
  silently falling back to monogram tiles under the old CDN link (404 → `onerror`); made
  that explicit by dropping the `slug` in `data/stack.js` instead of shipping a broken
  file.
- `assets/logos/README.md` added, listing where to source each of the 6 companies'
  official marks. Nothing blocks launch — every job still falls back to a live favicon
  via `domain`.
- Judgment call: `og:url`/`og:image` point at `https://anu2711.github.io/` (inferred from
  the GitHub Pages repo name in the decision log) — flagged in the README to update once
  the custom domain is live.

## Photo (ad hoc, between Phase 2 and 3)

- Wired `PHOTO` in `js/render.js` to `assets/photo.jpg`.
- The uploaded file was actually PNG data saved with a `.jpg` extension; re-encoded it as
  a real JPEG (same pixels, fully opaque, nothing lost) to fix the content-type mismatch
  and cut it from 1.1MB to ~95KB.
- Flagged for a second look: the photo is a dim, casual restaurant shot with other people
  visible in the background — not a headshot. Left it in place since it was an explicit
  request; easy to swap by re-uploading `assets/photo.jpg`.

## Phase 3 — posts

- `posts/_template.html` added: same nav and footer as `index.html`, single 64ch reading
  column, handwritten (Caveat) `h1`, mono date, plain-text "back to notes" link (no arrow
  glyph, per the "things to keep avoiding" list in `CLAUDE.md`) to `/#notes`. Uses
  root-relative asset paths (`/css/site.css`, `/assets/...`, `/#work`) since it lives one
  level down in `posts/`.
- Added `.post-page`/`.post-col`/`.post-back`/`.post-date`/`.post-body` rules to
  `css/site.css` — the 64ch column plus generic styling for `<h2>`, `<a>`, `<pre>`/`<code>`,
  `<img>` inside a post body.
- `data/notes.js` left empty on purpose — homepage still shows the "nothing published
  yet" empty state.
- README's "Adding content" section documents the publish flow: copy the template, fill
  it in, push one object to `data/notes.js`.

## Phase 4 — quality floor

- Screenshot-tested at 380/700/900/1280/1600px with a headless browser (Playwright).
  Found and fixed a real bug: the nav overflowed horizontally below ~640px — the brand
  text wrapped to two lines and pushed "Contact"/"Resume" off-screen. It now stacks
  (brand row, then a wrapping link row) under 640px. Confirmed the hero graph hides
  ≤700px and annotations collapse to inline text ≤900px, as the existing CSS intended.
- Keyboard-tabbed the whole page programmatically. Found and fixed a gap: the hero
  graph's `<canvas>` was never reachable — canvas isn't natively focusable, and the
  `:focus-visible` rule didn't target it either. Added `tabindex="0"`, `role="img"`, an
  aria-label noting it's decorative for keyboard users, and added `canvas` to the
  focus-visible outline selector.
- Ran Lighthouse against a real static server. Accessibility/Best Practices/SEO: 100.
  Performance started at 84 — the Google Fonts stylesheet was render-blocking. Switched
  it to the standard preload-and-swap pattern (same fonts/weights, nothing visual
  changes) in both `index.html` and `posts/_template.html`; Performance moved to
  89–100 across repeated runs in this sandbox (the remaining spread is network jitter
  fetching the fonts, not something the code controls). Left self-hosting the fonts as
  an optional follow-up rather than doing it unprompted, since CLAUDE.md already treats
  the fonts as the one accepted heavy asset.
- Added this file (`claude-code-changes.md`) as a running per-phase change log.
