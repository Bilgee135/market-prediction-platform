/*
 * pages/FAQPage.jsx
 *
 * What this is:
 *   The frequently asked questions page with a filterable accordion.
 *
 * Where it is used:
 *   App.jsx at route /faq
 *
 * What it should contain:
 *   - Two column layout
 *   - Left: sticky sidebar with title, description, category filter buttons
 *   - Right: accordion of questions grouped by category
 *   - Category filter buttons (All / Predictions / Models / Data / Platform)
 *     control which questions are visible
 *   - Accordion items open and close on click, only one open at a time
 *     (or multiple — decide during build)
 *
 * State:
 *   activeCategory   string filter controlling visible questions
 *   openItem         index of the currently open accordion item
 *
 * Data dependencies:
 *   None. All 15 questions and answers are hardcoded as a JS array
 *   at the top of this file.
 *
 * Development order:
 *   Build last. No dependencies on API or other complex components.
 */


//sanity check was done with faq page once it worked i removed it
export default function FAQPage() {
    return <div></div>;
}

