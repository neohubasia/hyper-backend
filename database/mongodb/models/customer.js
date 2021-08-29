const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const makeSchema = new Schema({
  first_name: {
    type: String,
    required:  true
  },
  last_name: {
    type: String,
    default: ""
  },
  displayName: {
    type: String,
    required:  true
  },
  email: {
    type: String,
    unique : true,
    required: true,
    dropDups: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: String,
  customer_type: {
    type: String,
    enum : ["normal", "premium"],
    default: 'normal'
  },
  account_type: {
    type: String,
    enum : ['itemplate', 'facebook', 'gmail'],
    default: 'itemplate'
  },
  oauth_profile: {
    refId: String,
    displayName: String,
    email: {
      type: String,
      // required: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
  },
  address: [
    {
      name: {
        type: String,
        trim: true,
        min: 3,
        max: 50,
        // required: true,
      },
      mobileNumber: {
        type: String,
        trim: true,
        // required: true,
      },
      pinCode: {
        type: String,
        trim: true,
        // required: true,
      },
      locality: {
        type: String,
        trim: true,
        min: 10,
        max: 100,
        // required: true,
      },
      address: {
        type: String,
        trim: true,
        min: 10,
        max: 100,
        // required: true,
      },
      cityDistrictTown: {
        type: String,
        trim: true,
        // required: true,
      },
      state: {
        type: String,
        // required: true,
      },
      landmark: {
        type: String,
        min: 10,
        max: 100,
      },
      alternatePhone: {
        type: String,
      },
      addressType: {
        type: String,
        enum: ["home", "work"],
        // required: true,
      },
    }
  ],
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