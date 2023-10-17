const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config();

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

app.listen(3001, () => console.log('Servidor escuchando en el puerto 3001'));

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.listen(8080);

module.exports = { server, io };
