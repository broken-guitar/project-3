const router = require("express").Router();
const loginController = require("../../controllers/loginControllers");

// matches with "loginPage/login/createUser"
router.route("/createUser").post(loginController.createUser);

// matches with "loginPage/login/login"
router.route("/login").post(loginController.userLogin);

// matches with "loginPage/login/checkUser"
router.route("/checkUser").post(loginController.checkUser);


module.exports = router;