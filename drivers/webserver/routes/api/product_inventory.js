let productInventoriesDb = require('../../../../controllers/product_inventory');

let product_inventories = module.exports = {};

product_inventories.index = (req, res, next) => {
  productInventoriesDb.listData()
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

product_inventories.show = (req, res, next) => {
  productInventoriesDb.findData('id', req.params.id)
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

product_inventories.showby = (req,res, next) => {

  productInventoriesDb.findDataBy(req.query)
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

product_inventories.create = (req, res, next) => {
  productInventoriesDb.addData(req.body)
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

product_inventories.update = (req, res, next) => {
  productInventoriesDb.updateData(req.params.id, req.body)
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

product_inventories.delete = (req, res, next) => {
  productInventoriesDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

product_inventories.deleteall = (req, res, next) => {
  productInventoriesDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}