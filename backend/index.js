const {
  voiceStateUpdate,
  voiceStateUpdateIo,
} = require('./discordApi/voiceStateUpdate');
const { login, client } = require('./discordbot/botOn');
const { handleIoConnection } = require('./ioEvents/connection');
const { wsServer, server, io } = require('./server');
const { handleSocketConnection } = require('./socketEvents/connection');

wsServer.on('connection', handleSocketConnection);

wsServer.on('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', voiceStateUpdateIo);

io.on('connection', handleIoConnection);

io.engine.on('connection_error', (err) => {
  console.log(err.req);
  console.log(err.code);
  console.log(err.message);
  console.log(err.context);
});

login();
