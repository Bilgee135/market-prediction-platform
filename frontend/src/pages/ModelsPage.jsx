/*
 * pages/ModelsPage.jsx
 *
 * What this is:
 *   The model selection page where users browse all six ML models
 *   before choosing one to explore.
 *
 * Where it is used:
 *   App.jsx at route /models
 *
 * What it should contain:
 *   - DisclaimerModal fired on mount, blocks content until confirmed
 *   - Two column layout after confirmation
 *   - Left: live S&P index pill, about text, three-step how-it-works
 *   - Right: ModelCarousel with all six model cards
 *   - Bottom CTA linking to /evaluations
 *
 * State:
 *   disclaimerConfirmed   boolean, controls whether modal shows
 *
 * Development order:
 *   Build after HomePage. Depends on DisclaimerModal, ModelCarousel,
 *   ModelCard, and Sparkline all being ready first.
 */