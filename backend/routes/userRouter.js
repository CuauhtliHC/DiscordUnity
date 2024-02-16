const express = require('express');
const { checkDataUser } = require('../controllers/userController');

const router = express.Router();

router.get('/data');
router.post('/update', checkDataUser);

module.exports = router;
