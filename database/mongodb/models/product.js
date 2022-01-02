const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  name: {
    type: String,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product_category",
  },
  inventory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product_inventory",
  },
  discount_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "discount",
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  images: {
    type: Array,
  },
  features: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let Product = mongoose.model("product", makeSchema);

module.exports = Product;
