const { async } = require('validate.js');
let CartsDb = require('../../../../controllers/cart');

let carts = module.exports = {};

carts.index = (req, res, next) => {
    CartsDb.listData()
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

carts.show = (req, res, next) => {
    CartsDb.findData('id', req.params.id)
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

carts.showby = (req, res, next) => {

    CartsDb.findDataBy(req.query)
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

carts.create = (req, res, next) => {
    CartsDb.addData(req.body)
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

carts.update = (req, res, next) => {
    CartsDb.updateData(req.params.id, req.body)
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

carts.updateMany = async (req, res, next) => {
    const response = await CartsDb.updateMany(req.query, req.body)
    // .then(data => {
    //     res.send(data)
    // })
    // .catch(next);
    res.send(response)
}

carts.delete = (req, res, next) => {
    CartsDb.deleteData(req.body.customerId)
        .then(data => {
            // res.send(data)
            next();
        })
        .catch(next);
}

carts.deleteBy = (req, res, next) => {
    CartsDb.deleteDataBy(req.query)
        .then(data => {
            res.send(data)
        })
        .catch(next);
}

carts.deleteall = (req, res, next) => {
    CartsDb.dropAll()
        .then(data => {
            res.send(data)
        })
        .catch(next);
}