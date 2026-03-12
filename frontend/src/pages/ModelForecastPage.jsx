/*
 * pages/ModelForecastPage.jsx
 *
 * What this is:
 *   The individual model forecast page. One component handles all six
 *   models — the model is determined by the :modelName URL parameter.
 *
 * Where it is used:
 *   App.jsx at route /models/:modelName
 *   Accessed via URLs like /models/lstm, /models/xgboost, etc.
 *
 * What it should contain:
 *   - Breadcrumb navigation and back button
 *   - ControlBar with timeframe, chart type, currency, accuracy display
 *   - Main two-column content grid:
 *       Left: CandlestickChart
 *       Right: PredictionPanel + ModelExplanation
 *   - RecentDataTable below the grid
 *   - Bottom disclaimer bar and link to /evaluations
 *
 * State:
 *   timeframe, chartType, currency (controlled by ControlBar)
 *   historicalData, predictedData, loading, error (from API)
 *
 * Data dependencies:
 *   GET /api/historical?weeks=N
 *   GET /api/predictions/:modelName
 *
 * Development order:
 *   Build after ModelsPage. This is the most complex page — build
 *   and test each sub-component separately before assembling here.
 */