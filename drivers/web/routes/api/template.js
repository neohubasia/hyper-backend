let TemplatesDb = require("../../../../controllers/template");

let templates = (module.exports = {});

templates.index = (req, res, next) => {
  TemplatesDb.listData()
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

templates.show = (req, res, next) => {
  TemplatesDb.findData("id", req.params.id)
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

templates.showby = (req, res, next) => {
  TemplatesDb.findDataBy(req.query)
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

templates.create = (req, res, next) => {
  TemplatesDb.addData(req.body)
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

templates.update = (req, res, next) => {
  TemplatesDb.updateData(req.params.id, req.body)
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

templates.delete = (req, res, next) => {
  TemplatesDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

templates.deleteall = (req, res, next) => {
  TemplatesDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
