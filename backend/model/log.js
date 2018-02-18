const mongoose = require('mongoose');

const { Schema } = mongoose;

const logSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Log', logSchema);
