const { Coordinates, CoordinatesFurniture } = require('../models/index');

const assingCoordinatesToChannel = async (channels, data, dataType) => {
  for (const [key, value] of Object.entries(data)) {
    const channel = channels.find((channelData) => channelData.id === key);
    value.forEach(async (coordinate) => {
      const coordinateInDb = await checkExistCoordinateInChannel(
        coordinate.X,
        coordinate.Y,
        channel,
        dataType,
      );
      if (!coordinateInDb) {
        const coordinateCreate = await createCoordinate(
          coordinate.X,
          coordinate.Y,
          coordinate.tileName,
          dataType,
        );
        await channel.addCoordinate(coordinateCreate);
      } else {
        await updateCoordinate(
          coordinate.X,
          coordinate.Y,
          coordinate.tileName,
          channel,
          dataType,
        );
      }
    });
  }
};

const checkExistCoordinateInChannel = async (
  coordinateX,
  coordinateY,
  channel,
  dataType,
) => {
  let Model;
  if (dataType === 'Floor') {
    Model = Coordinates;
  } else if (dataType === 'Furniture') {
    Model = CoordinatesFurniture;
  } else {
    throw new Error('Tipo de datos no reconocido');
  }
  const coordinate = await Model.findOne({
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

const createCoordinate = async (
  coordinateX,
  coordinateY,
  tileName,
  dataType,
) => {
  let Model;
  if (dataType === 'Floor') {
    Model = Coordinates;
  } else if (dataType === 'Furniture') {
    Model = CoordinatesFurniture;
  } else {
    throw new Error('Tipo de datos no reconocido');
  }
  const coordinate = await Model.create({
    coordinateX,
    coordinateY,
    tileName,
  });
  return coordinate;
};

const updateCoordinate = async (
  coordinateX,
  coordinateY,
  tileName,
  channel,
  dataType,
) => {
  let Model;
  if (dataType === 'Floor') {
    Model = Coordinates;
  } else if (dataType === 'Furniture') {
    Model = CoordinatesFurniture;
  } else {
    throw new Error('Tipo de datos no reconocido');
  }
  await Model.update(
    { tileName: tileName },
    {
      where: {
        coordinateX: coordinateX,
        coordinateY: coordinateY,
        ChannelId: channel.id,
      },
    },
  );
};

const getAllOfCoordinates = async (channel) => {
  const coordinates = await Coordinates.findAll({
    where: {
      ChannelId: channel.id,
    },
  });
  return coordinates;
};

module.exports = {
  assingCoordinatesToChannel,
  checkExistCoordinateInChannel,
  createCoordinate,
  updateCoordinate,
  getAllOfCoordinates,
};
