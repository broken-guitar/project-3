const router = require("express").Router();
const taskController = require("../../controllers/taskController");

// get all user's tasks; matches "/task/s/"
router.route("/").get(taskController.findUsersTasks);

// add new task; matches matches "/task/s/"
router.route("/").post(taskController.addTask);

module.exports = router;