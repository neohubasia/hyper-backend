const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const makeSchema = new Schema({
  role: String,
  username: String,
  password: String,
  active: { type: Boolean, default: false },
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "supplier" },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
makeSchema.plugin(passportLocalMongoose);
const User = mongoose.model("user", makeSchema);

// User.register({username:'admin', active: false}, 'min');
// just create first action
// node ../path/user.js

module.exports = User;
