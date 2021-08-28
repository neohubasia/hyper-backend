const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;

const CartSchema = new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'customer',
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    quantity:{
        type:Number,
        default: 1
    },
    created_at: { type: Date },
    updated_at: { type: Date },
})

CartSchema.plugin(SchemaPlugin);
let Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;