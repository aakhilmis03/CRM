const taskCategoryService = require("../buisness/category.buisness");

// Add Task Category
exports.addTaskCategory = async (req, res) => {
  try {
    const { taskName, description, status } = req.body;
    const newCategory = await taskCategoryService.createTaskCategory(taskName, description, status);
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("Error in addTaskCategory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Task Categories
exports.getTaskCategories = async (req, res) => {
  try {
    const categories = await taskCategoryService.getAllTaskCategories();
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    console.error("Error in getTaskCategories:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update Task Category
exports.updateTaskCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, description, status } = req.body;
    const updatedCategory = await taskCategoryService.updateTaskCategoryById(id, taskName, description, status);
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("Error in updateTaskCategory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Task Category
exports.deleteTaskCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskCategoryService.deleteTaskCategoryById(id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error("Error in deleteTaskCategory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
