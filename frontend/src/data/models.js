/*
 * data/models.js
 *
 * What this is:
 *   Static metadata about each ML model. This is not API data. It is
 *   UI-level information that never changes at runtime and does not
 *   come from the database.
 *
 * Where it is used:
 *   - ModelCard.jsx to render each card in the carousel
 *   - MiniModelCard.jsx on the evaluations page
 *   - ModelForecastPage.jsx to look up model display info by URL param
 *
 * What it should contain:
 *   An exported array of objects, one per model, each with:
 *     name          short identifier used in URLs  e.g. "lstm"
 *     displayName   full readable name             e.g. "LSTM"
 *     fullName      expanded name                  e.g. "Long Short-Term Memory"
 *     type          category badge                 e.g. "Deep Learning"
 *     description   one or two sentence summary
 *     strength      what the model does well
 *     weakness      where the model falls short
 *     bestFor       ideal use case description
 *     complexity    number from 1 to 4
 *     color         accent hex color for this model
 *
 * Development order:
 *   Fill this in early. ModelCard and ModelCarousel depend on it directly.
 *   Prediction metrics (MAE, RMSE, directional accuracy) do NOT go here.
 *   Those come from the API via api.js because they will be real computed values.
 */