require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const tickerRouter = require('./routes/ticker')
const historicalRoutes = require('./routes/historical');
const predictionsRouter = require('./routes/predictions')

// CORS configuration to allow requests from the frontend development server
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://student.csc.liv.ac.uk'
    ],
    methods: ['GET'],
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', team: 'Team 45'})
})

app.use('/api', tickerRouter) // Full path will be /api/ticker 

app.use('/api/historical', historicalRoutes); // Full path will be /api/historical?weeks=26 (weeks is optional, defaults to 26)

app.use('/api/predictions', predictionsRouter)

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})

