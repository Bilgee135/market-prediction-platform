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

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getHistorical(weeks = 26) {
    const res = await fetch(`${BASE_URL}/api/historical?weeks=${weeks}`);
    if (!res.ok) throw new Error(`Historical fetch failed: ${res.status}`);
    return res.json(); // returns array of { date, open, high, low, close, volume }
}

export async function getTickers() {
    const res = await fetch(`${BASE_URL}/api/ticker`);
    if (!res.ok) throw new Error(`Ticker fetch failed: ${res.status}`);
    return res.json();
}

// Stubs for when the ML team delivers their endpoints
export async function getPredictions(modelName) {
    const res = await fetch(`${BASE_URL}/api/predictions/${modelName}`);
    if (!res.ok) throw new Error(`Predictions fetch failed: ${res.status}`);
    return res.json();
}

export async function getModels() {
    const res = await fetch(`${BASE_URL}/api/models`);
    if (!res.ok) throw new Error(`Models fetch failed: ${res.status}`);
    return res.json();
}