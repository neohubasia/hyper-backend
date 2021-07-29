var multer = require("multer");
var fs = require('fs');
var path = require("path");
var helpers = require("./helpers");
var config = require("../../../../config/index");

let deleteFile = module.exports = {};

deleteFile.index = (req, res, next) => {
    console.log(req.data)
    console.log(req.params)
}
