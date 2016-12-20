const mongoose = require('mongoose');
const {Schema} = mongoose;

const hotelSchema = new Schema({
  name: String,
  type: String,
  city: String,
  rooms: [{type: Schema.Types.ObjectId, ref: 'Room'}]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = {Hotel};