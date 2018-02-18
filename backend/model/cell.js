const mongoose = require('mongoose');

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
    enum: ['blank', 'sink', 'searched'],
    required: true,
  },
});

module.exports = mongoose.model('Cell', cellSchema);
