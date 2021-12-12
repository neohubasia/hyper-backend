const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  city_mm: String,
  city_en: String,
  code: String,
  unit: String,
  description: String,
  status: Boolean,
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let City = mongoose.model("city", makeSchema);

module.exports = City;
