/*
 * components/forecast/ControlBar.jsx
 *
 * What this is:
 *   The horizontal controls strip at the top of ModelForecastPage.
 *   Contains all the interactive options that change how the chart displays.
 *
 * Where it is used:
 *   ModelForecastPage.jsx, directly above the main chart panel.
 *
 * What it should contain:
 *   - Timeframe segment control (1M / 3M / 6M / 1Y)
 *   - Chart type segment control (Candlestick / Line)
 *   - Accuracy pill display (Dir. Acc / RMSE / MAE — read only, from API)
 *   - Currency selector dropdown (USD / GBP / EUR / JPY)
 *
 * Props:
 *   timeframe       current value
 *   onTimeframe     setter function
 *   chartType       current value
 *   onChartType     setter function
 *   currency        current value
 *   onCurrency      setter function
 *   accuracy        object with dirAcc, rmse, mae from API data
 *
 * Development order:
 *   Build early in the ModelForecastPage development. State for all these
 *   values lives in ModelForecastPage and is passed down as props.
 */
