let ProductCategoriesDb = require("../../../../controllers/product_category");

let product_categories = (module.exports = {});

product_categories.index = (req, res, next) => {
  ProductCategoriesDb.listData()
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

product_categories.show = (req, res, next) => {
  ProductCategoriesDb.findData("id", req.params.id)
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

product_categories.showby = (req, res, next) => {
  ProductCategoriesDb.findDataBy(req.query)
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

product_categories.create = (req, res, next) => {
  ProductCategoriesDb.addData(req.body)
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

product_categories.update = (req, res, next) => {
  ProductCategoriesDb.updateData(req.params.id, req.body)
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

product_categories.delete = (req, res, next) => {
  ProductCategoriesDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

product_categories.deleteall = (req, res, next) => {
  ProductCategoriesDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
