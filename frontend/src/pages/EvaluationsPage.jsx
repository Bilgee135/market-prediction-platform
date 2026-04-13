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


import { Link } from "react-router-dom";

export default function EvaluationsPage() {
    return (

        //the screen fits the whole page height so far but it's not all the page yet
        <div className="min-h-screen bg-[var(--color-off-white)] px-12 py-10">
            
            {/* this is the top section so the label the heading the description and the back button */}
            <div className="flex items-start justify-between mb-8">


                {/* here is the left side which has the label the heading and the description */}
                <div className="max-w-sm">

                    {/* small label at the very top */}
                    <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
                        All Models • Side by Side
                    </p>

                    {/* this is the main heading */}
                    <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-3">
                        Model Evaluations
                    </h1>

                    {/* this is the description explaining what the page shows */}
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                        Compare accuracy metrics, training complexity and directional performance across all six models. Lower MAE and RMSE is better. Higher directional accuracy means the model correctly called up or down more often.
                    </p>
                </div>

                {/* this is the right side which is back to models link */}
                <Link
                    to="/models"
                    className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                >
                    &larr; Back to models
                </Link>
            </div>
        </div>
    );
}

