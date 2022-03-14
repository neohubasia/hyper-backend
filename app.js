const createError = require("http-errors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("morgan");

// cookie session
const cookieSession = require("cookie-session");
const cookieConfig = cookieSession({
  name: "session",
  keys: ["8y93rb@ck3nd"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

const _jwt = require("./middlewares/jwt-check");
const { tokenRouter } = require("./middlewares/jwt-generate");

const authRouter = require("./drivers/web/routes/auth");
const apiRouter = require("./drivers/web/routes/api");
const customerRouter = require("./drivers/web/routes/c_api");
const webpushRouter = require("./drivers/web/routes/wp_api");
const fileRouter = require("./drivers/web/routes/files");
const uploadImage = require("./drivers/web/routes/files/froala/upload-image.js");
const uploadVideo = require("./drivers/web/routes/files/froala/upload-video.js");
const uploadFile = require("./drivers/web/routes/files/froala/upload-file.js");
const UserModel = require("./database/mongodb/models/user");

const app = express();
var routeModules = [];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));

// for forala image
app.post("/image_upload", function (req, res) {
  uploadImage(req, function (err, data) {
    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    res.send(data);
  });
});

const imageDir = path.join("public", "uploads", "froalaimage");
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// for forala video
app.post("/video_upload", function (req, res) {
  uploadVideo(req, function (err, data) {
    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    res.send(data);
  });
});

const videoDir = path.join("public", "uploads", "froalavideo");
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir);
}

// for froala file
app.post("/file_upload", function (req, res) {
  uploadFile(req, function (err, data) {
    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    res.send(data);
  });
});

var fileDir = path.join("public", "uploads", "froalafile");
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir);
}

app.use(cookieParser());
app.use(cookieConfig);

app.use(passport.initialize());
app.use(passport.session());

// Locals data middleware
app.use(function (req, res, next) {
  if (req.user) res.locals.user = req.user;

  next();
});

app.use(express.static(path.join(__dirname, "public")));

fs.readdirSync(__dirname + "/drivers/web/routes/pages").forEach(function (
  name
) {
  var obj = require(path.join(__dirname, "/drivers/web/routes/pages/" + name));
  routeModules.push(obj);
});

// connect to routing files
app.use(routeModules);
app.use(authRouter);

// connect to api routes
app.use("/api", _jwt.checkToken, apiRouter);
app.use("/c-api", _jwt.checkToken, customerRouter);
app.use("/wp-api", webpushRouter);

// connet to file routes
app.use("/file", fileRouter);

// connect to jwt routes
app.use("/d-mar", tokenRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

/* passport local authentication */
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// error handler
app.use(function (err, req, res, next) {
  console.log("Error found ", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile("./views/404/index.html", { root: __dirname });
});

module.exports = app;
