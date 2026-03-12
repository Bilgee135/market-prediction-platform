/*
 * pages/HomePage.jsx
 *
 * What this is:
 *   The landing page of the application. The first thing a user sees.
 *
 * Where it is used:
 *   App.jsx at route /
 *
 * What it should contain:
 *   - Two column hero layout
 *   - Left: eyebrow label, headline, subtext, two CTA buttons, StatStrip
 *   - Right: a chart card showing a live S&P 500 candlestick preview
 *     with model pill selectors and a next-week forecast footer
 *
 * Data dependencies:
 *   None initially. Chart card can use hardcoded data for now.
 *   Wire to GET /api/historical later for the live chart.
 *
 * Development order:
 *   Build third, after Navbar and App.jsx routing are working.
 */