let ProgramAccess = require("../../../../config/program-access.json");

let userRoles = (module.exports = {});

userRoles.index = (req, res, next) => {
  try {
    res.json({
      status: "SUCCESS",
      data: JSON.parse(JSON.stringify(ProgramAccess)),
    });
  } catch (error) {
    console.log(`Error ${error}`);
    res.json({
      status: "FAIL",
      data: error,
    });
  }
};
