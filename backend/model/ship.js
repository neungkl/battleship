const mongoose = require('mongoose');
const shipType = require('../game/type/ship.type');
const directionType = require('../game/type/direction.type');

const { Schema } = mongoose;

const shipSchema = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  direction: {
    type: String,
    enum: [directionType.DOWN, directionType.RIGHT],
    required: true,
  },
  life: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [shipType.BATTLESHIP, shipType.CRUISER, shipType.DESTROYER, shipType.SUBMARINE],
    required: true,
  },
});

module.exports = mongoose.model('Ship', shipSchema);
