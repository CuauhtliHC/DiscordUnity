const Channels = require('./Channels');
const Coordinates = require('./Coordinates');
const CoordinatesFurniture = require('./CoordinatesFurniture');
const Guilds = require('./Guilds');

Channels.belongsTo(Guilds);
Guilds.hasMany(Channels);

Coordinates.belongsTo(Channels);
Channels.hasMany(Coordinates);

CoordinatesFurniture.belongsTo(Channels);
Channels.hasMany(CoordinatesFurniture);

module.exports = {
  Channels,
  Coordinates,
  CoordinatesFurniture,
  Guilds,
};
