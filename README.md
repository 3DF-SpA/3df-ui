# 3DF UI

Vue 3 component library + SVG charts — TypeScript, Tailwind CSS v4, tree-shakeable.

[![npm @3df-spa/ui](https://img.shields.io/npm/v/@3df-spa/ui?label=%403df-spa%2Fui)](https://www.npmjs.com/package/@3df-spa/ui)
[![npm @3df-spa/charts](https://img.shields.io/npm/v/@3df-spa/charts?label=%403df-spa%2Fcharts)](https://www.npmjs.com/package/@3df-spa/charts)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Packages

| Package | Description |
|---|---|
| [`@3df-spa/ui`](packages/ui) | 199 Vue 3 components — forms, layout, navigation, overlays, feedback |
| [`@3df-spa/charts`](packages/charts) | 6 pure SVG chart types — zero dependencies |

## Installation

```bash
# Component library
pnpm add @3df-spa/ui

# Charts (optional)
pnpm add @3df-spa/charts

# Optional peer deps
pnpm add date-fns          # Calendar / DatePicker
pnpm add embla-carousel    # Carousel
```

## Setup

```css
@import "tailwindcss";
@import "@3df-spa/ui/theme.css";
```

## License

MIT © 2026-present [3DF SpA](https://github.com/3DF-SpA)
