let paymentmethodDb = require('../../../../controllers/payment_methods');

let payment_methods = module.exports = {};

payment_methods.index = (req, res, next) => {
  paymentmethodDb.listData()
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

payment_methods.show = (req, res, next) => {
  paymentmethodDb.findData('id', req.params.id)
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

payment_methods.showby = (req, res, next) => {
  paymentmethodDb.findDataBy(req.query)
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

payment_methods.create = (req, res, next) => {
  paymentmethodDb.addData(req.body)
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

payment_methods.update = (req, res, next) => {
  paymentmethodDb.updateData(req.params.id, req.body)
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

payment_methods.delete = (req, res, next) => {
  paymentmethodDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

payment_methods.deleteall = (req, res, next) => {
  paymentmethodDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}