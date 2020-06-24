const router = require("express").Router();
const loginController = require("../../controllers/loginControllers");


// matches with "API/getUser/:userId
router.route("/:userId").get(loginController.getUsername);


module.exports = router;
