let DeliveryChargesDb = require('../../../../controllers/delivery_charge');

let delivery_charges = module.exports = {};

delivery_charges.index = (req, res, next) => {
    DeliveryChargesDb.listData()
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

delivery_charges.show = (req, res, next) => {
    DeliveryChargesDb.findData('id', req.params.id)
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

delivery_charges.showby = (req, res, next) => {
    DeliveryChargesDb.findDataBy(req.query)
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

delivery_charges.create = (req, res, next) => {
    DeliveryChargesDb.addData(req.body)
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

delivery_charges.update = (req, res, next) => {
    DeliveryChargesDb.updateData(req.params.id, req.body)
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

delivery_charges.delete = (req, res, next) => {
    DeliveryChargesDb.deleteData(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(next);
}

delivery_charges.deleteall = (req, res, next) => {
    DeliveryChargesDb.dropAll()
        .then(data => {
            res.send(data)
        })
        .catch(next);
}