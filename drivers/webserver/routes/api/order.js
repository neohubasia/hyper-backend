let orderDb = require('../../../../controllers/orders');

let orders = module.exports = {};

orders.index = (req, res, next) => {
    orderDb.listData()
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

orders.show = (req, res, next) => {
    orderDb.findData('id', req.params.id)
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

orders.showby = (req, res, next) => {

    orderDb.findDataBy(req.query)
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

orders.create = (req, res, next) => {
    orderDb.addData(req.body)
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

orders.updateStatus = (req, res, next) => {
    orderDb.updateData(req.body.id, req.body)
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

orders.delete = (req, res, next) => {
    orderDb.deleteData(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(next);
}

orders.deleteall = (req, res, next) => {
    orderDb.dropAll()
        .then(data => {
            res.send(data)
        })
        .catch(next);
}