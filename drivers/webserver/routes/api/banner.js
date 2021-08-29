let bannerDb = require('../../../../controllers/banners');

let banners = module.exports = {};

banners.index = (req, res, next) => {
  bannerDb.listData()
    .then(data => {
     console.log("Data",data);
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

banners.show = (req, res, next) => {
  bannerDb.findData('id', req.params.id)
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

banners.bannerbytype = (req, res, next) => {
    let type = req.query.type;
    console.log(type);
    bannerDb.findData('imagetype', type)
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

banners.showby = (req,res, next) => {
  let obj = [];
  Object.keys(req.query).map(function(i){ 
    obj.push({ prop: i, val: req.query[i]});
  })
  
  bannerDb.findDataBy(obj[0]['prop'], obj[0]['val'])
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

banners.create = (req, res, next) => {
  bannerDb.addData(req.body)
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

banners.update = (req, res, next) => {
  bannerDb.updateData(req.params.id, req.body)
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

banners.delete = (req, res, next) => {
  bannerDb.deleteData(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

banners.deleteall = (req, res, next) => {
  bannerDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}