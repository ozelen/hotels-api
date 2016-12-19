const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel', {
  name: String,
  type: String,
  city: String
});

module.exports = {Hotel};