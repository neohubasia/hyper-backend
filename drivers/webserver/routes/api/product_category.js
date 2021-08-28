let productCategoriesDb = require('../../../../controllers/product_category');

let product_categories = module.exports = {};

product_categories.index = (req, res, next) => {
  productCategoriesDb.listData()
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

product_categories.show = (req, res, next) => {
  productCategoriesDb.findData('id', req.params.id)
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

product_categories.showby = (req,res, next) => {
  let obj = [];
  Object.keys(req.query).map(function(i){ 
    obj.push({ prop: i, val: req.query[i]});
  })
  
  productCategoriesDb.findDataBy(obj[0]['prop'], obj[0]['val'])
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

product_categories.create = (req, res, next) => {
  productCategoriesDb.addData(req.body)
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

product_categories.update = (req, res, next) => {
  productCategoriesDb.updateData(req.params.id, req.body)
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

product_categories.delete = (req, res, next) => {
  productCategoriesDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

product_categories.deleteall = (req, res, next) => {
  productCategoriesDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}