const express = require('express')
const { createRoom } = require('../controllers/room')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()

router.route('/create').post( authMiddleware,createRoom)

module.exports = router
