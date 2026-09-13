# anusha.dev — portfolio site

Personal portfolio for Anusha Raisinghani, analytics engineer / data scientist in Dubai.
Hosted on GitHub Pages, later on a custom domain. No framework, no build step.

## Design intent (read before changing anything visual)

**Concept:** the working notebook of an analytics engineer. Lavender paper, violet ink,
handwritten headlines and margin notes, one live graph. Editorial, calm, data-native.
The graph in the hero and the handwritten annotations are the personality; everything else
stays typographic and restrained.

**Tokens** (in `:root` of the stylesheet):

| token       | value     | role                                                                |
| ----------- | --------- | ------------------------------------------------------------------- |
| `--paper`   | `#F4F2F9` | lilac-tinted page background with a faint page-wide plotting grid   |
| `--paper-2` | `#E9E4F3` | lavender wash for hover states and chips                            |
| `--ink`     | `#231C3D` | text, nodes. Deep violet, not tinted black                          |
| `--signal`  | `#6A4FD6` | the one saturated purple: links, metrics, annotations, active edges |
| `--trace`   | `#A9A1C4` | hairlines, ticks, secondary labels                                  |
| `--amber`   | `#F0A31F` | firing nodes in the graph **only**. Never UI chrome                 |

**Type:** Caveat (handwritten — h1, h2, the "Write to me." link, and the `.ann` margin
notes) Instrument Sans at `wdth 92` (h3, body, UI, contact lede) and DM Mono only where numbers
are read as data (years, metrics, ticks, tags). Instrument Sans was chosen for its narrower
rhythm and pen-like details, which sit closer to Caveat than a geometric sans does. Keep
Caveat to headlines and annotations; script at paragraph length is unreadable, and don't
reintroduce a third sans or a different mono.

**Hero structure:** one-line greeting in sans ("Hi, I'm …"), two short stacked identity
lines in Caveat at ≤ 88px, then the `FACTS` callout cards — index cards with a mono label
and a handwritten value (role, industry, location, visa, education, availability). No
paragraph in the hero; recruiters scan cards, not prose.

**Callout cards (`.card`):** shared by the hero and the Work section. Slight alternating
rotation, one in four gets a lavender fill, a purple pin dot on top. Work cards compute
years from each role's `start`/`end`/`type` (`full`, `coop`, `other`), so keep those
fields filled in on every job. If the headline copy changes, keep it to two or three
lines of ≤ 3 words — the size only works because the word count is small.

**Annotations (`.ann`):** short, lower-case, first-person, one per section at most. They
are positioned absolutely against a `position:relative` parent, reveal on scroll with a
lavender highlighter swipe and a self-drawing arrow, and collapse to inline text on mobile.
Add a job-level one with the `note` field in `EXPERIENCE`; it attaches to the first metric.

**Stack tiles:** `STACK` items are `[name, simpleIconsSlug]`. Each tile shows the mark
tinted in the ink colour at rest and swaps to the brand's own colour on hover, with the
name appearing beneath (always visible on touch devices). A missing slug or a 404 renders
a monogram tile in the same style, so the grid never breaks. Brand rule: third-party
colour appears only on hover — never at rest — so the palette stays ours. If the CDN
dependency bothers you later, download both SVG variants into `/assets/icons` and point
the two `src` values there.

**Section order:** hero → About (lede only, short) → Work → Projects → Stack → Notes →
Contact. Work must be reachable within one scroll of the hero; the stack lives after
Projects on purpose — don't move it back up.

**Layout:** 12-col grid, left-aligned everywhere. Sections use a sticky 3-col heading on the
left and a 9-col body on the right. Projects use a 6-col grid with `wide` / `narrow` spans so
rows never repeat. Experience uses a year rail because experience *is* a sequence; projects
are unnumbered because they aren't.

**Motion budget — reactive, not ambient. Do not add more:**
1. Page-load: headline lines rise first (0–500 ms), then the graph fades and starts moving
   (from 800 ms). The only unprompted motion. Graph is hidden under 700px.
2. Hero graph: slow drift; activation pulses fire only while the pointer is inside; drag works.
3. Scroll: experience rail draws down, years light up, metrics count up, annotations reveal.
4. Hover: underlines thicken, project cards wash lavender and their sparkline redraws.

All motion respects `prefers-reduced-motion`.

