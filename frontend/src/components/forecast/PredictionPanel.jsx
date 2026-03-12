/*
 * components/forecast/PredictionPanel.jsx
 *
 * What this is:
 *   The right-hand panel on ModelForecastPage showing the model's
 *   next-week prediction summary.
 *
 * Where it is used:
 *   ModelForecastPage.jsx, right column, top section.
 *
 * What it should contain:
 *   - Predicted close price (converted to selected currency)
 *   - Percentage change from last close
 *   - Bullish or bearish badge depending on direction
 *   - Stat rows: predicted open, high, low, close
 *   - A small disclaimer note at the bottom
 *
 * Props:
 *   prediction   object with predicted OHLC values from API
 *   currency     currently selected currency string
 *   rate         exchange rate multiplier for currency conversion
 *
 * Development order:
 *   Build after the API data shape is confirmed. The layout is simple —
 *   this is mostly a display component with no interactivity.
 */