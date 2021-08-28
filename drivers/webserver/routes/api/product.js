let productsDb = require('../../../../controllers/product');

let products = module.exports = {};

products.index = (req, res, next) => {
  productsDb.listData()
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

products.show = (req, res, next) => {
  productsDb.findData('id', req.params.id)
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

products.showby = (req,res, next) => {
  let obj = [];
  Object.keys(req.query).map(function(i){ 
    obj.push({ prop: i, val: req.query[i]});
  })
  
  productsDb.findDataBy(obj[0]['prop'], obj[0]['val'])
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

products.create = (req, res, next) => {
  productsDb.addData(req.body)
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

products.update = (req, res, next) => {
  productsDb.updateData(req.params.id, req.body)
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

products.delete = (req, res, next) => {
  productsDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

products.deleteall = (req, res, next) => {
  productsDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}