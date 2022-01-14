let ProductWeightsDb = require("../../../../controllers/product_weight");

let product_weights = (module.exports = {});

product_weights.index = (req, res, next) => {
  ProductWeightsDb.listData()
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

product_weights.show = (req, res, next) => {
  ProductWeightsDb.findData("id", req.params.id)
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

product_weights.showBy = (req, res, next) => {
  ProductWeightsDb.findDataBy(req.query)
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

product_weights.create = (req, res, next) => {
  ProductWeightsDb.addData(req.body)
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

product_weights.update = (req, res, next) => {
  ProductWeightsDb.updateData(req.params.id, req.body)
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

product_weights.delete = (req, res, next) => {
  ProductWeightsDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

product_weights.deleteall = (req, res, next) => {
  ProductWeightsDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
