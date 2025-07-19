const playerController = require('../Controllers/playerController')

// 1 import express
const express = require('express');

const router = new express.Router

router.post('/addplayer',playerController.addPlayer)

// 4 export router
module.exports = router;