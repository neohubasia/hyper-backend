const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const makeSchema = new Schema({
  role: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
makeSchema.plugin(passportLocalMongoose);
const User = mongoose.model("user", makeSchema);

// just create first action
// User.register(
//   {
//     username: "minmin",
//     role: "admin (access all)",
//     active: false,
//   },
//   "minmin"
// );

module.exports = User;
