const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    quantity: Number,
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
let ProductInventory = mongoose.model('product_inventory', makeSchema);

module.exports = ProductInventory;