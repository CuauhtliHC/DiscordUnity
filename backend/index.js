const { voiceStateUpdateIo } = require('./discordApi/voiceStateUpdate');
const { login, client } = require('./discordbot/botOn');
const { handleIoConnection } = require('./ioEvents/connection');
const { server } = require('./server');
const { io } = require('./serverIO');

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
