const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cellSchema = new Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['blank', 'sink', 'searched'],
    required: true
  }
});

export default mongoose.model('Cell', cellSchema);