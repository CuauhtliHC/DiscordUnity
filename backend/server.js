const WebSocket = require('ws');
const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');

dotenv.config();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use('/api', router);

app.use('/api', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3001, () => console.log('Servidor escuchando en el puerto 3001'));

const server = http.createServer((request, response) => {});

server.listen(8080, () => {
  console.log('Servidor WebSocket está escuchando en el puerto 8080');
});

const wsServer = new WebSocket.Server({ server });

module.exports = { server, wsServer };
