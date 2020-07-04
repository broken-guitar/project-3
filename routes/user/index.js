const router = require("express").Router();
const usersRoutes = require("./user.route");
const taskRoutes = require("../task/task.route");

// *** User Login Routes

//  matches: /API/getUser
router.use("/getUser", usersRoutes);

// matches "API/task"
router.use("/task", taskRoutes);

module.exports = router;
