const { voiceStateUpdate } = require('./discordApi/voiceStateUpdate');
const { login, client } = require('./discordbot/botOn');
const { wsServer, server } = require('./server');
const { handleSocketConnection } = require('./socketEvents/connection');

wsServer.on('connection', handleSocketConnection);

wsServer.on('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', voiceStateUpdate);

login();
