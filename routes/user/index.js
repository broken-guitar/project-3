const router = require("express").Router();
const usersRoutes = require("./user.route");

// User Login Routes
// matches: /API/getUser
router.use("/getUser", usersRoutes);

module.exports = router;
