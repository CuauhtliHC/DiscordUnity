const express = require('express');
const { checkBotThere } = require('../discordApi');
const router = express.Router();

router.get('/checkBotThere/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await checkBotThere(id);

    res.json({ botInGuild: response });
  } catch (error) {
    console.error('Error al obtener los canales:', error);
    res.status(500).json({ error: 'Error al obtener los canales' });
  }
});

module.exports = router;
