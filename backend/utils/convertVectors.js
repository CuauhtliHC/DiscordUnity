const stringToVecto2 = (string) => {
  const [x, y] = string.replace('(', '').replace(')', '').split(',');
  const targetPositionX = parseFloat(x);
  const targetPositionY = parseFloat(y);
  return { targetPositionX, targetPositionY };
};

module.exports = { stringToVecto2 };
