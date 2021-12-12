let ProductInventoriesDb = require("../../../../controllers/product_inventory");

let product_inventories = (module.exports = {});

product_inventories.index = (req, res, next) => {
  delete req.query._;

  ProductInventoriesDb.listData(req.query)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

product_inventories.show = (req, res, next) => {
  ProductInventoriesDb.findData("id", req.params.id)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

product_inventories.showby = (req, res, next) => {
  ProductInventoriesDb.findDataBy(req.query)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

product_inventories.create = (req, res, next) => {
  ProductInventoriesDb.addData(req.body)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

product_inventories.update = (req, res, next) => {
  ProductInventoriesDb.updateData(req.params.id, req.body)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

product_inventories.delete = (req, res, next) => {
  ProductInventoriesDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

product_inventories.deleteall = (req, res, next) => {
  ProductInventoriesDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
