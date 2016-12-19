const mongoose = require('mongoose');
const MONGO_PORT = 32768;
mongoose.Promise = global.Promise;

module.exports = connect;

function connect ({host, port, db}) {
  mongoose.connect(`mongodb://${host}:${port}/${db}`);
}