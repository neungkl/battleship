const CellModel = require('../model/cell');
const LogModel = require('../model/log');
const cellType = require('./type/cell.type');

const getBoardInfo = () => (
  CellModel.find({}).then(data => (
    data.map(d => ({
      x: d.x,
      y: d.y,
      status: (d.status === cellType.SHIP ? cellType.SHIP : d.status),
    }))
  ))
);

const addLog = (message) => {
  const logObj = new LogModel({
    message,
  });

  return logObj.save();
};

const attack = (x, y) => (
  CellModel.findOne({ x, y }).then((cell) => {
    /* eslint no-param-reassign: "off" */
    let message;
    if (cell.status === cellType.SHIP) {
      message = `Hit (${x}, ${y})`;
      cell.status = cellType.SINK;
    } else if (cell.status === cellType.BLANK) {
      message = `Miss (${x}, ${y})`;
      cell.status = cellType.SEARCHED;
    }
    return Promise.all([cell.save(), addLog(message)]);
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
