const Channels = require('./Channels');
const Coordinates = require('./Coordinates');
const CoordinatesFurniture = require('./CoordinatesFurniture');
const Guilds = require('./Guilds');
const User = require('./User');
const Body = require('./Body');
const Clothes = require('./Clothes');

Channels.belongsTo(Guilds);
Guilds.hasMany(Channels);

Coordinates.belongsTo(Channels);
Channels.hasMany(Coordinates);

CoordinatesFurniture.belongsTo(Channels);
Channels.hasMany(CoordinatesFurniture);

User.belongsTo(Body);
Body.hasMany(User);

User.belongsTo(Clothes);
Clothes.hasMany(User);

module.exports = {
  Channels,
  Coordinates,
  CoordinatesFurniture,
  Guilds,
  User,
  Body,
  Clothes,
};
