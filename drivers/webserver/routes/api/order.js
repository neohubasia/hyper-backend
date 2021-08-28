
let productsDb = require('../../../../controllers/product');
let discountsDb = require('../../../../controllers/discount');
let Order=require('../../../../database/mongodb/models/order');
const array = require('joi/lib/types/array');

let orders = module.exports = {};


orders.create = (req,res) => {
    req.body.address = req.body.address
    const order = new Order(req.body)
    // order.userId = req.user._id
    order.customerId = req.body.customerId
    order.save()
    .then(response => {
        res.json(response)
    })
    .catch(err => res.json(err))
}

orders.read = (req, res) => {
    const customerId = req.params.customerId
    Order.find({customerId})
        .then(categories => {
            res.send(categories)
        })
        .catch(err => console.log(err))
}

orders.getList = (req, res) => {
    Order.find()
        .populate('customerId')
        .then(data => {
            res.json({
            status: "SUCCESS",
            data: data
            });
        })
        .catch(err => {
            console.log(`Error ${err}`)
            res.json({
            status: "FAIL",
            data: err
            })
        });
}

    