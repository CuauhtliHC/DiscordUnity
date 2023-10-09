const { checkBotThere } = require('../discordApi');

const handleBotCheckRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await checkBotThere(id);

    res.json({ botInGuild: response });
  } catch (error) {
    console.error('Error while check bot there in guild:', error);
    res.status(500).json({ error: 'Error while check bot there in guild' });
  }
};

module.exports = { handleBotCheckRequest };
