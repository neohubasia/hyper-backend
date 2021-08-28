const { async } = require("validate.js")
const Cart = require("../database/mongodb/models/cart")
const Product = require('../database/mongodb/models/product')
const Discount=require('../database/mongodb/models/discount')


const findAndConstructOrder =function(req, res, next) {
	req.body.orderNumber = Number(Date.now())
    const customerId = req.body.customerId
	req.body.customerId = customerId
	let total = 0
	let orderItem = []
	Cart.find({ customerId })
        .populate("productId")
		.then(items => {
            if(items.length){
                items.map(async (item,index) => {
                    let productDetails = await Product.findById(item.productId._id)
                    if (!productDetails) {
                        return res.status(500).json({
                            type: "Not Found",
                            msg: "Invalid request"
                        })
                    }
                    if(productDetails.discount_id!=undefined) {
                        let discountDetail = await Discount.findById(productDetails.discount_id)
                        var discount_amount=discountDetail.discount_type==true?(parseInt(discountDetail.discount_amount)/100)*productDetails.price:parseInt(discountDetail.discount_amount)
                    } else {
                        var discount_amount=0
                    }
                    const { quantity } = item
                    const { price } = item.productId
                    total = total + (price-discount_amount) * quantity
                    orderItem = orderItem.concat({
                        productId: item.productId._id,
                        quantity,
                        price,
                        discount_price:discount_amount
                    })
                    if(index==items.length-1){
                        req.body.total = total
                        req.body.orderItem = orderItem
                        next()
                    }
                })
            }
            else{
                res.json({error:'cart is empty'})
            }
			
		})
		.catch(err => res.json(err))
}

const updateStock = function(req,res,next){
    const items = req.body.orderItem
    if(items.length){
        items.map(item => {
            Product.findOne({_id:item.productId})
            .then(product => {
                const stock = product.stock - item.quantity
                const _id = product._id
                Product.findOneAndUpdate({_id},{stock},{useFindAndModify:false})
                .then(product => {
                    next()
                })
            })
            .catch(err => console.log(err))
        })
    }
}

const verifyStock = function(req,res,next){
    const items = req.body.orderItem
    var ck_enditem = 0;
    if(items.length){
        items.map(item => {
            Product.findOne({_id:item.productId})
            .then(product => {
                const stock = product.stock
                if(stock >= item.quantity){
                    ck_enditem++;
                }
                else if (stock){
                    res.json({
                        "productId":item.productId,
                        "stock":stock,
                        "error":`only ${stock} available`
                    })
                }
               else{
                   res.json({
                    "productId":item.productId,   
                    "error":'Item Unavailable'
                })
               }
               if(items.length == ck_enditem){
                next()
               }
            })
            .catch(err => console.log(err))
        })
    }
}

module.exports = {
    findAndConstructOrder,
    updateStock,
    verifyStock
}