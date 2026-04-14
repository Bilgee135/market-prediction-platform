/*
 * components/forecast/ModelExplanation.jsx
 *
 * What this is:
 *   The right-hand panel section beneath PredictionPanel on ModelForecastPage.
 *   Explains the technical details of the current model to the user.
 *
 * Where it is used:
 *   ModelForecastPage.jsx, right column, lower section.
 *
 * What it should contain:
 *   - Architecture description (e.g. "Two stacked LSTM layers...")
 *   - Input features list as chips (e.g. RSI, MACD, SMA 20...)
 *   - Evaluation metric chips (MAE, RMSE, directional accuracy values)
 *   - Best suited for description
 *
 * Props:
 *   model   model metadata object from data/models.js
 *   metrics object with MAE, RMSE, directional accuracy from API
 *
 * Development order:
 *   Build alongside PredictionPanel. Both live in the same right column
 *   and can be developed and tested together.
 */
