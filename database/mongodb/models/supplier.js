const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  company_logo: { type: String },
  company_name: { type: String },
  contact_name: { type: String },
  address_info: [
    {
      address: { type: String },
      townshipid: { type: mongoose.Schema.Types.ObjectId, ref: "township" },
      cityid: { type: mongoose.Schema.Types.ObjectId, ref: "city" },
      postal_code: { type: Number },
      mobile_no: { type: String },
      email: {
        type: String,
        match:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
    },
  ],
  website: { type: String },
  payment_methods: [
    {
      payment_method_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment_method",
      },
    },
  ],
  product_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product_category",
  },
  feature: { type: Boolean, default: true },
  access: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
  description: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let Supplier = mongoose.model("supplier", makeSchema);

module.exports = Supplier;
