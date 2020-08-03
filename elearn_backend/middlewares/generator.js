const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
let config = require('../config');
let _jwt = require('./jwt');

class HandleGenerator {
  generateToken (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = config.jwt.issue.USERNAME;
    let mockedPassword = config.jwt.issue.PASSWORD;

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.jwt.SECRET,
          { 
            expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Welcome JWT Token'
    });
  }
}

let handlers = new HandleGenerator();
router.post('/htokebar', handlers.generateToken); // Routes & Handlers
  
module.exports = router;

