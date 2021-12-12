let SuppliersDb = require("../../../../controllers/supplier");

let suppliers = (module.exports = {});

suppliers.index = (req, res, next) => {
  delete req.query._;

  SuppliersDb.listData(req.query)
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

suppliers.show = (req, res, next) => {
  SuppliersDb.findData("id", req.params.id)
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

suppliers.showby = (req, res, next) => {
  // let obj = [];
  // Object.keys(req.query).map(function(i){
  //   obj.push({ prop: i, val: req.query[i]});
  // })

  SuppliersDb.findDataBy(req.query)
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

suppliers.create = (req, res, next) => {
  SuppliersDb.addData(req.body)
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

suppliers.update = (req, res, next) => {
  SuppliersDb.updateData(req.params.id, req.body)
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

suppliers.delete = (req, res, next) => {
  SuppliersDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

suppliers.deleteall = (req, res, next) => {
  SuppliersDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
