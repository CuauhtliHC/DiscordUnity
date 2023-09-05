const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    // ... otras intenciones que puedas necesitar
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

async function getClient() {
  if (!client.isReady()) {
    await client.login(token);
  }
  return client;
}

async function getGuildChannels(guildId) {
  const client = await getClient();
  try {
    const guild = await client.guilds.fetch(guildId);
    const channels = guild.channels.cache;
    return channels;
  } catch (error) {
    console.error('Error al obtener los canales:', error);
    throw error;
  }
}

module.exports = {
  getClient,
  getGuildChannels,
};
