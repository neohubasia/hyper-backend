const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
  acc_name: String,
  acc_number: String,
  payment_method: {
    type: String,
    enum: ["bank", "wallet", "cod", "other"]
  },
  payment_name: {
    type: String,
    enum: ["kbz", "aya", "yoma", "wave_money", "kbz_pay"]
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