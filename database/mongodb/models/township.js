const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  township_mm: {
    type: String,
  },
  township_en: {
    type: String,
  },
  cityid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
  },
  code: {
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
let Township = mongoose.model("township", makeSchema);

module.exports = Township;
