let supplierDb = require('../../../../controllers/supplier');

let suppliers = module.exports = {};

suppliers.index = (req, res, next) => {
  supplierDb.listData()
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

suppliers.show = (req, res, next) => {
  supplierDb.findData('id', req.params.id)
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

suppliers.showby = (req,res, next) => {
  // let obj = [];
  // Object.keys(req.query).map(function(i){ 
  //   obj.push({ prop: i, val: req.query[i]});
  // })
  
  supplierDb.findDataBy(req.query)
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

suppliers.create = (req, res, next) => {
  supplierDb.addData(req.body)
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

suppliers.update = (req, res, next) => {
  supplierDb.updateData(req.params.id, req.body)
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

suppliers.delete = (req, res, next) => {
  supplierDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

suppliers.deleteall = (req, res, next) => {
  supplierDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}