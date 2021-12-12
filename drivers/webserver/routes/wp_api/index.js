const express = require("express");
const router = express.Router();

// api routing
const web_push = require("./web_push");

router.post("/hyper_web_push", web_push.index);

module.exports = router;
