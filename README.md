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

## Before launch

Remaining bracketed placeholders (`grep -rn '\[' data/`):

- `data/facts.js` — the `availability` card
- `data/experience.js` — `EXPERIENCE[0].bullets` (Stake role)
- `data/projects.js` — every `[repo url]` and the `[demo url]` on the tweet classifier
- `PHOTO` in `js/render.js` — set to `assets/photo.jpg` once the file exists
- `assets/resume.pdf` — linked from the nav and footer, file not yet added
- Company marks — `assets/logos/*.svg` for Stake, Network International, Babylist,
  RideCo, WAT.ai, SAP; set `logo` per job once added
