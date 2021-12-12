let UsersDb = require("../../../../controllers/user");

let users = (module.exports = {});

users.index = (req, res, next) => {
  UsersDb.listUsers()
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

users.show = (req, res, next) => {
  UsersDb.findUser("id", req.params.id)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

users.showby = (req, res, next) => {
  UsersDb.findUserBy(req.query)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

users.create = (req, res, next) => {
  UsersDb.addUser(req.body)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

users.update = (req, res, next) => {
  UsersDb.updateUser(req.params.id, req.body)
    .then((data) => {
      res.json({
        status: "SUCCESS",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.json({
        status: "FAIL",
        data: err,
      });
    });
};

users.delete = (req, res, next) => {
  UsersDb.deleteUser(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
