const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  name: String,
  payment_role: {
    type: String,
    enum: ["bank", "pay", "other"]
  },
  organization: String,
  description: String,
  status: { type: Boolean, default: true },
  created_at: { type: Date },
  updated_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
let PaymentMethod = mongoose.model('payment_method', makeSchema);

module.exports = PaymentMethod;