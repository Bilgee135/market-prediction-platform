/*
 * pages/EvaluationsPage.jsx
 *
 * What this is:
 *   The model comparison page showing all six models ranked against
 *   each other by accuracy and complexity metrics.
 *
 * Where it is used:
 *   App.jsx at route /evaluations
 *
 * What it should contain:
 *   - Page header with description
 *   - SegmentControl for sort selection (Dir. Accuracy / MAE / RMSE / Speed)
 *   - Two column layout:
 *       Left: 2x2 MiniModelCard grid + BestOverallCard + ResearchNote
 *       Right: AccuracyTable + ComplexityTable
 *   - Sort state controls the order of rows in both tables and which
 *     models appear in the top 4 grid
 *
 * State:
 *   sortBy   string, currently active sort key
 *
 * Data dependencies:
 *   GET /api/models  (returns all six models with their evaluation metrics)
 *
 * Development order:
 *   Build after ModelForecastPage. Requires the API metrics endpoint
 *   to be available or mocked.
 */


//done sanity check and removed it after it worked
export default function EvaluationsPage() {
    return <div></div>;
}

