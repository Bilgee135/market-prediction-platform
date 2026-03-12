/*
 * components/forecast/RecentDataTable.jsx
 *
 * What this is:
 *   The data table at the bottom of ModelForecastPage showing recent
 *   historical weeks and the upcoming forecast rows.
 *
 * Where it is used:
 *   ModelForecastPage.jsx, below the main chart and right panel.
 *
 * What it should contain:
 *   - Columns: Week, Open, High, Low, Close, Change
 *   - Last 4 rows from historical data (actual values, with % change)
 *   - Next 2 rows as forecast (faded styling, "Forecast" badge instead of %)
 *   - Currency conversion applied to all price columns
 *
 * Props:
 *   historicalRows   array of recent OHLCV rows from API
 *   forecastRows     array of predicted rows from API
 *   currency         currently selected currency string
 *   rate             exchange rate multiplier
 *
 * Development order:
 *   Build after PredictionPanel. Requires the API data shape to be
 *   confirmed first since it renders live data directly.
 */