let townshipsDb = require('../../../../controllers/townships');

let townships = module.exports = {};

townships.index = (req, res, next) => {
  townshipsDb.listData()
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

townships.show = (req, res, next) => {
  townshipsDb.findData('id', req.params.id)
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

townships.showby = (req,res, next) => {
  let obj = [];
  Object.keys(req.query).map(function(i){ 
    obj.push({ prop: i, val: req.query[i]});
  })
  
  townshipsDb.findDataBy(obj[0]['prop'], obj[0]['val'])
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

townships.create = (req, res, next) => {
  townshipsDb.addData(req.body)
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

townships.update = (req, res, next) => {
  townshipsDb.updateData(req.params.id, req.body)
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

townships.delete = (req, res, next) => {
  townshipsDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

townships.deleteall = (req, res, next) => {
  townshipsDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}