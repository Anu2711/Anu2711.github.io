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
posts/                  one .html per note
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
- **Note** → push an object to `data/notes.js` and add `posts/<slug>.html`.
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

## Before launch

Remaining bracketed placeholders (`grep -rn '\[' data/`):

- `data/facts.js` — the `availability` card
- `data/experience.js` — `EXPERIENCE[0].bullets` (Stake role)
- `data/projects.js` — every `[repo url]` and the `[demo url]` on the tweet classifier
- `PHOTO` in `js/render.js` — set to `assets/photo.jpg` once the file exists
- Company marks — `assets/logos/*.svg` for Stake, Network International, Babylist,
  RideCo, WAT.ai, SAP (see `assets/logos/README.md`); set `logo` per job once added
- `og:url` / `og:image` in `index.html` assume `https://anu2711.github.io/` — update
  both once the custom domain is live and add a `CNAME` file
