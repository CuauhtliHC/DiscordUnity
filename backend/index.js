const { voiceStateUpdate } = require('./discordApi/voiceStateUpdate');
const { login, client } = require('./discordbot/botOn');
const { wsServer, server } = require('./server');
const { closeConnection } = require('./socketEvents/close');
const { messageEvent } = require('./socketEvents/message');

wsServer.on('connection', async (socket) => {
  socket.on('message', async (message) => {
    await messageEvent(message, socket);
  });

  socket.on('close', closeConnection(socket));
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', voiceStateUpdate);

login();
