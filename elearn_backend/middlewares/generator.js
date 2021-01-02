const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
let config = require('../config');
let _jwt = require('./jwt');

class HandleGenerator {
  async generateToken (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = config.jwt.credential.USERNAME;
    let mockedPassword = config.jwt.credential.PASSWORD;

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = new HandleGenerator().generateTokenSign(username);
        // return the JWT token for the future API calls
        res.json({
          status: "SUCCESS",
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.json({
          status: "FAIL",
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.json({
        status: "FAIL",
        message: 'Authentication failed! Please check the request'
      });
    }
  }

  index (req, res) {
    res.json({
      status: "FAIL",
      message: 'Welcome JWT Token'
    });
  }

  generateTokenSign(username) {
    return jwt.sign({ username: username },
      config.jwt.SECRET, { 
        expiresIn: '24h' // expires in 24 hours
      }
    );
  }
}

let handlers = new HandleGenerator();
router.post('/u-bar', handlers.generateToken); // Routes & Handlers

module.exports.Handlers = handlers;
module.exports.tokenRouter = router;

