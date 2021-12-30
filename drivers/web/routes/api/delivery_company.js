let DeliveryCompaniesDb = require("../../../../controllers/delivery_company");

let delivery_companies = (module.exports = {});

delivery_companies.index = (req, res, next) => {
  DeliveryCompaniesDb.listData()
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

delivery_companies.show = (req, res, next) => {
  DeliveryCompaniesDb.findData("id", req.params.id)
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

delivery_companies.showby = (req, res, next) => {
  DeliveryCompaniesDb.findDataBy(req.query)
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

delivery_companies.create = (req, res, next) => {
  DeliveryCompaniesDb.addData(req.body)
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

delivery_companies.update = (req, res, next) => {
  DeliveryCompaniesDb.updateData(req.params.id, req.body)
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

delivery_companies.delete = (req, res, next) => {
  DeliveryCompaniesDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

delivery_companies.deleteall = (req, res, next) => {
  DeliveryCompaniesDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
