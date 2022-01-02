const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  acc_name: {
    type: String,
  },
  acc_number: {
    type: String,
  },
  payment_method: {
    type: String,
    enum: ["bank", "wallet", "cod", "other"],
  },
  payment_name: {
    type: String,
    enum: ["kbz", "aya", "yoma", "wave_money", "kbz_pay"],
  },
  organization: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let PaymentMethod = mongoose.model("payment_method", makeSchema);

module.exports = PaymentMethod;
