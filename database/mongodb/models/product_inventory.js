const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    name: { type: String },
    weight_id: { type: mongoose.Schema.Types.ObjectId, ref: "product_weight" },
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: "product_package" },
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "supplier" },
    inventory_type: { type: String, enum: ["RMS", "WIP", "FGS", "MRO"], default: "FGS" },
    quantity: { type: Number },
    description: String,
    status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let ProductInventory = mongoose.model('product_inventory', makeSchema);

module.exports = ProductInventory;