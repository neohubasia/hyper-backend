const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  images: {
    type: Array,
  },
  title: {
    type: String,
  },
  image_size: {
    type: String,
  },
  page_name: {
    type: String,
  },
  no_of_image: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let Banner = mongoose.model("banner", makeSchema);

module.exports = Banner;
