const CellModel = require('../model/cell');
const LogModel = require('../model/log');
const ShipModel = require('../model/ship');
const cellType = require('./type/cell.type');

const getBoardInfo = () => (
  CellModel.find({}).then(data => (
    data.map(d => ({
      x: d.x,
      y: d.y,
      status: (d.status === cellType.SHIP ? cellType.BLANK : d.status),
    }))
  ))
);

const addLog = (message) => {
  const logObj = new LogModel({
    message,
  });

  return logObj.save();
};

const winnerLog = () => {
  LogModel.find({}).then((data) => {
    const move = data.filter(x => /^(Miss|Hit)/.test(x.message)).length;
    return addLog(`Win! You completed the game in ${move} moves`);
  });
};

const checkWinnerCondition = cell => (
  ShipModel.find({}).then((data) => {
    const promiseList = [];
    let totalLife = 0;
    const shipId = cell.ship;

    for (let i = 0; i < data.length; i += 1) {
      /* eslint no-underscore-dangle: "off" */
      const ship = data[i];
      if (ship._id.equals(shipId)) {
        ship.life -= 1;
        totalLife += ship.life;

        promiseList.push(ship.save());
        if (ship.life === 0) {
          promiseList.push(addLog(`You just sank the "${ship.type}"`));
        }
      } else {
        totalLife += ship.life;
      }
    }

    if (totalLife === 0) {
      promiseList.push(winnerLog());
    }

    return Promise.all(promiseList);
  })
);

const attack = (x, y) => (
  CellModel.findOne({ x, y }).then((cell) => {
    /* eslint no-param-reassign: "off" */
    if (cell.status === cellType.SHIP) {
      cell.status = cellType.SINK;

      return Promise.all([
        cell.save(),
        addLog(`Hit (${x}, ${y})`),
      ]).then(data => (
        Promise.all([data[0], checkWinnerCondition(cell)])
      ));
    } else if (cell.status === cellType.BLANK) {
      cell.status = cellType.SEARCHED;

      return Promise.all([
        cell.save(),
        addLog(`Miss (${x}, ${y})`),
      ]);
    }

    return Promise.resolve(false);
  }).then(data => data[0].status)
);

const getLog = () => (
  LogModel
    .find()
    .sort('-date')
    .then(data => (
      data.map(x => ({
        message: x.message,
      }))
    ))
);

module.exports = {
  getBoardInfo,
  attack,
  getLog,
};
