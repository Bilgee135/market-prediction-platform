/*
 * components/models/ModelCard.jsx
 *
 * What this is:
 *   A single model card displayed inside the carousel on ModelsPage.
 *   Contains all the descriptive information about one ML model.
 *
 * Where it is used:
 *   ModelCarousel.jsx — one card rendered at a time.
 *
 * What it should contain:
 *   - Model type badge (e.g. Deep Learning, Ensemble)
 *   - Sparkline chart thumbnail
 *   - Model short name and full name
 *   - Description paragraph
 *   - Strength row (green) and weakness row (red)
 *   - Best for description
 *   - Complexity indicator (filled dots out of 4)
 *   - Select button that navigates to /models/:name using useNavigate
 *
 * Props:
 *   model   a single model metadata object from data/models.js
 *
 * Development order:
 *   Build this before ModelCarousel. It is the core visual unit of
 *   the models section and has no dependencies other than Sparkline.
 */
