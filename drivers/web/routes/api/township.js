let TownshipsDb = require("../../../../controllers/township");

let townships = (module.exports = {});

townships.index = (req, res, next) => {
  TownshipsDb.listData()
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

townships.show = (req, res, next) => {
  TownshipsDb.findData("id", req.params.id)
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

townships.showby = (req, res, next) => {
  TownshipsDb.findDataBy(req.query)
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

townships.create = (req, res, next) => {
  TownshipsDb.addData(req.body)
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

townships.update = (req, res, next) => {
  TownshipsDb.updateData(req.params.id, req.body)
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

townships.delete = (req, res, next) => {
  TownshipsDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

townships.deleteall = (req, res, next) => {
  TownshipsDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
