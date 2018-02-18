const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipSchema = new Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  direction: {
    type: String,
    enum: ['right', 'down'],
    required: true
  },
  type: {
    type: String,
    enum: ['battleship', 'cruiser', 'destroyer', 'submarine'],
    required: true
  }
});

export default mongoose.model('Ship', shipSchema);