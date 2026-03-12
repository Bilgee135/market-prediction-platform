/*
 * components/evaluations/AccuracyTable.jsx
 *
 * What this is:
 *   The primary metrics comparison table on EvaluationsPage showing
 *   accuracy scores for all six models side by side.
 *
 * Where it is used:
 *   EvaluationsPage.jsx, right column, top table.
 *
 * What it should contain:
 *   - Columns: Model, MAE, MAPE, RMSE, Directional Accuracy
 *   - One row per model (all six)
 *   - Color coded cells: green for best value in column, red for worst
 *   - Rank badge next to model name
 *   - Rows reorder based on the active sort selection from EvaluationsPage
 *   - Small metric explainer labels beneath each column header
 *
 * Props:
 *   models    array of model objects with evaluation metrics from API
 *   sortBy    current sort key (controls row order and highlighting)
 *
 * Development order:
 *   Build when starting EvaluationsPage. Requires the API metrics endpoint
 *   to be working. Use hardcoded mock data initially.
 */