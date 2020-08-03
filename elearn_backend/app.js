const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

const _jwt = require('./middlewares/jwt');

const authRouter = require('./drivers/webserver/routes/auth');
const apiRouter = require('./drivers/webserver/routes/api');
const jwtRouter = require('./middlewares/generator');

const app = express();
var routeModules = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync(__dirname + '/drivers/webserver/routes/pages').forEach(function(name){
  var obj = require(path.join(__dirname, '/drivers/webserver/routes/pages/' + name));
  routeModules.push(obj);
});

// connect to routing files
app.use(routeModules);
app.use(authRouter);

// connect to api routes
app.use('/api', _jwt.checkToken ,apiRouter);

// connect to jwt routes
app.use('/dmhar', jwtRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// UserDetails.register({username:'paul', active: false}, 'paul');

/* passport local authentication */
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;