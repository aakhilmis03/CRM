// routes/taskCategoryRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../../../../middleware/authmiddleware");
const taskCategoryController = require("../controller/category.controller");

// Routes
router.post("/add", verifyToken, taskCategoryController.addTaskCategory);
router.get("/", verifyToken, taskCategoryController.getTaskCategories);
router.put("/:id", verifyToken, taskCategoryController.updateTaskCategory);
router.delete("/:id", verifyToken, taskCategoryController.deleteTaskCategory);

module.exports = router;
