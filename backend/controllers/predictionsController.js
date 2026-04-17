const db = require('../db/connection')

// Maps frontend URL slugs to database model_name values
const MODEL_SLUG_MAP = {
    'ann':          'ANN',
    'cnn-lstm':     'CNN-LSTM',
    'cnn-lstm-det': 'CNN-LSTM-DET',
    'dtr':          'DTR',
    'gru':          'GRU',
    'gru-all':      'GRU-ALL',
    'knn':          'KNN',
    'knn-pm':       'KNN-PM',
    'knn-pm-prices':'KNN-PM-PRICES',
}

// GET /api/predictions/:model
// Returns all prediction rows for the requested model, ordered by date
async function getByModel(req, res) {
    const slug = req.params.model.toLowerCase()
    const modelName = MODEL_SLUG_MAP[slug]

    if (!modelName) {
        return res.status(404).json({ error: `Unknown model: ${slug}` })
    }

    try {
        const [rows] = await db.query(
            `SELECT prediction_date, predicted_close
             FROM predictions
             WHERE model_name = ?
             ORDER BY prediction_date ASC`,
            [modelName]
        )

        if (rows.length === 0) {
            return res.status(404).json({ error: `No predictions found for model: ${modelName}` })
        }

        res.json(rows)
    } catch (err) {
        console.error('predictionsController.getByModel error:', err)
        res.status(500).json({ error: 'Database error' })
    }
}

// GET /api/models
// Returns the distinct list of model names available in the database
async function getModels(req, res) {
    try {
        const [rows] = await db.query(
            `SELECT DISTINCT model_name FROM predictions ORDER BY model_name ASC`
        )
        res.json(rows)
    } catch (err) {
        console.error('predictionsController.getModels error:', err)
        res.status(500).json({ error: 'Database error' })
    }
}

module.exports = { getByModel, getModels }