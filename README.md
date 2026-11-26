# StatAtlas — The United States in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/meongs123/statatlas-usa/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/meongs123/statatlas-usa/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

One country, every number that matters. StatAtlas is a national statistics site
for the United States: population, economy, housing, education and the states —
every figure labelled with its source and year.

## The site

Static files under `app/`, no build step, zero network requests. Open
`app/index.html` in desktop Chrome or on a phone, or serve it locally:

```sh
node serve.ts
# app/ is on http://localhost:8080
```

Seven hash routes, all reached by links in the masthead:

| Route | Page |
|---|---|
| `#/` | Home — headline stats, age chart, top states |
| `#/population` | Population, age structure, growth & migration |
| `#/economy` | GDP, income, poverty, housing, business, education |
| `#/states` | States ranked — sort, region filter, text filter, row detail |
| `#/compare` | United States vs Indonesia on shared World Bank indicators |
| `#/sources` | Every figure with value, vintage and source |
| `#/about` | Method: CPS vs ACS vs WDI, and why vintages differ |

Charts are hand-rolled SVG; there is no framework and no external font, image
or script. All data is held in `app/data.js`, one figure per verified source
row (U1–U25 for the US, I2/I4–I6/I10–I13 for Indonesia in the compare view).

## Method notes

- One income figure per view: the headline median is $80,610 (CPS ASEC, 2023).
  The ACS 5-year median ($80,734, 2020–2024) is listed only on Sources.
- One poverty headline: 11.1% (CPS 2023); the QuickFacts current value (10.2%)
  is footnoted.
- The compare view uses shared World Bank WDI indicators only. Indonesia's
  national poverty line and its survey unemployment rate are never placed
  beside the US figures as if comparable — they are footnoted with their method.
- Figures that could not be verified against a named source were left out
  rather than guessed (see the Sources page).

## Hand-in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, stdlib only) copies `app/` and `screenshots/` to the output
directory and writes `dossier.json` with the vendored `vendor/makefun-frontend.ts`.

## License

MIT — see [LICENSE](LICENSE).
