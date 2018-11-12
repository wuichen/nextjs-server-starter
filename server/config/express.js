const constants = require('./constants')
const { logs, shopify_secret, redis_uri } = constants
const express = require('express')
const compression = require('compression')
const path = require('path')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const client = require('redis').createClient(redis_uri);
const routes = require('../api/routes/v1');
const error = require('../api/middlewares/error');


// const cors = require('cors');
// const helmet = require('helmet')
const server = express()

// request logging. dev: console | production: file
// server.use(morgan(logs));

// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(
	session({
	  secret: shopify_secret,
	  store: new RedisStore({client}),
	  resave: true,
	  saveUninitialized: false,
	})
);
// gzip compression
server.use(compression());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
server.use(methodOverride());

// all api routes
server.use(routes);


// secure apps by setting various HTTP headers
// app.use(helmet());

// // enable CORS - Cross Origin Resource Sharing
// app.use(cors());

const staticPath = path.join(__dirname, '../../static')

server.use('/static', express.static(staticPath, {
	maxAge: '30d',
	immutable: true
}))

// if error is not an instanceOf APIError, convert it.
server.use(error.converter);

// catch 404 and forward to error handler
// server.use(error.notFound);

// error handler, send stacktrace only during development
server.use(error.handler);


module.exports = server