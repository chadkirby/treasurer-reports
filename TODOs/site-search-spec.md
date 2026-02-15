# Site Search Spec (Draft)

## Why this exists
Capture the current plan for a cross-site search feature so we can implement it later without losing context.

## Problem Statement
We need global search across report content, not just in-page filtering. Results must navigate users to the correct slide/route and support content loaded from source files.

## Current Constraints
- App is a static Vite + React site, deployed to GitHub Pages.
- Much content is loaded at runtime from `public/sources/**` (Markdown, CSV-backed displays, SVG diagrams).
- A useful result must include a target route (slide URL), not only matching text.

## Search Scope (Target)
- Search slide titles.
- Search Markdown source text (`public/sources/**/*.md`).
- Search SVG textual content (`public/sources/**/*.svg`), including diagram labels.
- Optional later: include selected CSV text/value fields where meaningful.

## Key Design Decision
Use a build-time generated index file (`public/search-index.json`) plus client-side querying.

This avoids SSR requirements and keeps GitHub Pages compatibility.

## Route Mapping Strategy
Primary recommendation: explicit file-to-route mapping in a config file.

Why:
- Deterministic and easy to reason about.
- Avoids brittle parsing of JSX usage patterns.
- Easier to review when new sources are added.

Possible future enhancement:
- Add auto-discovery from slide source files to reduce manual mapping work.

## SVG Indexing Notes
Indexer should parse SVG/XML and extract text from:
- `<text>` and `<tspan>`
- `<title>` and `<desc>`
- useful labeling attributes when present (e.g., `aria-label`)

Normalize extracted text:
- collapse whitespace
- lowercase for matching
- strip non-content markup noise

## Proposed Data Model (Index Entries)
Each indexed record should include:
- `id`: stable unique key
- `route`: slide route (e.g., `/cast-framework`)
- `sourcePath`: source file path
- `kind`: `slide-title | markdown | svg | csv` (csv optional in MVP)
- `title`: display label
- `content`: searchable text body
- `section`: optional heading/context

## MVP UX
- Open global search from command palette entry point (existing UI) and/or `/`.
- Typeahead results with:
  - title
  - snippet
  - route target
  - source kind badge (md/svg/title)
- Enter selects highlighted result and navigates.

## MVP Implementation Plan
1. Add indexer script to generate `public/search-index.json`.
2. Add explicit mapping config (`file -> route` and optional section metadata).
3. Wire client search hook to load index once and query locally.
4. Add result rendering in command palette (global mode).
5. Add fallback/empty states and basic keyboard support.

## Open Questions
- Should CSV content be indexed in MVP or phase 2?
- Do we want per-route anchors (heading-level deep links) in MVP?
- Should results be grouped by slide or sorted only by relevance?

## Acceptance Criteria (MVP)
- Query matches content from Markdown and SVG text.
- Each result navigates to the correct slide route.
- Works in static deployment (GitHub Pages) without server APIs.
- Index generation runs during build and produces deterministic output.

## Phase 2 Ideas
- Auto-discover source-to-route mapping from slide modules.
- Better ranking (field boosts: title > heading > body).
- Highlight matched terms in snippet.
- Add filters by kind (title/md/svg/csv).
