const { spawn } = require('child_process');
const express = require('express');
const router = express.Router();
const path = require('path');

// This route runs the ticker.py script and returns its output as JSON.
// The absolute paths to the script and Python executable are defined at the top for clarity.
// path.join is used to ensure cross-platform compatibility when constructing file paths.

const SCRIPT_PATH = path.join(__dirname, '../../data-pipeline/fetch/ticker.py');
const VENV_PATH = path.join(__dirname, '../../data-pipeline/venv/bin/python'); // Adjust if your virtual environment structure is different

router.get('/ticker', (req, res) => {
    const pythonProcess = spawn(VENV_PATH, [SCRIPT_PATH]);

    let output = '';
    let errorOutput = '';

    // Accumulate data from stdout
    pythonProcess.stdout.on('data', (chunck) => {
        output += chunck.toString();
    });

    // Accumulate data from stderr
    pythonProcess.stderr.on('data', (chunck) => {
        errorOutput += chunck.toString();
    });

    // Fires when the script finishes execution, regardless of success or failure
    pythonProcess.on('close', (exitCode) => {

        if (errorOutput) {
            // Log warning from the script
            // Won't fail the whole request
            console.warn('Ticker script warning:', errorOutput);
        }

        if (exitCode !== 0) {
            // Something went wrong with the script execution
            return res.status(500).json({error: "Failed to fetch ticker data"});
        }

        try {
            const data = JSON.parse(output);
            res.json(data);
        } catch (parseError) {
            // The script ran but didn't return valid JSON
            console.error('Failed to parse ticker script output:', output);
            res.status(500).json({error: 'Invalid data from ticker script'});
        }
    });
});

module.exports = router;