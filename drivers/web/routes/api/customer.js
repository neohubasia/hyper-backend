let CustomersDb = require("../../../../controllers/customer");

let customers = (module.exports = {});

customers.index = (req, res, next) => {
  CustomersDb.listData()
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

customers.show = (req, res, next) => {
  CustomersDb.findData("id", req.params.id)
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

customers.showBy = (req, res, next) => {
  // let obj = [];
  // Object.keys(req.query).map(function(i){
  //   obj.push({ prop: i, val: req.query[i]});
  // })

  CustomersDb.findDataBy(req.query)
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

customers.create = (req, res, next) => {
  CustomersDb.addData(req.body)
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

customers.update = (req, res, next) => {
  CustomersDb.updateData(req.params.id, req.body)
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

customers.delete = (req, res, next) => {
  CustomersDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

customers.deleteall = (req, res, next) => {
  CustomersDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
