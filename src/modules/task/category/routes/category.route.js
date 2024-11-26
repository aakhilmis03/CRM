// routes/taskCategoryRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../../../../middleware/authmiddleware");
const taskCategoryController = require("../controller/category.controller");

// Routes
router.post("/add", taskCategoryController.addTaskCategory);
router.get("/", taskCategoryController.getTaskCategories);
router.put("/:id", taskCategoryController.updateTaskCategory);
router.delete("/:id", taskCategoryController.deleteTaskCategory);

module.exports = router;
