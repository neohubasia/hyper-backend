let productpackDb = require('../../../../controllers/product_package');

let prdouctpackage = module.exports = {};

prdouctpackage.index = (req, res, next) => {
  productpackDb.listData()
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

prdouctpackage.show = (req, res, next) => {
  productpackDb.findData('id', req.params.id)
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

prdouctpackage.showby = (req, res, next) => {
  productpackDb.findDataBy(req.query)
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

prdouctpackage.create = (req, res, next) => {
  productpackDb.addData(req.body)
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

prdouctpackage.update = (req, res, next) => {
  productpackDb.updateData(req.params.id, req.body)
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

prdouctpackage.delete = (req, res, next) => {
  productpackDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

prdouctpackage.deleteall = (req, res, next) => {
  productpackDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}