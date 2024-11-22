const express = require("express");
const router = express.Router();
const taskController = require("../controller/manageTask.controller");
const verifyToken = require("../../../../middleware/authmiddleware"); // Protect the route

// Add a task
router.post("/add", verifyToken, taskController.addTask);
router.get("/get", verifyToken, taskController.getTasks);
router.put("/updateStatus", verifyToken, taskController.updateTaskStatus);
router.delete("/delete", verifyToken, taskController.deleteTasks);

module.exports = router;