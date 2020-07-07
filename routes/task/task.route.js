const router = require("express").Router();
const taskController = require("../../controllers/taskController");

// get all user's tasks; matches "/API/task/"
router.route("/:userId").get(taskController.findUsersTasks);

// add new task; matches matches "API/task/"
router.route("/").post(taskController.addTask);

// matches "API/task/:taskId"
router.route("/:taskId").put(taskController.updateTask);

// matches "API/task/:taskId"
router.route("/:taskId").delete(taskController.deleteTask);

module.exports = router;