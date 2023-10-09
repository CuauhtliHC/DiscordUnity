const { Client, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const login = () => client.login(process.env.DISCORD_TOKEN);

module.exports = {
  client,
  login,
};
