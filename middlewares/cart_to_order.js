const Cart = require("../database/mongodb/models/cart")
const Product = require('../database/mongodb/models/product')
const Discount = require('../database/mongodb/models/discount')
const Inventory = require('../database/mongodb/models/product_inventory')


const constructOrder = function (req, res, next) {
    req.body.orderNumber = generateOrderId();
    const customerId = req.body.customerId
    let total = 0, orderItem = [];

    Cart.find({ customerId })
        .populate("productId")
        .then(items => {
            if (items.length) {
                items.map(async (item, index) => {
                    var discount_price = 0
                    let productDetails = await Product.findById(item.productId._id)

                    if (!productDetails) {
                        return res.status(500).json({
                            status: "FAIL",
                            data: "Invalid Request - Item Not Found"
                        })
                    }

                    if (productDetails.discount_id != undefined) {
                        let discountDetail = await Discount.findById(productDetails.discount_id)
                        discount_price = discountDetail.discount_type == "percent" ? (parseInt(discountDetail.discount_amount) / 100) * productDetails.price : parseInt(discountDetail.discount_amount)
                    }

                    const { quantity } = item
                    const { price } = item.productId
                    total = total + (price - discount_price) * quantity

                    orderItem = orderItem.concat({
                        productId: item.productId._id,
                        quantity,
                        price,
                        discount_price
                    })

                    if (index == items.length - 1) {
                        req.body.total = total
                        req.body.orderItem = orderItem
                        console.log("Order Data Constructed ...")
                        next()
                    }
                })
            }
            else {
                res.json({
                    status: "FAIL",
                    data: "Invalid Request - Empty Cart"
                })
            }

        })
        .catch(err => {
            console.log("Error ", err)
            res.json({
                status: "FAIL",
                data: err
            })
        })
}

const verifyStock = function (req, res, next) {
    const items = req.body.orderItem
    var checkAll = 0;
    if (items.length) {
        items.map(item => {
            Product.findOne({ _id: item.productId }).populate({
                model: "product_inventory",
                path: "inventory_id",
                select: "quantity"
            })
                .then(product => {
                    const quantity = product.inventory_id.quantity;

                    console.log("Quantity ", quantity)

                    if (quantity >= item.quantity) {
                        checkAll++;
                    }
                    else if (quantity > 0) {
                        res.json({
                            "status": "FAIL",
                            "data": `Only ${quantity} available for ${item.productId} product`
                        })
                    }
                    else {
                        res.json({
                            "status": "FAIL",
                            "data": `Out of stock for ${item.productId} product`
                        })
                    }
                    if (items.length == checkAll) {
                        console.log("Check Stock Verified ...")
                        next()
                    }
                })
                .catch(err => {
                    console.log("Error ", err)
                    res.json({
                        status: "FAIL",
                        data: err
                    })
                })
        })
    }
}


const updateStock = function (req, res, next) {
    const items = req.body.orderItem
    if (items.length) {
        items.map(item => {
            Product.findOne({ _id: item.productId }).populate({
                model: "product_inventory",
                path: "inventory_id",
                select: "quantity"
            })
                .then(product => {
                    const quantity = product.inventory_id.quantity - item.quantity
                    const _id = product.inventory_id._id

                    Inventory.findOneAndUpdate({ _id }, { quantity }, { useFindAndModify: false })
                        .then(inventory => {
                            console.log("Inventory Stock Updated ...")
                            next()
                        })
                })
                .catch(err => {
                    console.log("Error ", err)
                    res.json({
                        status: "FAIL",
                        data: err
                    })
                })
        })
    }
}

const generateOrderId = () => {
    return 'xxxx-xxxxxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}

module.exports = {
    constructOrder,
    verifyStock,
    updateStock,
}