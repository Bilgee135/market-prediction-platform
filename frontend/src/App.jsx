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

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import TickerTape from "./components/layout/TickerTape";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EvaluationsPage from "./pages/EvaluationsPage";
import ModelsPage from "./pages/ModelsPage";
import ModelForecastPage from "./pages/ModelForecastPage";
import FAQPage from "./pages/FAQPage";

function App() {

  const [disclaimerConfirmed, setDisclaimerConfirmed] = useState(false);
  return (

    <BrowserRouter basename="/~sgbtuvsh/team45/">
    
      {/*the browserrouter will enable routing throughout all of it */}
    
      <Navbar />
      <TickerTape />

    {/* route will check the url and show the matching page */}
    
      <Routes>
        {/* path will equal to the URL, element is equal to the page to show */}

        <Route path="/"                   element={<HomePage />} />
        <Route path="/about"              element={<AboutPage />} />
        <Route path="/evaluations"        element={<EvaluationsPage />} />
        <Route path="/models"             element={<ModelsPage disclaimerConfirmed={disclaimerConfirmed} setDisclaimerConfirmed={setDisclaimerConfirmed} />} />
        <Route path="/models/:modelName"  element={<ModelForecastPage />} />
        <Route path="/faq"                element={<FAQPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

