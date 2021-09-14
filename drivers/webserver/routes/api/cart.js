const { async } = require('validate.js');
let cartDb = require('../../../../controllers/carts');

let carts = module.exports = {};

carts.index = (req, res, next) => {
    cartDb.listData()
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
    cartDb.findData('id', req.params.id)
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

    cartDb.findDataBy(req.query)
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
    cartDb.addData(req.body)
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
    cartDb.updateData(req.params.id, req.body)
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
    const response = await cartDb.updateMany(req.query, req.body)
    // .then(data => {
    //     res.send(data)
    // })
    // .catch(next);
    res.send(response)
}

carts.delete = (req, res, next) => {
    cartDb.deleteData(req.body.customerId)
        .then(data => {
            // res.send(data)
            next();
        })
        .catch(next);
}

carts.deleteBy = (req, res, next) => {
    cartDb.deleteDataBy(req.query)
        .then(data => {
            res.send(data)
        })
        .catch(next);
}

carts.deleteall = (req, res, next) => {
    cartDb.dropAll()
        .then(data => {
            res.send(data)
        })
        .catch(next);
}