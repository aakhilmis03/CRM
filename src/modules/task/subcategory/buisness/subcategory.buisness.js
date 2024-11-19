const TaskSubCategory = require("../model/subcategory.model");

// Create a new subtask category
exports.createSubCategory = async (taskCategoryId, subCategoryName, status) => {
  return await TaskSubCategory.create({
    taskCategoryId,
    subCategoryName,
    status,
  });
};

// Fetch subcategories by task category ID
exports.getSubCategoriesByCategory = async (taskCategoryId) => {
  try {
  

    // If task category is found, fetch the associated subcategories
    const subcategories = await TaskSubCategory.find({ taskCategoryId: taskCategoryId })
    .populate("taskCategoryId")
    .sort({ createdAt: -1 });

    return subcategories;
  } catch (error) {
    console.error("Error fetching subcategories by task name:", error.message);
    throw error; // Rethrow the error for the controller to handle
  }
};

// Update a subtask category
exports.updateSubCategory = async (id, subCategoryName, status) => {
  return await TaskSubCategory.findByIdAndUpdate(
    id,
    { subCategoryName, status },
    { new: true }
  );
};

// Delete a subtask category
exports.deleteSubCategory = async (id) => {
  return await TaskSubCategory.findByIdAndDelete(id);
};
