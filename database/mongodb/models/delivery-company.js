const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    email: String,
    charge: Number,
    company_logo: String,
    company_name: String,
    contact_name: String,
    primry_mobile: String,
    secondary_mobile: String,
    address: String,
    description: String,
    status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
let PaymentMethod = mongoose.model('delivery_charge', makeSchema);

module.exports = PaymentMethod;