const mongoose = require('../connection');
const SchemaPlugin = require('./helpers/schema-plugin');

let Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: new Date()
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    orderItem: [{
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'product'
        },
        quantity: {
            type: Number,
            require: true
        },
        price: {
            type: Number,
            required: true
        },
        discount_price: {
            type: Number,
            required: true
        },
    }],
    status: {
        type: String,
        default: 'pending'
    },
    created_at: { type: Date },
    updated_at: { type: Date },
})

orderSchema.plugin(SchemaPlugin);
let Order = mongoose.model('order', orderSchema);

module.exports = Order;