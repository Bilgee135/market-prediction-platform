/*
 * services/api.js
 *
 * What this is:
 *   The single point of contact between the frontend and the backend API.
 *   All fetch() calls in the entire application live here and nowhere else.
 *   No page or component should ever call fetch() directly.
 *
 * Where it is used:
 *   Imported by page components (HomePage, ModelForecastPage, EvaluationsPage)
 *   inside their useEffect hooks when they need data.
 *
 * What it should contain:
 *   - A base URL constant read from import.meta.env.VITE_API_URL
 *   - One exported async function per API endpoint:
 *
 *     getHealth()                -> GET /api/health
 *     getHistorical(weeks)       -> GET /api/historical?weeks=26
 *     getPredictions(modelName)  -> GET /api/predictions/:modelName
 *     getModels()                -> GET /api/models
 *
 *   - Every function should handle errors and return a consistent shape
 *
 * Development order:
 *   Build this as soon as the backend endpoints exist. Until then, return
 *   hardcoded mock data from each function so pages can be built and tested
 *   without a live backend connection.
 */