const Channels = require('./Channels');
const Coordinates = require('./Coordinates');
const Guilds = require('./Guilds');

Channels.belongsTo(Guilds);
Guilds.hasMany(Channels);

Coordinates.belongsTo(Channels);
Channels.hasMany(Coordinates);

module.exports = {
  Channels,
  Coordinates,
  Guilds,
};
