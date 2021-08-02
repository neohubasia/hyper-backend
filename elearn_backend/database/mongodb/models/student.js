const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  name: String,
  age: Number,
  grade: Number,
  profile_images: Array,
  prefect: {
    type: Boolean,
    default: false
  },
  created_at: { type: Date },
  updated_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
let Student = mongoose.model('Student', makeSchema);

module.exports = Student;