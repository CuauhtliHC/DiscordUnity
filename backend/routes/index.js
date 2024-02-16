const express = require('express');
const router = express.Router();

const guilds = require('./guildRouter');
const users = require('./userRouter');

router.use('/guilds', guilds);
router.use('/user', users);

module.exports = router;
