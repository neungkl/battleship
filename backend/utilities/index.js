const cellModel = require('../model/cell');
const logModel = require('../model/log');
const shipModel = require('../model/ship');

const resetGame = () => (
  Promise.all(
    cellModel.remove({}),
    logModel.remove({}),
    shipModel.remove({}),
  )
);
