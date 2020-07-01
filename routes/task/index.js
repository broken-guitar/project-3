const router = require("express").Router();
const resourceRoutes = require("./task.route");

// matches "/tasks"
router.use("/task", taskRoutes);

module.exports = router;
