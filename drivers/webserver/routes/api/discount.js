let discountDb = require('../../../../controllers/discount');

let discounts = module.exports = {};

discounts.index = (req, res, next) => {
  discountDb.listData()
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

discounts.activeData = (req, res, next) => {
  discountDb.listActiveData()
    .then(data => {
      console.log(data)
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
  discountDb.findData('id', req.params.id)
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

discounts.showby = (req,res, next) => {

  discountDb.findDataBy(req.query)
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
  discountDb.addData(req.body)
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
  discountDb.updateData(req.params.id, req.body)
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
  discountDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

discounts.deleteall = (req, res, next) => {
  discountDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}