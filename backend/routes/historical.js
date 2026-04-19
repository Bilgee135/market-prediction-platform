const express = require('express')
const router = express.Router()
const db = require('../db/connection')

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT date, open, high, low, close, volume
             FROM historical_prices
             ORDER BY date ASC`
        )

        const candles = rows.map(row => ({
            date:   row.date.toISOString().split('T')[0],
            open:   parseFloat(row.open),
            high:   parseFloat(row.high),
            low:    parseFloat(row.low),
            close:  parseFloat(row.close),
            volume: parseInt(row.volume),
        }))

        res.json(candles)
    } catch (err) {
        console.error('Historical route error:', err)
        res.status(500).json({ error: 'Failed to fetch historical data' })
    }
})

module.exports = router