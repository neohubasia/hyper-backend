let CitiesDb = require('../../../../controllers/city');

let cities = module.exports = {};

cities.index = (req, res, next) => {
  CitiesDb.listData()
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
  CitiesDb.findData('id', req.params.id)
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

cities.showby = (req, res, next) => {
  CitiesDb.findDataBy(req.query)
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
  CitiesDb.addData(req.body)
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
  CitiesDb.updateData(req.params.id, req.body)
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
  CitiesDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

cities.deleteall = (req, res, next) => {
  CitiesDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}