
let productsDb = require('../../../../controllers/product');
let discountsDb = require('../../../../controllers/discount');
let Cart=require('../../../../database/mongodb/models/cart');
const array = require('joi/lib/types/array');

let carts = module.exports = {};

carts.create =async (req,res) => {
    // const userId = req.user._id
    const customerId = req.body.customerId
    const productId = req.body.productId
    const quantity = req.body.quantity
    var ck_cart=await Cart.find({customerId:customerId,productId:productId})  
    if (ck_cart[0]) {
        var up_quantity=ck_cart[0].quantity+parseInt(quantity)
        Cart.findOneAndUpdate({productId, customerId}, {quantity:up_quantity} , { new: true})
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
    }else{
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
        // console.log("yes")
    })
    .catch(err => console.log(err))
}







// carts.addItemToCart = async (req, res) => {
//     const {
//         productId,
//         customerId,
//     } = req.body;
//     const quantity = Number.parseInt(req.body.quantity);
//     try {
//         let cart = await cartsDb.cart(customerId);
        // let productDetails = await productsDb.findData('id', productId)
        
        //      if (!productDetails) {
        //         return res.status(500).json({
        //             type: "Not Found",
        //             msg: "Invalid request"
        //         })
        //     }
        // if(productDetails.discount_id!=undefined){
        //     let discountDetail = await discountsDb.findData('id', productDetails.discount_id)
        //     var discount_amount=discountDetail.discount_type==true?(parseInt(discountDetail.discount_amount)/100)*productDetails.price:parseInt(discountDetail.discount_amount)
        // }else{
        //     var discount_amount=0
        // }
//         //--If Cart Exists ----
//             // console.log(cart)
//             // console.log(productDetails)
//         if (cart) {
//             cart.customerId=customerId;
//             //---- check if index exists ----
//             const indexFound = cart.items.findIndex(item => item.productId.id == productId);
//             //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
//             if (indexFound !== -1 && quantity <= 0) {
//                 cart.items.splice(indexFound, 1);
//                 if (cart.items.length == 0) {
//                     cart.subTotal = 0;
//                 } else {
//                     cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
//                 }
//             }
//             //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
//             else if (indexFound !== -1) {
//                 cart.items[indexFound].productId=productId;
//                 cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
//                 cart.items[indexFound].total = cart.items[indexFound].quantity * (productDetails.price-discount_amount);
//                 cart.items[indexFound].price = productDetails.price,
//                 cart.items[indexFound].discount_price = discount_amount
//                 cart.items[indexFound].discount=productDetails.discount_id!=undefined?productDetails.discount_id:null,
//                 cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
//             }
//             //----Check if Quantity is Greater than 0 then add item to items Array ----
//             else if (quantity > 0) {
//                 cart.items.push({
//                     productId: productId,
//                     quantity: quantity,
//                     discount:productDetails.discount_id!=undefined?productDetails.discount_id:null,
//                     price: productDetails.price,
//                     discount_price:discount_amount,
//                     total: parseInt((productDetails.price-discount_amount) * quantity)
//                 })
//                 cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
//             }
//             //----if quantity of price is 0 throw the error -------
//             else {
//                 return res.status(400).json({
//                     type: "Invalid",
//                     msg: "Invalid request"
//                 })
//             }
//             // console.log(cart)
//             await Cart.findOneAndDelete({ customerId: customerId })
//             let data = await new Cart(cart).save()
//             res.status(200).json({
//                 type: "success",
//                 mgs: "Process Successful",
//                 data: data
//             })
//         }
//         //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
//         else {
//             const cartData = {
//                 customerId:customerId,
//                 items: [{
//                     productId: productId,
//                     quantity: quantity,
//                     discount:productDetails.discount_id!=undefined?productDetails.discount_id:null,
//                     discount_price:discount_amount,
//                     total: parseInt((productDetails.price-discount_amount) * quantity),
//                     price: productDetails.price
//                 }],
//                 subTotal: parseInt((productDetails.price-discount_amount) * quantity)
//             }
//             cart = await cartsDb.addItem(cartData)
//             // let data = await cart.save();
//             res.json(cart);
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({
//             type: "Invalid",
//             msg: "Something Went Wrong",
//             err: err
//         })
//     }
// }
// carts.getCart = async (req, res) => {
//     var customerId=req.params.customerId
//     try {
//         let cart = await cartsDb.cart(customerId);
//         if (!cart) {
//             return res.status(400).json({
//                 type: "Invalid",
//                 msg: "Cart Not Found",
//             })
//         }
//     //    cart.items[0].discount.discount_type==true?false:true
//     //    console.log(cart.items)
//         res.status(200).json({
//             status: true,
//             data: cart
//         })
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({
//             type: "Invalid",
//             msg: "Something Went Wrong",
//             err: err
//         })
//     }
// }
    