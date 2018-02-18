const CellModel = require('../model/cell');
const LogModel = require('../model/log');
const ShipModel = require('../model/ship');

const Ship = require('./ship');
const shipType = require('./type/ship.type');
const dirType = require('./type/direction.type');
const cellType = require('./type/cell.type');

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

const initGameBoard = () => {
  const initCell = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    for (let j = 0; j < BOARD_SIZE; j += 1) {
      const cellObj = new CellModel({
        x: j,
        y: i,
        status: 'blank',
      });
      initCell.push(cellObj.save());
    }
  }
  return Promise.all(initCell);
};

const constructBoard = () => (
  clearGame()
    .then(initGameBoard)
    .then(() => (
      randomBoardPosition(shipConfiguration)
    ))
    .then((ships) => {
      const saveList = [];
      for (let i = 0; i < ships.length; i += 1) {
        const ship = ships[i];
        const shipObj = new ShipModel({
          x: ship.x,
          y: ship.y,
          direction: ship.direction,
          life: ship.length,
          type: ship.type,
        });
        saveList.push(shipObj.save());

        console.log('=========')
        const shipPos = ship.positionList();
        for (let j = 0; j < shipPos.length; j += 1) {
          console.log(shipPos[j].x, shipPos[j].y);
          saveList.push(CellModel.findOneAndUpdate(
            { x: shipPos[j].x, y: shipPos[j].y },
            { ship: shipObj, status: cellType.SHIP },
          ));
        }
      }
      Promise.all(saveList);
    })
);

module.exports = {
  BOARD_SIZE,
  randomBoardPosition,
  constructBoard,
};
