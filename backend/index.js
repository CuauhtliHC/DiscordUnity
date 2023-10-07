const { voiceStateUpdate } = require('./discordApi/voiceStateUpdate');
const { login, client } = require('./discordbot/botOn');
const { wsServer, server } = require('./server');
const { closeConnection } = require('./socketEvents/close');
const { messageEvent } = require('./socketEvents/message');

wsServer.on('connection', async (socket) => {
  console.log('New connection');
  socket.on('message', async (message) => {
    await messageEvent(message, socket);
  });

  socket.on('close', closeConnection(socket));
});

wsServer.on('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
  // Puedes tomar medidas adicionales aquí, como cerrar el servidor o registrar el error.
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', voiceStateUpdate);

login();
