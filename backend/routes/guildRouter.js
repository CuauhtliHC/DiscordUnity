const express = require('express');
const { getGuildChannels } = require('../discordApi');
const router = express.Router();

router.get('/channels/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const channels = await getGuildChannels(id);

    const channelsVoice = channels.filter((channel) => channel.type === 2);

    res.json({ channels: channelsVoice });
  } catch (error) {
    console.error('Error al obtener los canales:', error);
    res.status(500).json({ error: 'Error al obtener los canales' });
  }
});

module.exports = router;
