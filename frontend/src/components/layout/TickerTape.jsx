/*
 * components/layout/TickerTape.jsx
 *
 * What this is:
 *   The horizontally scrolling stock ticker strip rendered below the Navbar
 *   on every page.
 *
 * Where it is used:
 *   App.jsx, directly below Navbar, outside the Routes block.
 *
 * What it should contain:
 *   - A continuously scrolling strip of stock symbols, prices, and change
 *     percentages (S&P 500, AAPL, MSFT, AMZN, NVDA, GOOGL, META, TSLA, JPM)
 *   - Items duplicated so the loop is seamless
 *   - Green color for positive change, red for negative
 *   - CSS animation for the scroll (no JavaScript interval needed)
 *
 * Props: none — data is hardcoded for now. Replace the array with an API
 *   call to a live market data source post-demo if desired.
 *
 * Development order:
 *   Build alongside Navbar as part of the shared layout layer.
 *   Both should be done before any page is built.
 */