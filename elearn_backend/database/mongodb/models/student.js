const mongoose = require('../connection');

let Schema = mongoose.Schema;
let StudentSchema = new Schema({
  name: String,
  age: Number,
  grade: Number,
  profile_images: Array,
  prefect: {
    type: Boolean,
    default: false
  }
});

let Student = mongoose.model('Student', StudentSchema);

module.exports = Student;