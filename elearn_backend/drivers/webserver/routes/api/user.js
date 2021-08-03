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
