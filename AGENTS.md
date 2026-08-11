# AGENTS.md — Agentic SDLC

## What this is

Interactive mind-map SPA about AI in the SDLC. Single-page app, **no build step** — open `index.html` in a browser.

## Critical rule: edit `data.js` and `data-fa.js` for content

**`data.js` (English) and `data-fa.js` (Persian) are the ONLY files you edit for content.** All text, all structure renders from `window.SDLC_DATA` and `window.SDLC_DATA_FA`. `app.js` is rendering infrastructure — never touch it for content changes. When adding or editing nodes, update both files.

## Commands

```bash
# Serve locally (no dependencies to install)
npx serve .

# Open directly — works fine without a server
open index.html    # macOS
xdg-open index.html # linux

# Headless screenshot verification (Windows-only, requires sibling project)
node verify.mjs
```

No `package.json`, no `npm install`, no build, no lint, no test suite.

## Architecture

| File | Edit frequency | Purpose |
|---|---|---|
| `data.js` | **daily** | All English content — stages, facets, nodes, principles |
| `data-fa.js` | **daily** | All Persian content — same structure, translated |
| `i18n.js` | rarely | Language switching, UI string translations, RTL detection |
| `app.js` | rarely | Rendering engine (Preact + htm). Self-contained IIFE |
| `styles.css` | rarely | Three themes + layout. CSS custom properties drive theming |
| `index.html` | never | Entry point. Loads vendor libs + data + app in order |
| `vendor/` | never | Vendored Preact/htm + marked.js (no npm) |
| `myNeirizi.ttf` | never | Local Persian font, used via @font-face |

## Data model (`data.js`)

Recursive node structure — nest `children` as deep as needed:

```js
{
  title: "short label",
  body: `markdown prose (template literal)`,
  tags: { source: "draft" },          // omit = endorsed content
  blocks: [{ type: "links", items: [{ label, url }] }],
  children: [ /* more nodes */ ]
}
```

- **Draft nodes** have `tags: { source: "draft" }` — renders an amber "draft" badge
- **Endorsed nodes** have no `tags` field — these are the human-validated content
- Four facets per stage: `opportunities`, `risks`, `feedforward`, `guardrails`
- Six stages: `analysis`, `architecture`, `development`, `testing`, `delivery`, `operations`

## Theming

Three themes cycle via topbar button: `pro` (light, default) → `dark` (instrument panel) → `paper` (field notes).

Theme persists in `localStorage` key `sdlc-theme`. Applied before first paint via inline script in `index.html` to avoid flash.

## i18n

Two languages: English (`en`) and Persian/Farsi (`fa`). Language persists in `localStorage` key `sdlc-lang`.

- `i18n.js` — `window.I18n` API: `setLanguage()`, `getLanguage()`, `getDirection()`, `t(key)`
- `data-fa.js` — `window.SDLC_DATA_FA` mirrors `window.SDLC_DATA` structure with Persian text
- `app.js` calls `syncData()` on language change to swap between `SDLC_DATA` and `SDLC_DATA_FA`
- RTL direction handled by `dir="rtl"` on `<html>` — let the browser flip grid/flex, don't fight it with `row-reverse`
- SVG mini-wheel adapts per direction: shows the visible half, rotates active stage into view

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`. Triggers on push to `main` or `v*` tags. No build step — copies static files directly.

## Routing

Hash-based: `#/`, `#/principles`, `#/stage/{id}`, `#/stage/{id}/{facet}`

View Transitions API used for smooth home ↔ detail morph (progressive enhancement).

## `verify.mjs` quirks

- Hardcoded Windows path to a sibling project for Playwright: `C:/Repos/ideas-pocs/presentation/claude/`
- Screenshots go to `screenshots/` (gitignored)
- Only useful for visual regression, not functional testing

## Conventions

- All content is markdown in template literals (backtick strings)
- Links in nodes use the `blocks` array, not markdown links
- Font stacks are loaded from Google Fonts in `index.html` — don't add more without checking performance
- SVG wheel geometry is pure math in `app.js` — don't hand-edit the SVG
