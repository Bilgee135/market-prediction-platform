/*
 * components/layout/Navbar.jsx
 *
 * What this is:
 *   The sticky top navigation bar rendered on every single page of the app.
 *
 * Where it is used:
 *   App.jsx, rendered outside the Routes block so it persists across navigation.
 *
 * What it should contain:
 *   - Logo mark (five stacked bars SVG) and site title on the left
 *   - Navigation links on the right using React Router <Link> components:
 *       Overview  -> /
 *       Models    -> /models
 *       Forecast  -> /models/lstm  (links to default model)
 *       About     -> /about
 *       FAQ       -> /faq  (styled as a CTA button)
 *   - Active link highlighting based on current route (useLocation hook)
 *   - Sticky positioning so it stays at the top on scroll
 *
 * Development order:
 *   Build this first. Every page test during development depends on
 *   being able to navigate between pages.
 */