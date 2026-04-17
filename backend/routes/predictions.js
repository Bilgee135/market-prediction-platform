const express = require('express')
const router = express.Router()
const predictionsController = require('../controllers/predictionsController')

router.get('/models', predictionsController.getModels)
router.get('/:model', predictionsController.getByModel)

module.exports = router