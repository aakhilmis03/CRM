const TaskCategory = require("../model/category.model");

// Create a new task category
exports.createTaskCategory = async (taskName, description, status) => {
  const newCategory = await TaskCategory.create({ taskName, description, status });
  return newCategory;
};

// Get all task categories
exports.getAllTaskCategories = async () => {
  const categories = await TaskCategory.find().sort({ createdAt: -1 });
  return categories;
};

// Update a task category
exports.updateTaskCategoryById = async (id, taskName, description, status) => {
  const updatedCategory = await TaskCategory.findByIdAndUpdate(
    id,
    { taskName, description, status },
    { new: true }
  );
  return updatedCategory;
};

// Delete a task category
// exports.deleteTaskCategoryById = async (id) => {
//   await TaskCategory.findByIdAndDelete(id);
//   return { message: "Task Category deleted successfully" };
// };

exports.deleteTaskCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskCategory.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Task Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTaskCategory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.getTaskCategoryByName = async (taskName) => {
  return await TaskCategory.findOne({ taskName }); // Find the task category by name
};