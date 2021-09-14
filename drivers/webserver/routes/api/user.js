let usersDb = require('../../../../controllers/users');

let users = module.exports = {};

users.index = (req, res, next) => {
  usersDb.listUsers()
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

users.show = (req, res, next) => {
  usersDb.findUser('id', req.params.id)
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

users.showby = (req, res, next) => {
  usersDb.findUserBy(req.query)
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

users.create = (req, res, next) => {
  usersDb.addUser(req.body)
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

users.update = (req, res, next) => {
  usersDb.updateUser(req.params.id, req.body)
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

users.delete = (req, res, next) => {
  usersDb.deleteUser(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}
