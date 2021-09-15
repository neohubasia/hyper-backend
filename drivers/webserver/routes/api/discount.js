let DiscountsDb = require('../../../../controllers/discount');

let discounts = module.exports = {};

discounts.index = (req, res, next) => {
  DiscountsDb.listData()
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}


discounts.show = (req, res, next) => {
  DiscountsDb.findData('id', req.params.id)
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

discounts.showby = (req, res, next) => {

  DiscountsDb.findDataBy(req.query)
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

discounts.create = (req, res, next) => {
  DiscountsDb.addData(req.body)
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

discounts.update = (req, res, next) => {
  DiscountsDb.updateData(req.params.id, req.body)
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

discounts.delete = (req, res, next) => {
  DiscountsDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

discounts.deleteall = (req, res, next) => {
  DiscountsDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}