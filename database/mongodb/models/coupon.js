const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  code: String,
  customer_type: {
    type: String,
    enum: ["normal", "premium"],
    default: "normal",
  },
  discount_type: {
    type: String,
    enum: ["percent", "amount", "other"],
    default: "amount",
  },
  discount_amount: Number,
  no_of_limits: Number,
  description: String,
  status: Boolean,
  start_time: { type: Date },
  expire_time: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let City = mongoose.model("coupon", makeSchema);

module.exports = City;
