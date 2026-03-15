require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const tickerRouter = require('./routes/ticker')

// CORS configuration to allow requests from the frontend development server
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET'],
}));

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', team: 'Team 45'})
})

app.use('/api', tickerRouter) // Full path will be /api/ticker 

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})



