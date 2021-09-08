let productweightDb = require('../../../../controllers/product_weight');

let productweight = module.exports = {};

productweight.index = (req, res, next) => {
  productweightDb.listData()
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

productweight.show = (req, res, next) => {
  productweightDb.findData('id', req.params.id)
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

productweight.showby = (req, res, next) => {
  productweightDb.findDataBy(req.query)
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

productweight.create = (req, res, next) => {
  productweightDb.addData(req.body)
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

productweight.update = (req, res, next) => {
  productweightDb.updateData(req.params.id, req.body)
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

productweight.delete = (req, res, next) => {
  productweightDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

productweight.deleteall = (req, res, next) => {
  productweightDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}