const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  email: {
    type: String,
  },
  company_logo: {
    type: String,
  },
  company_name: {
    type: String,
  },
  contact_name: {
    type: String,
  },
  primary_mobile: {
    type: String,
  },
  secondary_mobile: {
    type: String,
  },
  address: {
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
let PaymentMethod = mongoose.model("delivery_company", makeSchema);

module.exports = PaymentMethod;
