'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const cors = require('cors');
const connectMongo = require('./mongo');
const jwt = require('express-jwt');

module.exports = app; // for testing

const {PORT, MONGO_HOST, MONGO_PORT, MONGO_DB} = process.env;
const config = {
  appRoot: __dirname // required config
};

connectMongo({
  host : MONGO_HOST || '0.0.0.0',
  port : MONGO_PORT || 32768,
  db   : MONGO_DB   || 'hotels'
});

app.use(jwt({secret: 'ski123'}).
  unless({path:[
    {url: '/hotels', methods:['GET', 'OPTIONS']},
    {url: /^\/hotels\/.*/, methods:['GET', 'OPTIONS']}
  ]}));

app.use((err, req, res, next) => {
  err && err.name === 'UnauthorizedError' &&
    res.status(401).send('invalid token...');
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  app.use(cors());

  app.listen(PORT || 10010);
});