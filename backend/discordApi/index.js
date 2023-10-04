const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const getClient = async () => {
  if (!client.isReady()) {
    await client.login(token);
  }
  return client;
};

const getGuildChannels = async (guildId) => {
  const client = await getClient();
  try {
    const guild = await client.guilds.fetch(guildId);
    const channels = guild.channels.cache;
    return channels;
  } catch (error) {
    console.error('Error al obtener los canales:', error);
    throw error;
  }
};

module.exports = {
  getClient,
  getGuildChannels,
};
