/*
 * components/models/ModelCarousel.jsx
 *
 * What this is:
 *   The carousel wrapper on ModelsPage. Manages which model card is
 *   currently visible and handles navigation between them.
 *
 * Where it is used:
 *   ModelsPage.jsx, inside the right column after the disclaimer is confirmed.
 *
 * What it should contain:
 *   - State for the active card index (0 to 5)
 *   - Left and right arrow buttons to move between cards
 *   - Dot indicators at the bottom showing current position
 *   - Keyboard arrow key navigation (left/right)
 *   - Renders ModelCard for the currently active model
 *
 * Props:
 *   models   array of model metadata objects from data/models.js
 *
 * Development order:
 *   Build after ModelCard exists. The carousel is just a navigation shell
 *   around the card — get the card right first, then wrap it here.
 */