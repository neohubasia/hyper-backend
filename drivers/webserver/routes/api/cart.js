
let productsDb = require('../../../../controllers/product');
let discountsDb = require('../../../../controllers/discount');
let Cart = require('../../../../database/mongodb/models/cart');

let carts = module.exports = {};

carts.create =async (req,res) => {
    // const userId = req.user._id
    const customerId = req.body.customerId
    const productId = req.body.productId
    const quantity = req.body.quantity

    var ck_cart = await Cart.find({ customerId: customerId, productId: productId })  
    if (ck_cart[0]) {
        var up_quantity = ck_cart[0].quantity + parseInt(quantity)
        Cart.findOneAndUpdate({
              productId, customerId
            },
            { quantity: up_quantity }, { new: true })
            .then((cart) => {
                if (cart) {
                    res.json(cart)
                } else {
                    res.json({})
                }
            })
            .catch((err) => {
                res.json(err)
            })
    }
    else {
        const cart =await new Cart({customerId,productId,quantity})
            cart.save()
            .then(response => {
                res.json(response)
            })
            .catch(err => console.log(err))
    }
}

carts.read = (req, res) => {
    const customerId = req.params.customerId
    Cart.find({customerId})
        .populate('productId')
        .then(items => {
            res.send(items)
        })
        .catch(err => console.log(err))
}

carts.getList = (req, res) => {
    Cart.find()
        .populate('customerId')
        .populate('productId')
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

carts.destroy =async (req,res,next) => {
    const userId = req.body.user_id
    Cart.deleteMany({userId})
    .then(cart =>{
        console.log(cart)
        if(cart.deletedCount==1){
            next()
        }
    })
    .catch(err => console.log(err))
}