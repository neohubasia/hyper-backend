let templateDb = require('../../../../controllers/template');

let template = module.exports = {};

template.index = (req, res, next) => {
  templateDb.listData()
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

template.show = (req, res, next) => {
  templateDb.findData('id', req.params.id)
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

template.showby = (req,res, next) => {
  templateDb.findDataBy(req.query)
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

template.create = (req, res, next) => {
  templateDb.addData(req.body)
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

template.update = (req, res, next) => {
  templateDb.updateData(req.params.id, req.body)
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

template.delete = (req, res, next) => {
  templateDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

template.deleteall = (req, res, next) => {
  templateDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}