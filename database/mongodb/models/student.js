const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  grade: {
    type: Number,
  },
  profile_images: {
    type: Array,
  },
  prefect: {
    type: Boolean,
    default: false,
  },
  cityid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
  },
  townshipid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "township",
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let Student = mongoose.model("student", makeSchema);

module.exports = Student;
