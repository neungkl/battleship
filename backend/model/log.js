const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  message: {
    type: String,
    required: true
  }
});

export default mongoose.model('Log', logSchema);