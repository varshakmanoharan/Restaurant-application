const express = require('express')
const { testController } = require('../controllers/testController')

const router = express.Router()

//router
router.get('/test-user',testController)

module.exports =  router