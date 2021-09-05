const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    name: String,
    description: String,
    discount_amount: Number,
    discount_type: {
        type: String,
        enum: ["discount", "amount", "other"]
    },
    active: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
let Discount = mongoose.model('discount', makeSchema);

module.exports = Discount;