const router = require("express").Router();
const usersRoutes = require("./users");

// User Login Routes
router.use("/login", usersRoutes);

module.exports = router;
