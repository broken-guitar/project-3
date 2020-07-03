const router = require("express").Router();
const taskRoutes = require("./task.route");

// matches "/task/"
router.use("/s", taskRoutes);


module.exports = router;
