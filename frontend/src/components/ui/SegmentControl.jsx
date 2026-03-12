/*
 * components/ui/SegmentControl.jsx
 *
 * What this is:
 *   A reusable toggle button group where only one option can be active
 *   at a time. Used in multiple places across the app.
 *
 * Where it is used:
 *   - ControlBar.jsx (timeframe selector: 1M / 3M / 6M / 1Y)
 *   - ControlBar.jsx (chart type selector: Candlestick / Line)
 *   - EvaluationsPage.jsx (sort selector: Dir. Accuracy / MAE / RMSE / Speed)
 *
 * What it should contain:
 *   - A row of buttons rendered from a options prop
 *   - Active button styled with filled background
 *   - Calls onChange with the selected value when a button is clicked
 *   - No internal state — fully controlled by the parent
 *
 * Props:
 *   options   array of { label, value } objects
 *   value     currently active value (controlled)
 *   onChange  function called with the new value on selection
 *
 * Development order:
 *   Build early. ControlBar and EvaluationsPage both depend on this
 *   and it is a simple stateless component to get right quickly.
 */