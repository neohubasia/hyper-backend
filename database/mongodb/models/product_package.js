const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    name: String,
    description: String,
    status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let Productpackage = mongoose.model('product_package', makeSchema);

module.exports = Productpackage;