**Things to keep avoiding:** all-caps eyebrow labels, `→` on links, middle-dot meta strings
(one exists in the job header — replace with a real separator if it bugs you), identical
rounded cards, gradient washes, dark-mode-with-neon.

## Repo layout (target)

The delivered `index.html` is single-file so it previews anywhere. First job in Claude Code
is to split it:

```
/
├── index.html              # markup only
├── css/site.css            # everything from <style>
├── js/
│   ├── render.js           # DOM rendering from data
│   ├── rail.js             # scroll-linked experience rail
│   └── graph.js            # hero force graph
├── data/
│   ├── stack.js            # STACK
│   ├── experience.js       # EXPERIENCE
│   ├── projects.js         # PROJECTS
│   ├── notes.js            # NOTES
│   └── graph.js            # GRAPH nodes + links
├── posts/                  # one .html per note (see below)
├── assets/                 # og-image.png, favicon, resume.pdf
├── CNAME                   # added when the domain is bought
└── .nojekyll
```

Load data files with plain `<script src>` tags before `render.js`; keep them as `const`
globals so there's no bundler. If this ever grows past ~10 posts, switch to a
`posts/index.json` generated by a 20-line Python script, still no bundler.

## How to add things

- **Project:** push an object to `PROJECTS`. Fields: `size` (`"wide"`, `""`, `"narrow"`),
  `title`, `blurb` (≤ 2 sentences), `tags`, `links` (`[[label, href]]`), optional `spark`
  (array of numbers, renders a sparkline — use it for anything with a metric curve).
  Rebalance `size` values so no two adjacent rows have the same shape.
- **Job:** push to `EXPERIENCE`. Set `current:true` on exactly one role; it renders larger. `metrics` is `[[value, label]]`; keep to two per role, the
  number goes in mono purple so it should be a real number. Company mark: set `logo` to a
  file in `assets/logos/` (preferred), or `domain` to use the favicon fallback, or neither
  for a monogram chip.
- **Note:** push to `NOTES` with `date` as `YYYY-MM`, and create `posts/<slug>.html`.
  Post pages should reuse `site.css` and the nav, with a single 64ch column.
- **Graph node:** add to `GRAPH.nodes` with a group id and at least one link, or it will
  drift to the edge.

## Deployment

1. Repo `Anu2711/Anu2711.github.io`, push `main`. Settings → Pages → deploy from `main` / root.
   Add an empty `.nojekyll` so the `_`-prefixed nothing gets ignored.
2. Add `assets/og-image.png` (1200×630) and the `<meta property="og:*">` tags — LinkedIn
   previews are the main way this page will be found.
3. When the domain is bought: add `CNAME` with the bare domain, set A records to GitHub's
   four Pages IPs and a `www` CNAME to `anu2711.github.io`, enable "Enforce HTTPS".
4. Optional: a `resume.pdf` link in the nav once the PDF lives in `/assets`.

## Placeholders to fill (search the file for `[` to find them all)

- Hero: the `availability` card in `FACTS` (marked `todo:true`, renders purple)
- Work: the Stake bullet(s) — `EXPERIENCE[0].bullets`; add `metrics` once there are numbers
- Projects: every `[repo url]` and the `[demo url]` on the tweet classifier
- About: set `PHOTO` to `assets/photo.jpg` after adding the file (portrait, 4:5 crop)
- `assets/resume.pdf` — linked from the nav and the footer; the file doesn't exist yet
- Company marks: `assets/logos/*.svg` and the `logo` field per job

## Roadmap / open decisions

- [ ] Split single file into the layout above
- [ ] Fill the placeholders above
- [ ] Decide whether to publish the phone number or a WhatsApp link (currently omitted)
- [ ] Rejected for now, revisit later: Notes hidden until first post (L6); featured-projects
      layout (L5); JD-keyword tools, certifications, scale-per-role, languages line (R5–R7, R10)
- [ ] Replace favicon-service company marks with proper SVGs in `assets/logos/` (Network
      International, Babylist, RideCo, WAT.ai, SAP) and set `logo` on each job
- [ ] Favicon: a single amber node with two ink edges, 32×32
- [ ] Post template + first note
- [ ] Optional: replace the `spark` arrays with real curves (training loss, RMSE by fold)
- [ ] Lighthouse pass — target 95+ on all four, the fonts are the only heavy asset
