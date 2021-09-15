let ProductsDb = require('../../../../controllers/product');

let products = module.exports = {};

products.index = (req, res, next) => {
  ProductsDb.listData()
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

products.show = (req, res, next) => {
  ProductsDb.findData('id', req.params.id)
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

products.showby = (req, res, next) => {

  ProductsDb.findDataBy(req.query)
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

products.create = (req, res, next) => {
  ProductsDb.addData(req.body)
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

products.update = (req, res, next) => {
  ProductsDb.updateData(req.params.id, req.body)
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

products.delete = (req, res, next) => {
  ProductsDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

products.deleteall = (req, res, next) => {
  ProductsDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}