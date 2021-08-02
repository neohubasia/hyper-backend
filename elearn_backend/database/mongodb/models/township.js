const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;
let makeSchema = new Schema({
    township: String,
    township_en: String,
    cityid: {
        type: Schema.Types.ObjectId,
        ref: "City"
    },
    code: String,
    description: String,
    created_at: { type: Date },
    updated_at: { type: Date }
});

makeSchema.plugin(SchemaPlugin);
let Township = mongoose.model('Township', makeSchema);

module.exports = Township;