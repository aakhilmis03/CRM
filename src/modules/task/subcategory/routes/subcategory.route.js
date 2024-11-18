const express = require("express");
const router = express.Router();
const taskSubCategoryController = require("../controller/subcategory.controller");

// Add a subtask category
router.post("/add", taskSubCategoryController.addSubCategory);

// Get subcategories by task category ID
router.get("/:taskCategoryId", taskSubCategoryController.getSubCategoriesByCategory);
router.get("/task/", taskSubCategoryController.getSubCategoriesByTaskName);

// Update a subtask category
router.put("/update/:id", taskSubCategoryController.updateSubCategory);

// Delete a subtask category
router.delete("/delete/:id", taskSubCategoryController.deleteSubCategory);

module.exports = router;
