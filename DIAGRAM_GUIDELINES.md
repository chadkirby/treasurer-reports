# Diagram Layout Guidelines

This project uses custom SVG-based relationship diagrams (see `src/components/ui/RelationshipDiagram.jsx`) and Mermaid sources for reference only. The goal is presentation-quality readability on a single screen. These rules reflect user preferences and must be followed for any new or modified diagram work.

## Layout Principles
- **One screen**: Each diagram must fit on a single screen without scrolling.
- **Centered alignment**: Primary nodes should be centered in the diagram; side groups can be offset only to clarify the narrative.
- **Clear vertical hierarchy**: Governance flows top-to-bottom; ownership/landowner relationships should not interfere with the governance path.
- **Side groups**: When a secondary cluster (e.g., Min’s entities) is not central to the main flow, place it off to the side to avoid crossing the main governance arrows.
- **Avoid crossing**: A line should never cross a block. A line should not cross a line label. Avoid line crossings when possible.

## Boxes (Nodes)
- **Uniform size**: Use consistent widths and heights across peer nodes.
- **Simplified text**: Node labels must be minimal (no parentheticals). Supporting details belong in prose on the slide.
- **Vertical text centering**: Text must be vertically centered within its box.
- **Readable typography**: Use a serif font that matches the deck (Times New Roman is fine).

## Lines (Edges)
- **No intersections**: Lines should never intersect blocks. Do not route lines through nodes.
- **Minimal crossings**: Avoid line-line crossings whenever possible.
- **Curves for clarity**: Use curves when necessary to avoid overlaps or to keep the hierarchy clear.

## Labels
- **Centered on line**: Labels must sit on the midpoint of the line or curve they describe.
- **Opaque background**: Labels must have an opaque background so the line doesn’t interfere with readability.
- **Compact label background**: Label background should cover only the text and minimal padding—no oversized pill shapes.
- **Never intersect blocks**: Labels should not overlap or intersect any node.
- **Never intersect other labels**: Labels must not overlap each other.

## Spacing Rules
- **Balanced vertical spacing**: Ensure enough space between stacked nodes for labels without collisions.
- **Main governance spacing**: There should be enough space between “Homeowners” and “Board” for a legible label; reduce space between “Board” and “HOA” to tighten the main narrative.
- **Side cluster spacing**: The Min cluster should have enough separation for its control labels without obscuring arrow segments.

## Practical Implementation Notes
- Use a fixed viewBox and explicit coordinates for all boxes.
- Prefer explicit label positioning (midpoints of lines/curves) rather than manual offsets.
- If a label collides with a line or node, adjust the **line path**, not the label.
- Mermaid diagrams are **references only**. The rendered diagrams are custom SVG for pixel-level control.
