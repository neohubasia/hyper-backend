let PaymentMethodsDb = require('../../../../controllers/payment_method');

let payment_methods = module.exports = {};

payment_methods.index = (req, res, next) => {
  PaymentMethodsDb.listData()
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
  PaymentMethodsDb.findData('id', req.params.id)
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
  PaymentMethodsDb.findDataBy(req.query)
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
  PaymentMethodsDb.addData(req.body)
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
  PaymentMethodsDb.updateData(req.params.id, req.body)
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
  PaymentMethodsDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

payment_methods.deleteall = (req, res, next) => {
  PaymentMethodsDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}