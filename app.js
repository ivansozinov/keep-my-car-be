var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const carsRouter = require('./routes/cars');
const loginRouter = require('./routes/login');

const mongoose = require('./utils/mongoose');
const redis = require('./utils/redis');

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// non-auth routes
app.use('/login', loginRouter);

const { isAuthorized } = require('./utils/auth');
// auth routes
app.use('/', isAuthorized, indexRouter);
app.use('/user', isAuthorized, userRouter);
app.use('/cars', isAuthorized, carsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('err', err);
  // set locals, only providing error in development
  //res.setHeader('Content-Type', 'application/json');
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status ? err.status : 500).send({error: err.message});
});

module.exports = app;
