const taskSubCategoryService = require("../buisness/subcategory.buisness");
const taskCategoryService= require("../../category/buisness/category.buisness");



const TaskSubCategory = require("../model/subcategory.model");
const {isValid} = require("../../../../middleware/validator")

exports.addSubCategory = async (req, res) => {
  try {
    const { taskCategoryId, subCategoryName, status } = req.body; // Change to taskName

    if (!taskCategoryId || !subCategoryName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newSubCategory = await taskSubCategoryService.createSubCategory(
      taskCategoryId, // Use the found taskCategoryId
      subCategoryName,
      status
    );

    res.status(201).json({ success: true, data: newSubCategory });
  } catch (error) {
    console.error("Error in addSubCategory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Subcategories by Task Category ID
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const { taskCategoryId } = req.query;
let filter = {}
    if (isValid(taskCategoryId)) filter.taskCategoryId = taskCategoryId

    // If task category is found, fetch the associated subcategories
    const subcategories = await TaskSubCategory.find(filter)
    .populate("taskCategoryId")
    .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: subcategories.length, data: subcategories });
  } catch (error) {
    console.error("Error in getSubCategoriesByCategory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a Subtask Category
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subCategoryName, status } = req.body;

    if (!subCategoryName || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const updatedSubCategory = await taskSubCategoryService.updateSubCategory(
      id,
      subCategoryName,
      status
    );

    res.status(200).json({ success: true, data: updatedSubCategory });
  } catch (error) {
    console.error("Error in updateSubCategory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a Subtask Category
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.query;
    if (!isValid(id)) {
      return res.status(400).json({ success: false, message: "Missing required field" });
    }

    const deleteSubCategory = await TaskSubCategory.findByIdAndDelete(id);
    
    res.status(200).json({ success: true, message: "Subtask Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSubCategory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
