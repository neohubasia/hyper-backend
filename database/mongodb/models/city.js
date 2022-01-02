const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  city_mm: {
    type: String,
  },
  city_en: {
    type: String,
  },
  code: {
    type: String,
  },
  unit: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let City = mongoose.model("city", makeSchema);

module.exports = City;
