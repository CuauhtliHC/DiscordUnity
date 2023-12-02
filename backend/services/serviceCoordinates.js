const { Coordinates } = require('../models/index');

const assingCoordinatesToChannel = async (channels, data) => {
  for (const [key, value] of Object.entries(data)) {
    const channel = channels.find((channelData) => channelData.id === key);
    value.forEach(async (coordinate) => {
      const coordinateInDb = await checkExistCoordinateInChannel(
        coordinate.X,
        coordinate.Y,
        channel,
      );
      if (!coordinateInDb) {
        const coordinateCreate = await createCoordinate(
          coordinate.X,
          coordinate.Y,
          coordinate.tileName,
        );
        await channel.addCoordinate(coordinateCreate);
      }
    });
  }
};

const checkExistCoordinateInChannel = async (
  coordinateX,
  coordinateY,
  channel,
) => {
  const coordinate = await Coordinates.findOne({
    where: {
      coordinateX,
      coordinateY,
      ChannelId: channel.id,
    },
  });
  if (!coordinate) {
    return false;
  }
  return coordinate;
};

const createCoordinate = async (coordinateX, coordinateY, tileName) => {
  const coordinate = await Coordinates.create({
    coordinateX,
    coordinateY,
    tileName,
  });
  return coordinate;
};

module.exports = { assingCoordinatesToChannel };
