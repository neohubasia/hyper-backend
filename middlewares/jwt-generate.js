const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = async (req, res) => {
  const { username, password } = req.body;
  // For the given username fetch user from DB
  const mockedUsername = config.jwt.credential.USERNAME;
  const mockedPassword = config.jwt.credential.PASSWORD;

  const checkCredential =
    username === mockedUsername && password === mockedPassword ? true : false;

  if (checkCredential) {
    // return the JWT token for the future API calls
    const token = generateTokenSign(username);
    res.json({
      status: "SUCCESS",
      message: "Authentication successful!",
      token: token,
    });
  } else {
    res.json({
      status: "FAIL",
      message: "Authentication is failed!",
    });
  }
};

const generateTokenSign = (username) => {
  return jwt.sign({ username: username }, config.jwt.SECRET, {
    expiresIn: "24h", // dev: expires in 24 hours
  });
};

// Gen Token Route
router.post("/u-bar", generateToken);

module.exports.generateTokenSign = generateTokenSign;
module.exports.tokenRouter = router;
