// backend/routes/historical.js
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const weeks = parseInt(req.query.weeks) || 26;
    const scriptPath = path.join(__dirname, '../../data-pipeline/fetch/historical.py');
    const pythonPath = process.env.PYTHON_PATH || path.join(__dirname, '../../data-pipeline/venv/bin/python3');

    const py = spawn(pythonPath, [scriptPath, String(weeks)]);

    let output = '';
    let errorOutput = '';

    py.stdout.on('data', (chunk) => { output += chunk.toString(); });
    py.stderr.on('data', (chunk) => { errorOutput += chunk.toString(); });

    py.on('close', (code) => {
        if (code !== 0) {
        console.error('historical.py error:', errorOutput);
        return res.status(500).json({ error: 'Failed to fetch historical data' });
        }
        try {
        const candles = JSON.parse(output);
        res.json(candles);
        } catch {
        res.status(500).json({ error: 'Invalid data from Python script' });
        }
    });
});

module.exports = router;