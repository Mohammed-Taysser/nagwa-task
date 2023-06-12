const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
require('dotenv').config();

const routes = require('./routes');

const { PORT = 8080 } = process.env;

// Express instance
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.enable('verbose errors');
  app.use(morgan('dev'));
}

// ------------
// Middleware |
// ------------

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// parse body params and attache them to req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
// parse application/json
app.use(bodyParser.json({ limit: '30mb' }));

// Make sure the body is parsed beforehand.
app.use(hpp());

// mount api routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`🚀 API Server listening on port:${PORT}`);

  if (process.env.NODE_ENV !== 'production') {
    console.info(`http://localhost:${PORT}/api`);
  }
});

module.exports = app; // for testing
