const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
const menuAccess = require("../../../../librarys/menu-access");
let UsersDb = require("../../../../controllers/user");

router.get("/getuser", connect.ensureLoggedIn(), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send({ user: req.user });
});

router.get("/users", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/user-list", {
    ...menuAccess.getProgram(req.user.role, "adminMenu.userSubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get("/user/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await UsersDb.findUser("id", req.params.id);

    res.render("pages/user-entry", {
      ...menuAccess.getProgram(req.user.role, "adminMenu.userSubMenu.entry"), // admin may change on req.user => role
      token: generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data,
    });
  })
  .post("/user", (req, res, next) => {
    let db,
      status = "FAIL";

    if (!req.body.id) {
      // insert data
      db = UsersDb.addUser(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = UsersDb.updateUser(req.body.id, data);
    }
    db.then((result) => {
      if (result != null) status = "SUCCESS";
      res.json({ status: status, data: result });
    }).catch((error) => {
      console.log(`Error ${error}`);
      res.json({ status: status, data: error });
    });
  });

module.exports = router;
