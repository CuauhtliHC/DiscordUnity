const WebSocket = require('ws');
const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

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
const wsServer = new WebSocket.Server({ server });

app.listen(3001, () => console.log('Servidor escuchando en el puerto 3001'));
server.listen(8080, () => {
  console.log('Servidor WebSocket está escuchando en el puerto 8080');
});

module.exports = { server, wsServer };
