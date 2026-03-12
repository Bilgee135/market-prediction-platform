/*
 * components/evaluations/BestOverallCard.jsx
 *
 * What this is:
 *   A highlighted card on EvaluationsPage declaring the best overall
 *   model based on the current sort criteria.
 *
 * Where it is used:
 *   EvaluationsPage.jsx, left column, below the mini chart grid.
 *
 * What it should contain:
 *   - Dark ink background to distinguish it visually
 *   - "Best Overall" label
 *   - Model name and type badge
 *   - Short justification text (e.g. "Best directional accuracy at 75%")
 *   - A link to that model's forecast page
 *
 * Props:
 *   model    the top-ranked model object based on current sort
 *   sortBy   current sort key (used to generate the justification text)
 *
 * Development order:
 *   Build at the end of EvaluationsPage development. Depends on sort
 *   logic being in place first.
 */