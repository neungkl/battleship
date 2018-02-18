const CellModel = require('../model/cell');
const LogModel = require('../model/log');
const ShipModel = require('../model/ship');

const Ship = require('./ship');
const shipType = require('./ship.type');
const dirType = require('./direction.type');

const BOARD_SIZE = 10;
const shipConfiguration = [
  [shipType.BATTLESHIP, 1],
  [shipType.CRUISER, 2],
  [shipType.DESTROYER, 3],
  [shipType.SUBMARINE, 4],
];

const clearGame = () => (
  Promise.all([
    CellModel.remove({}),
    LogModel.remove({}),
    ShipModel.remove({}),
  ])
);

const randomCorrectShip = (shipPool, newShipType) => {
  for (;;) {
    const x = parseInt(Math.random() * BOARD_SIZE, 10);
    const y = parseInt(Math.random() * BOARD_SIZE, 10);
    const dir = dirType.randomDirection();

    const ship = new Ship(x, y, dir, newShipType);

    if (ship.isInBoardArea(BOARD_SIZE)) {
      let j;
      for (j = 0; j < shipPool.length; j += 1) {
        if (ship.collideWith(shipPool[j])) break;
      }

      if (j === shipPool.length) {
        return ship;
      }
    }
  }
};

const randomBoardPosition = (shipConfig) => {
  const shipPool = [];

  for (let cfgId = 0; cfgId < shipConfig.length; cfgId += 1) {
    const cfg = shipConfig[cfgId];
    for (let i = 0; i < cfg[1]; i += 1) {
      const ship = randomCorrectShip(shipPool, cfg[0]);
      shipPool.push(ship);
    }
  }

  return shipPool;
};

const constructBoard = () => (
  clearGame().then(() => (
    randomBoardPosition(shipConfiguration)
  )).then((ships) => {
    const saveList = [];
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      const shipObj = new ShipModel({
        x: ship.x,
        y: ship.y,
        direction: ship.direction,
        type: ship.type,
      });
      saveList.push(shipObj.save());
    }
    return Promise.all(saveList);
  })
);

module.exports = {
  BOARD_SIZE,
  randomBoardPosition,
  constructBoard,
};
