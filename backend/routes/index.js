const express = require('express');
const router = express.Router();

const guilds = require('./guildRouter');

router.use('/guilds', guilds);

module.exports = router;
