let clr = require("../../librarys/console-color");
let config = require("../../config");
let mongoose = require("mongoose");

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const env = process.env.NODE_ENV;
const username = config.mongo.MONGO_USER;
const password = config.mongo.MONGO_PW;
const connect_urls = {
  production: `mongodb://${username}:${password}@159.65.140.255:27017/itemplate_backend_uat?authSource=admin`,
  development: `mongodb://localhost:27017/elearn_backend_uat`,
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
