const { isNumber } = require("validate.js");
const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  townshipid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "township",
  },
  companyid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "delivery_company",
  },
  charge: {
    type: Number,
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
let PaymentMethod = mongoose.model("delivery_charge", makeSchema);

module.exports = PaymentMethod;
