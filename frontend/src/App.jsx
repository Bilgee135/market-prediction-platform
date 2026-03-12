/*
 * App.jsx
 *
 * What this is:
 *   The root component of the application. Sets up React Router and defines
 *   every client-side route. This is the only file that knows about all pages.
 *
 * Where it is used:
 *   Rendered once by main.jsx into the #root div. Never imported anywhere else.
 *
 * What it should contain:
 *   - BrowserRouter wrapping the entire app
 *   - A Routes block mapping URL paths to page components
 *   - A persistent layout wrapper (Navbar + TickerTape) rendered on every route
 *
 * Routes to define:
 *   /                        -> HomePage
 *   /models                  -> ModelsPage
 *   /models/:modelName       -> ModelForecastPage  (one route, six models)
 *   /evaluations             -> EvaluationsPage
 *   /about                   -> AboutPage
 *   /faq                     -> FAQPage
 *
 * Development order:
 *   Build this second, right after Navbar. You cannot test any page navigation
 *   until routes exist. Start with placeholder text in each page component,
 *   confirm routing works, then build pages one by one.
 */

function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">S&P 500 Prediction Platform</h1>
      <p className="text-gray-500 mt-2">Team 45</p>
    </div>
  )
}

export default App

