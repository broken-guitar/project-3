const router = require("express").Router();
const usersRoutes = require("./login.route");

// User Login Routes
// matches: /loginPage/login
router.use("/login", usersRoutes);

module.exports = router;
