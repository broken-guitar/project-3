const router = require("express").Router();
const usersRoutes = require("./user");

// User Login Routes
router.use("/login", usersRoutes);

module.exports = router;
