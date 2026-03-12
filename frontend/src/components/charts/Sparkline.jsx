/*
 * components/charts/Sparkline.jsx
 *
 * What this is:
 *   A small inline chart used as a visual thumbnail inside model cards.
 *   Does not show axes or labels — purely decorative context.
 *
 * Where it is used:
 *   - ModelCard.jsx in the carousel on ModelsPage
 *   - MiniModelCard.jsx on EvaluationsPage
 *
 * What it should contain:
 *   - A compact SVG line chart
 *   - Generated from a seed value or a small hardcoded data array per model
 *   - Colored to match the model's accent color
 *
 * Props:
 *   data    array of numbers representing price points
 *   color   hex string for the line color
 *   width   optional width override
 *   height  optional height override
 *
 * Development order:
 *   Build when starting ModelCard. Keep it simple — a polyline SVG is
 *   sufficient. No interactivity required.
 */