const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
});

const _jwt = require('./middlewares/jwt');
const { tokenRouter } = require('./middlewares/generator');

const authRouter = require('./drivers/webserver/routes/auth');
const apiRouter = require('./drivers/webserver/routes/api');
const customerRoute=require('./drivers/webserver/routes/customer_api')
const fileRouter = require('./drivers/webserver/routes/files');

const UserDetails = require('./database/mongodb/models/user');

const app = express();
var routeModules = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
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
app.use('/api', _jwt.checkToken, apiRouter);

app.use('/c_api',customerRoute)

// connet to file routes
app.use('/file', _jwt.checkToken, fileRouter)

// connect to jwt routes
app.use('/d-mar', tokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* passport local authentication */
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

// error handler
app.use(function (err, req, res, next) {
  console.log("Error found ", err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 
  // res.json({
  //   "status": "ERR",
  //   "message": err
  // })
  res.sendFile('./views/404/index.html', { root: __dirname })
});

module.exports = app;