# Treasurer's Report Presentation Site

## Project Overview
Create a static web application to serve as the interactive Treasurer's Report for HOA Board meetings. The site should function like a "slide deck" for presentation purposes but allow for deep-diving into data and supporting documentation.

## Core Philosophy
1.  **Presentation-First**: The UI should be optimized for a projector/screen share (clean, large text, clear navigation).
2.  **Living Data**: valid data sources (`sources/2021-2025/*.csv`) and narrative notes (`sources/2021-2025/*.md`) should drive the content. Updating a CSV or Markdown file should update the site.
3.  **Audit Trail**: The site must link back to source documents or explain methodologies (using the content from `sources/METHODOLOGY.md` and `sources/2021-2025/`).
4.  **Static Deployment**: Must be deployable to GitHub Pages.

## Data Sources
The application will consume data from the `sources/2021-2025/` directory:
*   **Financial Data (CSV)**: `Cash Inflows.csv`, `Cash Outflows by Category.csv`, `Overall Financial Position.csv`, etc.
    *   *Note*: These files may change structure or be added/removed. The code should be resilient or easily adaptable.
*   **Narrative Content (Markdown)**: `Observations.md`, `Reserve Study Analysis.md`, `Simple Home.md`, etc.
    *   These contain the "speech track" or detailed analysis for specific sections.

## Functional Requirements

### Navigation (The "Deck")
*   Linear navigation (Next/Prev) to move through the report sections (e.g., "Overview", "Inflows", "Outflows", "Reserves").
*   A "Table of Contents" or overview mode to jump to specific sections.

### Architecture & Tech Stack
*   **Framework**: React (via Vite) used as a static site generator.
*   **Deployment**: GitHub Pages (GH Actions workflow).
*   **Styling**: Premium, clean aesthetic. "Business Professional but Modern." High contrast for readability during meetings.
*   **Visualization**: Chart.js or Recharts for interactive graphs.
*   **Content Loading**:
    *   Parse CSVs at build time (or runtime if feasible/performant).
    *   Render Markdown content as HTML components.

## Proposed Slide (Section) List
1.  **Title Slide**: Report Date & Presenter.
2.  **Executive Summary**: High-level bullet points (sourced from `Observations.md`?).
3.  **Financial Position**: Interactive chart of `Overall Financial Position.csv`.
4.  **Income Analysis**: Breakdown of `Cash Inflows.csv` vs `Cash Inflows.md` commentary.
5.  **Spending Analysis**:
    *   Category breakdown (`Cash Outflows by Category.csv`).
    *   Payee breakdown (`Cash Outflows by Payee.csv`).
    *   Narrative context from files like `Sustainable Groundworks.md` or `Stormwater Maintenance.md`.
6.  **Reserve Study**: Visualization of `2025 Reserve Study.md` data/analysis.
7.  **Methodology / Appendix**: Raw data tables and the content of `sources/METHODOLOGY.md`.

## Development Plan
1.  **Scaffold**: Set up Vite + React + simple router.
2.  **Data Layer**: Create utilities to load and parse the CSVs and MD files.
3.  **Component Library**:
    *   `SlideLayout`: Common shell with navigation.
    *   `MetricCard`: For big numbers (e.g., "Cash on Hand").
    *   `ChartContainer`: Wrapper for consistency.
    *   `MarkdownBlock`: For rendering the commentary.
4.  **Assembly**: Build out the specific slides mapping to the source files.
