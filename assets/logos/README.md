# Company marks

`data/experience.js` renders each job's logo in this order of preference:

1. `logo: "assets/logos/<file>.svg"` — a file placed here
2. `domain: "<company domain>"` — favicon pulled live from Google's favicon service
3. neither — a monogram chip built from the company initials

Every job currently uses the `domain` fallback, which is why nothing here is required
before launch. Replace it with an official mark when you have one: save the file below,
then set `logo` on the matching job in `data/experience.js` (drop `domain` or keep it —
`logo` always wins).

| Company | Current domain fallback | Save as | Where to get the official SVG |
|---|---|---|---|
| Stake | getstake.com | `stake.svg` | Ask their brand/marketing team, or use the mark from their own site header/footer (check usage terms first) |
| Network International | network.ae | `network-international.svg` | Their newsroom / press page, or request from their marketing team |
| Babylist | babylist.com | `babylist.svg` | [babylist.com/press](https://www.babylist.com/press) usually has a press kit with logo assets |
| RideCo, Transit Labs | rideco.com | `rideco.svg` | Their website footer, or request from RideCo directly |
| WAT.ai | watai.ca | `watai.svg` | [watai.ca](https://watai.ca) — check their site or GitHub org for a brand asset |
| SAP | sap.com | `sap.svg` | [sap.com/about/newsroom/brand-guidelines.html](https://www.sap.com) or their official brand assets page |

Keep each file a clean SVG (no embedded raster), roughly square, transparent background —
they render at 26×26px inside a 40×40px tile.
