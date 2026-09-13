# anusha.dev

Personal portfolio for Anusha Raisinghani. No framework, no bundler, no build step —
plain HTML/CSS/JS served by GitHub Pages.

## Structure

```
index.html          markup only
css/site.css         all styles
js/render.js          DOM rendering from data
js/reveal.js          scroll-triggered reveal (annotations, metric count-up)
js/rail.js             scroll-linked experience rail
js/graph.js            hero force graph
data/*.js              content — edit these to update the site
posts/_template.html   copy this to publish a note (see "Adding content")
posts/<slug>.html      one file per published note
assets/                 resume, icons, logos, og-image, favicon
```

Load order matters: data files first (plain globals), then `render.js`, `reveal.js`,
`rail.js`, `graph.js`.

## Run locally

```
python -m http.server
```

then open `http://localhost:8000`.

## Adding content

See `CLAUDE.md` for the full design and engineering context. Short version:

- **Project** → push an object to `data/projects.js`.
- **Job** → push an object to `data/experience.js`.
- **Note** → copy `posts/_template.html` to `posts/<slug>.html`, fill in the title,
  description, date and body, then push `{ date:"YYYY-MM", title, blurb, href:"posts/<slug>.html" }`
  to `data/notes.js`. The template already carries the nav, `site.css`, and a back link
  to `/#notes` — nothing else to wire up. `NOTES` empty renders the "nothing published
  yet" invitation state on the homepage; the first entry replaces it automatically.
- **Graph node** → add to `data/graph.js`, with at least one link.

## Assets

- `assets/resume.pdf` — added.
- `assets/favicon.svg` — amber node, two ink edges, 32×32, matches the palette.
- `assets/og-image.png` — 1200×630, generated from the palette and headline (no photo,
  no third-party marks). Regenerate with the script this was built from if the headline
  or palette changes.
- `assets/icons/<slug>-ink.svg` / `-brand.svg` — Simple Icons marks for the stack tiles,
  downloaded locally instead of hot-linking `cdn.simpleicons.org`. **dbt, Astronomer, AWS
  and Tableau have no Simple Icons mark** (removed from the library upstream) — those
  four tiles intentionally have no `slug` in `data/stack.js` and render as monograms.
  If Simple Icons re-adds them later, `curl` the two variants into `assets/icons/` and
  add the slug back.
- `assets/logos/` — empty except a README describing where to source each company's
  official mark. Every job currently falls back to a live favicon via `domain`.

## Quality floor (Phase 4)

- **Responsive**: checked at 380/700/900/1280/1600px. Fixed a real bug — the nav
  overflowed horizontally below ~640px (brand text wrapped, "Contact"/"Resume" got
  pushed off-screen). It now stacks (brand row, then a wrapping link row) under 640px.
  Confirmed the hero graph is hidden ≤700px and annotations collapse to inline text
  ≤900px, per the CSS already in place.
- **Keyboard**: every link is reachable and shows the signal-purple focus ring. Found and
  fixed a gap — the hero graph `<canvas>` wasn't in the tab order at all (canvas isn't
  natively focusable, and `:focus-visible` didn't target it). Added `tabindex="0"`,
  `role="img"`, an aria-label noting it's decorative for keyboard users, and included
  `canvas` in the focus-visible outline rule.
- **Lighthouse**: served over a real static server (not `python -m http.server`, which
  is single-threaded and adds its own latency). Accessibility, Best Practices, and SEO
  score **100** consistently. Performance was 84 initially — the Google Fonts stylesheet
  was render-blocking, holding up first paint on a round trip to `fonts.googleapis.com`.
  Switched it to the standard preload-and-swap pattern (`media="print" onload="this.media='all'"`
  with a `<noscript>` fallback) — same fonts, same weights, nothing visual changes, it just
  stops blocking. That took Performance to 89–100 across repeated runs in this sandbox
  (network jitter fetching the fonts accounts for the remaining spread); the fonts
  themselves are the one heavy asset CLAUDE.md already accounts for. **If you want a
  guaranteed stable 95+**, the next step is self-hosting the three font files in
  `assets/fonts/` instead of the Google Fonts CDN — that's a bigger call (drops the CDN
  dependency) so I left it as an option rather than doing it unprompted.

## Before launch

Remaining bracketed placeholders (`grep -rn '\[' data/`):

- `data/facts.js` — the `availability` card
- `data/experience.js` — `EXPERIENCE[0].bullets` (Stake role) — commented out for now
- Company marks — `assets/logos/*.svg` for Stake, Network International, Babylist,
  RideCo, WAT.ai, SAP (see `assets/logos/README.md`); set `logo` per job once added
- `og:url` / `og:image` in `index.html` assume `https://anu2711.github.io/` — update
  both once the custom domain is live and add a `CNAME` file
