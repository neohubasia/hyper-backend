const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    name: String,
    description: String,
    template: String,
    type: {
        type: String,
        enum: ["aboutus", "policy", "howtouse", "other"]
    },
    status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
let Template = mongoose.model('template', makeSchema);

module.exports = Template;