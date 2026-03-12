/*
 * components/ui/StatStrip.jsx
 *
 * What this is:
 *   A horizontal row of stat figures with labels beneath them.
 *
 * Where it is used:
 *   - HomePage.jsx  (6 ML Models / 100yr Data / 52wk Forecasted)
 *   - AboutPage.jsx (6 ML Models / 100yr Data / 7 Team Members / 15wk Build)
 *
 * What it should contain:
 *   - A row of stat items, each with a large value and a small label
 *   - Rendered from a stats prop so the same component works in both pages
 *     with different content
 *
 * Props:
 *   stats   array of { value, label } objects
 *
 * Development order:
 *   Build when starting HomePage. It is a small, stateless component
 *   with no dependencies.
 */