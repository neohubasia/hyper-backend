let ProductPacksDb = require("../../../../controllers/product_package");

let product_packages = (module.exports = {});

product_packages.index = (req, res, next) => {
  ProductPacksDb.listData()
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

product_packages.show = (req, res, next) => {
  ProductPacksDb.findData("id", req.params.id)
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

product_packages.showBy = (req, res, next) => {
  ProductPacksDb.findDataBy(req.query)
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

product_packages.create = (req, res, next) => {
  ProductPacksDb.addData(req.body)
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

product_packages.update = (req, res, next) => {
  ProductPacksDb.updateData(req.params.id, req.body)
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

product_packages.delete = (req, res, next) => {
  ProductPacksDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

product_packages.deleteall = (req, res, next) => {
  ProductPacksDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
