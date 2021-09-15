let customersDb = require('../../../../controllers/customer');
let Customer = require('../../../../database/mongodb/models/customer')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let config = require('../../../../config/index')
let customers = module.exports = {};

customers.create = (req, res, next) => {
  customersDb.addData(req.body)
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

customers.login = (req, res, next) => {
  Customer.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.send({
      status: 500, auth: false, token: null
    });

    if (!user) return res.send({
      status: 404, auth: false, token: null
    });

    //after we found data with email, we crypt password and check with user pw
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.send({ status: 401, auth: false, token: null });
    }

    //if password valid jwt need to produce token with our secrep
    var token = jwt.sign({ id: user._id }, config.jwt.SECRET, {
      expiresIn: 86400 //seconds expires in 24hrs 
    });

    res.status(200).send({
      auth: true, user: user, token: token
    });
  });
}

customers.read = (req, res, next) => {
  Customer.find({ _id: req.params.id })
    .then(customer => {
      res.json({
        status: "SUCCESS",
        data: customer
      });
    }).catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

customers.update = (req, res, next) => {
  customersDb.updateData(req.params.id, req.body)
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

// customers.delete = (req, res, next) => {
//   customersDb.deleteData(req.params.id)
//     .then(data => {
//       res.send(data)
//     })
//     .catch(next);
// }