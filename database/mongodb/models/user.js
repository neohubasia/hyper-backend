const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String,
  active: {
    type: Boolean, default: false
  },
  role: String,
  created_at: { type: Date },
  updated_at: { type: Date }
});

UserDetail.plugin(SchemaPlugin);
UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// UserDetails.register({username:'admin', active: false}, 'min');
// just create first action
// node ../path/user.js

module.exports = UserDetails;