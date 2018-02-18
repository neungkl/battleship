const dir = {
  DOWN: 'down',
  RIGHT: 'right',
};

const randomDirection = () => {
  const values = Object.values(dir);
  return values[Math.floor(Math.random() * values.length)];
};

module.exports = {
  ...dir,
  randomDirection,
};
