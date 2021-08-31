const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    images: Array,
    title: String,
    image_size: String,
    page_name: String,
    no_of_image: Number,
    status: { type: Boolean, default: true },
    description: String,
    created_at: { type: Date },
    updated_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
let Banner = mongoose.model('banner', makeSchema);

module.exports = Banner;