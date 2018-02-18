const CellModel = require('../model/cell');
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

const attack = (x, y) => {
  CellModel.findOne({ x, y }).then((cell) => {
    if (cell.status === cellType.SHIP) {
      cell.status = cellType.SINK;
    } else if (cell.status === cellType.BLANK) {
      cell.status = cellType.SEARCHED;
    }
    return cell.save();
  });
};

module.exports = {
  getBoardInfo,
  attack,
};
