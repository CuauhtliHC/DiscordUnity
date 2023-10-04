const { Client, GatewayIntentBits } = require('discord.js');
const WebSocket = require('ws');
const http = require('http');
const dotenv = require('dotenv');
const { closeConnection } = require('../socketEvents/close');
const { session } = require('../session/session');
const { messageEvent } = require('../socketEvents/message');

dotenv.config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const server = http.createServer((request, response) => {});

server.listen(8080, () => {
  console.log('Servidor WebSocket está escuchando en el puerto 8080');
});

const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', async (socket) => {
  socket.on('message', async (message) => {
    await messageEvent(message, socket, getGuildChannels);
  });

  socket.on('close', closeConnection(socket));
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const getGuildChannels = async (guildId) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    const channels = guild.channels.cache;
    return channels;
  } catch (error) {
    console.error('Error al obtener los canales:', error);
    throw error;
  }
};

client.on('voiceStateUpdate', (oldState, newState) => {
  const guild = newState.guild;
  const member = newState.member;

  if (newState.channel && !oldState.channel) {
    for (const userId in session) {
      if (session[userId].guildID === guild.id) {
        console.log(
          `${member.user.tag} se unió al canal de voz ${newState.channel.name}`,
        );
        const userSocket = session[userId].socket;
        userSocket.send(
          JSON.stringify({
            userName: member.user.tag,
            userId: member.user.id,
            channelName: newState.channel.name,
            channelId: newState.channel.id,
            type: 'userJoinChannel',
          }),
        );
      }
    }
  }

  if (oldState.channel && !newState.channel) {
    for (const userId in session) {
      if (session[userId].guildID === guild.id) {
        console.log(
          `${member.user.tag} se desconectó del canal de voz ${oldState.channel.name}`,
        );
        const userSocket = session[userId].socket;
        userSocket.send(
          JSON.stringify({
            userName: member.user.tag,
            userId: member.user.id,
            channelName: oldState.channel.name,
            channelId: oldState.channel.id,
            type: 'userLeftChannel',
          }),
        );
      }
    }
  }
  if (
    oldState.channel &&
    newState.channel &&
    oldState.channel.id !== newState.channel.id
  ) {
    console.log(
      `${member.user.tag} cambió del canal de voz ${oldState.channel.name} al canal ${newState.channel.name}`,
    );
    const userSocket = session[member.user.id]?.socket;
    if (userSocket) {
      userSocket.send(
        JSON.stringify({
          userName: member.user.tag,
          userId: member.user.id,
          channelName: newState.channel.name,
          channelId: newState.channel.id,
          type: 'userSwitchedChannel',
        }),
      );
    }
  }
});

client.login(token);
