const http = require('http');
const { config } = require('dotenv');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./config/db');
const { Channels, Coordinates, Guilds } = require('./models');

config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());

const router = require('./routes');
app.use('/api', router);

app.use('/api', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

const server = http.createServer(app);
app.listen(3001, async () => {
  console.log('Server running on port 3001');
  try {
    await db.sync({ force: true });
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.listen(8080);

module.exports = { server, io };
