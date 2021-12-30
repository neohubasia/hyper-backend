let BannersDb = require("../../../../controllers/banner");

let banners = (module.exports = {});

banners.index = (req, res, next) => {
  BannersDb.listData()
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

banners.show = (req, res, next) => {
  BannersDb.findData("id", req.params.id)
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

banners.showby = (req, res, next) => {
  // let obj = [];
  // Object.keys(req.query).map(function(i){
  //   obj.push({ prop: i, val: req.query[i]});
  // })

  BannersDb.findDataBy(req.query)
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

banners.create = (req, res, next) => {
  BannersDb.addData(req.body)
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

banners.update = (req, res, next) => {
  BannersDb.updateData(req.params.id, req.body)
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

banners.delete = (req, res, next) => {
  BannersDb.deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

banners.deleteall = (req, res, next) => {
  BannersDb.dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
