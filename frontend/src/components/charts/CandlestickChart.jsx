/*
 * components/charts/CandlestickChart.jsx
 *
 * What this is:
 *   The main price chart on the model forecast page. Renders historical
 *   OHLCV candlesticks and overlays faded predicted candles with a dashed
 *   line beyond the "NOW" divider.
 *
 * Where it is used:
 *   ModelForecastPage.jsx inside the main chart panel.
 *
 * What it should contain:
 *   - SVG-based candlestick chart (or Plotly/Chart.js if preferred)
 *   - Historical candles rendered in full opacity
 *   - A vertical dashed "NOW" divider separating past from forecast
 *   - Predicted candles rendered at reduced opacity beyond the divider
 *   - A dashed polyline connecting the last actual candle to the forecast
 *   - Y-axis labels on the left
 *   - Responds to the chartType prop (Candlestick vs Line)
 *   - Responds to the timeframe prop (1M / 3M / 6M / 1Y) to slice data
 *
 * Props:
 *   historicalData  array of OHLCV objects from the API
 *   predictedData   array of predicted OHLCV objects from the API
 *   chartType       "candlestick" or "line"
 *   timeframe       "1M" | "3M" | "6M" | "1Y"
 *
 * Development order:
 *   Build after ControlBar. Start with hardcoded data to get the rendering
 *   right, then wire to real API data. This is the most complex component
 *   in the project — leave enough time for it.
 */