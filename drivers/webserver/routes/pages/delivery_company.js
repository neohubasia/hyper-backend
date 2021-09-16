const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
const { Handlers } = require('../../../../middlewares/generator');
let DeliveryCompaniesDb = require('../../../../controllers/delivery_company');

router.get('/delivery-companies',
    connect.ensureLoggedIn(),
    (req, res, next) => {
        res.render('pages/delivery-company-list', {
            ...menuAccess.getProgram(req.user.role, "deliveryMenu.deliCompanySubMenu.list"), // admin may change on req.user => role
            token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
            app: config.app
        });
    }
);

router.get('/delivery-company/:id?',
    connect.ensureLoggedIn(),
    async (req, res, next) => {
        let data = {};
        if (req.params.id)
            data = await DeliveryCompaniesDb.findData('id', req.params.id);

        res.render('pages/delivery-company-entry', {
            ...menuAccess.getProgram(req.user.role, "deliveryMenu.deliCompanySubMenu.entry"), // admin may change on req.user => role
            token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
            app: config.app,
            data: data
        });
    }
)

    .post('/delivery-company',
        (req, res, next) => {

            let db, status = "FAIL";
            let remove_images = req.body.remove_images || [];
            req.body.company_logo = req.body.company_logo || "";

            if (remove_images && remove_images.length > 0) {
                remove_images.map((file, fileIdx) => {
                    // console.log(file.replace(/\\/g, "/"));
                    // fs.unlinkSync(file.replace(/\\/g, "/"));

                    fs.unlink('./public' + file.replace(/\\/g, "/"), function (err) {
                        if (err)
                            console.error("File Unlink Error", err);
                        else
                            console.log(fileIdx, 'File has been Deleted');
                    });
                });
            }

            if (!req.body.id) { // insert data 
                db = DeliveryCompaniesDb.addData(req.body);
            }
            else { // update data
                const id = req.body.id;
                const { ['id']: removed, ...data } = req.body;
                db = DeliveryCompaniesDb.updateData(req.body.id, data);
            }
            db.then(result => {
                if (result != null)
                    status = "SUCCESS"
                res.json({ status: status, data: result });
            })
                .catch(error => {
                    console.log(`Error ${error}`);
                    res.json({ status: status, data: error });
                });
        }
    );

module.exports = router;