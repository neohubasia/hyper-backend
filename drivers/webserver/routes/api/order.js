let OrdersDb = require('../../../../controllers/order');

let orders = module.exports = {};

orders.index = (req, res, next) => {
    OrdersDb.listData()
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
orders.orderReports=(req,res,next)=>{
    OrdersDb.reportFilter(req.query)
        .then(data => {
            console.log(data)
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
    OrdersDb.findData('id', req.params.id)
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

    OrdersDb.findDataBy(req.query)
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
    OrdersDb.addData(req.body)
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
    OrdersDb.updateData(req.body.id, req.body)
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
    OrdersDb.deleteData(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(next);
}

orders.deleteall = (req, res, next) => {
    OrdersDb.dropAll()
        .then(data => {
            res.send(data)
        })
        .catch(next);
}