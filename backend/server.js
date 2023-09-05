const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const router = require('./routes');

dotenv.config();
const token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

app.use(express.json());
app.use('/api', router);

app.use('/api', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3001, () => console.log('Servidor escuchando en el puerto 3001'));
