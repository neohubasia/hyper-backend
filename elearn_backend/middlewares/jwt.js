let jwt = require('jsonwebtoken');
const config = require('../config');

let checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  console.log("Req header ", req.headers)
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, config.jwt.SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }
  else {
    return res.json({
      success: false,
      message: 'Auth token is exactly required'
    });
  }
};

module.exports = {
  checkToken: checkToken
}