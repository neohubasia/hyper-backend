let customerDb = require('../../../../controllers/customer');

let customers = module.exports = {};

customers.index = (req, res, next) => {
  customerDb.listData()
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

customers.show = (req, res, next) => {
  customerDb.findData('id', req.params.id)
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

customers.showby = (req,res, next) => {
  // let obj = [];
  // Object.keys(req.query).map(function(i){ 
  //   obj.push({ prop: i, val: req.query[i]});
  // })
  
  customerDb.findDataBy(req.query)
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

customers.create = (req, res, next) => {
  customerDb.addData(req.body)
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

customers.update = (req, res, next) => {
  customerDb.updateData(req.params.id, req.body)
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

customers.delete = (req, res, next) => {
  customerDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

customers.deleteall = (req, res, next) => {
  customerDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}