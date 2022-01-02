const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  discount_amount: {
    type: Number,
  },
  discount_type: {
    type: String,
    enum: ["percent", "amount", "other"],
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  active: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let Discount = mongoose.model("discount", makeSchema);

module.exports = Discount;
