const router = require("express").Router();
const resourceController = require("../../controllers/resourceController");

// get all user's tasks; matches "/task/:userId"
router.route("/:userId").get(taskController.findAll);

// get task by id; matches "task/:taskId"
router.route("/:taskId").get(taskController.findById);