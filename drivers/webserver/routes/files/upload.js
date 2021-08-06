const multer = require("multer");
const fs = require('fs');
const path = require("path");
const helpers = require("./helpers");
const config = require("../../../../config/index");

let upload = module.exports = {};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var saveDir = req.params.folderName || "data";
        var ifExistDir = './public/uploads/' + saveDir;
        
        if (!fs.existsSync(ifExistDir)) {
        	fs.mkdirSync(ifExistDir, {
        		recursive: true
        	});
        }
        cb(null, ifExistDir);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        console.log("Filename", config.app.FILE + '-' + Date.now() + path.extname(file.originalname));
        cb(null, config.app.FILE + '-' + Date.now() + path.extname(file.originalname));
    }
});

upload.index = (req, res, next) => {

    // 'uploaded_file' is the name of our file input field in the HTML form
    let uploadWithMulter = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('uploaded_file');

    uploadWithMulter(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.json({
                status: "FAIL",
                message: req.fileValidationError
            });
        }
        else if (!req.file) {
            return res.json({
                status: "FAIL",
                message: "Please select an image to upload"
            });
        }
        else if (err instanceof multer.MulterError) {
            return res.json({
                status: "FAIL",
                message: err
            });
        }
        else if (err) {
            return res.json({
                status: "FAIL",
                message: err
            });
        }

        // Display uploaded image for user validation
        res.json({
            status: "SUCCESS",
            message: "Successful upload file",
            data: req.file
        });

    });
}

upload.multiUpload = (req, res, next) => {

    // 10 is the limit I've defined for number of uploaded files at once
    // 'uploaded_files' is the name of our file input field
    let uploadWithMulter = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('uploaded_files', 10);

    uploadWithMulter(req, res, function(err) {
        if (req.fileValidationError) {
            return res.json({
                status: "FAIL",
                message: req.fileValidationError
            });
        }
        else if (!req.files) {
            return res.json({
                status: "FAIL",
                message: "Please select an image to upload"
            });
        }
        else if (err instanceof multer.MulterError) {
            return res.json({
                status: "FAIL",
                message: err
            });
        }
        else if (err) {
            return res.json({
                status: "FAIL",
                message: err
            });
        }

        // Display uploaded image for user validation
        res.json({
            status: "SUCCESS",
            message: "Successful upload files",
            data: req.files
        });
    });
}




