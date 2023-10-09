const express = require('express');
const { handleBotCheckRequest } = require('../controllers/guildController');

const router = express.Router();

router.get('/checkBotThere/:id', handleBotCheckRequest);

module.exports = router;
