/*
 * components/models/MiniModelCard.jsx
 *
 * What this is:
 *   A compact model card used in the 2x2 grid on EvaluationsPage.
 *   Shows a sparkline and the model name with a rank badge. Clicking
 *   navigates to that model's forecast page.
 *
 * Where it is used:
 *   EvaluationsPage.jsx, in the left column grid.
 *
 * What it should contain:
 *   - Rank badge (1 to 4, color coded by rank)
 *   - Sparkline chart
 *   - Model name
 *   - One key metric relevant to the current sort (e.g. directional accuracy)
 *   - Clickable, navigates to /models/:name
 *
 * Props:
 *   model   model metadata object
 *   rank    number (1 to 4)
 *   metric  the value to display (changes based on current sort selection)
 *
 * Development order:
 *   Build when starting EvaluationsPage.
 */
