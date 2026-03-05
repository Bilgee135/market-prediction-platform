require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', team: 'Team 45'})
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})



