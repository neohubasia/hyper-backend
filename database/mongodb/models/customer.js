const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const makeSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  telephone: String,
  email:{
      type:String,
      require:true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  customer_type: String,
  address: String,
  account_type: String,
  active: {
    type: Boolean, default: false
  },
  created_at: { type: Date },
  updated_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
const Customer = mongoose.model('customer', makeSchema);

// User.register({username:'admin', active: false}, 'min');
// just create first action
// node ../path/user.js

module.exports = Customer;