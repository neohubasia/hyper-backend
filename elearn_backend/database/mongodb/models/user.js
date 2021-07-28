const mongoose = require('../connection');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String,
  role: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// UserDetails.register({username:'admin', active: false}, 'min');
// just create first action
// node ../path/user.js

module.exports = UserDetails;