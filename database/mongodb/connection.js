let clr = require("../../librarys/console-color");
let config = require("../../config");
let mongoose = require("mongoose");

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Set environment variables
const env = config.NODE_ENV;
const host = config.mongo.MONGO_HOST;
const port = config.mongo.MONGO_PORT;
const user = config.mongo.MONGO_USER;
const pass = config.mongo.MONGO_PASS;
const database = config.app.DATABASE;

const connect_urls = {
  production: `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=admin`,
  development: `mongodb://${host}:${port}/${database}`,
};

// Create connection
mongoose.connect(connect_urls[env]);

// Signal connection
mongoose.connection
  .once("open", function () {
    console.log(`${clr.fg.cyan}Mongo database server is connected...`);
  })
  .on("error", function (error) {
    console.log(`${clr.fg.red}Mongo database connection error... `, error);
  })
  .on("disconnected", function () {
    console.log(`${clr.fg.yellow}Mongo database server is disconnected...`);
  });

module.exports = mongoose;
