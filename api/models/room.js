const mongoose = require('mongoose');
const {Schema} = mongoose;

const roomSchema = new Schema({
  name: String,
  description: String,
  _hotel: {type: Schema.Types.ObjectId, ref: 'Hotel'}
});

const Room = mongoose.model('Room', roomSchema);

module.exports = {Room};