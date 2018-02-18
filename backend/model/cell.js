const mongoose = require('mongoose');
const cellType = require('../game/type/cell.type');

const { Schema } = mongoose;

const cellSchema = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [cellType.BLANK, cellType.SHIP, cellType.SINK, cellType.SEARCHED],
    required: true,
  },
});

module.exports = mongoose.model('Cell', cellSchema);
