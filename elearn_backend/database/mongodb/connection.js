let config = require('../../config')
let mongoose = require('mongoose');

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

// Set environment variables
let env = process.env.NODE_ENV;

if (env === 'production') {
  // Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
  const username = config.mongo.MONGO_USER
  const password = config.mongo.MONGO_PW
  mongoose.connect(`mongodb://${username}:${password}@ds161630.mlab.com:61630/elearn_backend_prod`)
} else {
  mongoose.connect('mongodb://localhost:27017/elearn_backend_uat'), {
    useMongoClient: true,
  };
}

// Signal connection
mongoose.connection.once('open', function () {
  console.log('Server is connected with mongo...');
}).on('error', function (error) {
  console.log('Mongo connection error ', error);
}).on('disconnected', function () {
  console.log('Mongo connection is disconnected...');
})

module.exports = mongoose
