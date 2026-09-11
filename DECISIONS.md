# Portfolio site — decision log (as of 11 Sept 2026)

Owner: Anusha Raisinghani. Deliverables: `index.html` (single file, data arrays at top of
script), `CLAUDE.md` (design/engineering context for Claude Code). Deploy on GitHub Pages
first, custom domain later. Iteration continues in Claude Code.

## Concept and direction
- Editorial, high-end-agency feel, not a corporate template. "Working notebook of an
  analytics engineer." Data-native motifs: plotting-paper grid, a live force graph of the
  stack, sparklines, mono data labels.
- Reference sites: dhaitz.github.io, andlukyane.com, zachjordan.io (content-first,
  author-owned), adrianvalera.com (stacked identity headline, logo wall, staggered reveals).
- One bold element: the hero graph. Everything else quiet.

## Palette (approved, "amazing")
- Paper `#F4F2F9` lilac-tinted, faint page-wide plotting grid (`--grid` at 5% ink).
- Paper-2 `#E9E4F3` lavender wash for hover/one-in-four cards.
- Ink `#231C3D` deep violet. Ink-2 `#4E4768`. Trace `#A9A1C4` hairlines/ticks.
- Signal `#6A4FD6` — the only saturated purple: links, metrics, annotations, active edges.
- Amber `#F0A31F` — firing nodes in the graph only, never UI.
- Rejected: cream + terracotta, black + neon, dark mode, cobalt (v1).

## Typography
- Caveat (handwritten): h1, h2, "Write to me.", callout-card values, margin notes.
- Instrument Sans at `wdth 92`: body, UI, h3, contact lede. Chosen over DM Sans for
  narrower rhythm and pen-like details that sit better next to a script.
- DM Mono: only where numbers are read as data (years, metrics, ticks, tags, card labels).
- Rejected: Fraunces (v1), Schibsted Grotesk + JetBrains Mono (fought the script), DM Sans
  (fine but generic next to Caveat).

## Layout and structure
- Section order: hero → About (lede + short para + photo slot) → Work → Projects → Stack
  → Notes → Contact. Stack moved after Projects so recruiters reach Work in one scroll.
- 12-col grid, left-aligned, sticky 3-col section headings with a mono count beneath
  ("7 roles, 2022 to present", "6 projects", "N tools").
- Hero: "Hi, I'm Anusha Raisinghani." → stacked "Data Scientist / *and* Engineer" (≤ 88px,
  was 124px, judged way too big) → six pinned callout cards (role, industry: Fintech, based
  in, visa: Golden Visa no sponsorship, education: B.Math Waterloo, availability
  placeholder). No prose paragraph in the hero.
- Work: three callout cards first (full-time yrs, co-op yrs, companies) computed from each
  role's `start`/`end`/`type`; then year rail. Current role rendered larger, all others
  smaller. No "Earlier" collapse (rejected).
- Projects: uneven 6-col grid with wide/narrow spans, sparklines on some cards.
- Contact: sans lede at normal size; only "Write to me." is handwritten and large.
- Footer: "Last updated <month year>" replaces the "hand-built" colophon.
- Resume link in nav and contact (`assets/resume.pdf`, placeholder).
- Graph hidden under 700px.

## Motion (reactive, not ambient)
- Load: headline lines rise first (0–500ms), then graph fades in and starts (800ms), then
  hero cards fan in. Only unprompted motion on the page.
- Graph: slow drift; pulses only while pointer is inside; nodes draggable.
- Scroll: experience rail draws, years light up, metrics count up, annotations reveal with
  highlighter swipe and self-drawing arrow, stack tiles and work cards stagger in.
- Hover: underlines thicken, project cards wash lavender and redraw sparkline, stack tiles
  switch to brand colour and show name, callout cards straighten and lift.
- `prefers-reduced-motion` respected throughout.

## Components
- Margin notes (`.ann`): 22–28px Caveat in signal purple, one per section max, inline
  on mobile. Job-level notes via `note` field attach to first metric.
- Stack tiles: Simple Icons marks tinted ink at rest, brand colour on hover, monogram
  fallback for tools without a public mark (SQL, Sigma, SageMaker, Power BI,
  BeautifulSoup, Azure). Brand colour never at rest. Git and Docker added; "Collection"
  group renamed "Also".
- Company marks in Work: `logo` file (preferred) → favicon via `domain` → monogram.
- Photo slot in About heading column (`PHOTO` const, 4:5 portrait).

## Content decisions
- New role: Analytics Engineer at Stake (Sept 2026 – present, `current:true`,
  placeholder bullet). Network International closed at Sept 2026.
- Phone number omitted from public site (open: WhatsApp link later).
- Every placeholder is a bracketed string — `grep '\['` to list them: availability card,
  Stake bullets, `[repo url]` × 5, `[demo url]`, `PHOTO`, `assets/resume.pdf`, logos.

## Rejected or deferred (recruiter + layout review)
- L5 featured-projects layout; L6 hide Notes until first post.
- R5 add JD-keyword tools (Fabric/Synapse/Kafka/Great Expectations/GenAI) — pending
  what was actually used; R6 certifications line; R7 scale per role; R10 languages +
  WhatsApp. Revisit when content exists.
- Possible future cut: drop About entirely and fold the photo into the hero.

## Deployment plan
- Repo `Anu2711/Anu2711.github.io`, Pages from `main`/root, `.nojekyll`.
- Split single file into `css/`, `js/`, `data/`, `posts/`, `assets/` (see CLAUDE.md).
- OG image + meta tags before sharing on LinkedIn. `CNAME` + DNS when domain is bought.
