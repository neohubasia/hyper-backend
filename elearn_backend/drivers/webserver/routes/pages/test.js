const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');

const program = require("../../../../config/program.json")

router.get('/test',
    (req, res, next) => {
        res.render('includes/layout-main', { program: program });
    }
);

module.exports = router;
