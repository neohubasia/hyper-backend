let citiesDb = require('../../../../controllers/cities');

let cities = module.exports = {};

cities.index = (req, res, next) => {
  citiesDb.listData()
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

cities.show = (req, res, next) => {
  citiesDb.findData('id', req.params.id)
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

cities.showby = (req,res, next) => {
  citiesDb.findDataBy(req.query)
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

cities.create = (req, res, next) => {
  citiesDb.addData(req.body)
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

cities.update = (req, res, next) => {
  citiesDb.updateData(req.params.id, req.body)
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

cities.delete = (req, res, next) => {
  citiesDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

cities.deleteall = (req, res, next) => {
  citiesDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}