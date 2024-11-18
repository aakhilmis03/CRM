// const TaskSubCategory = require("../model/subcategory.model");

// // Create a new subtask category
// exports.createSubCategory = async (taskCategoryId, subCategoryName, status) => {
//   return await TaskSubCategory.create({
//     taskCategoryId,
//     subCategoryName,
//     status,
//   });
// };

// // Fetch subcategories by task category ID
// exports.getSubCategoriesByCategory = async (taskCategoryId) => {
//   return await TaskSubCategory.find({ taskCategoryId }).sort({ createdAt: -1 });
// };

// // Update a subtask category
// exports.updateSubCategory = async (id, subCategoryName, status) => {
//   return await TaskSubCategory.findByIdAndUpdate(
//     id,
//     { subCategoryName, status },
//     { new: true }
//   );
// };

// // Delete a subtask category
// exports.deleteSubCategory = async (id) => {
//   return await TaskSubCategory.findByIdAndDelete(id);
// };


const TaskSubCategory = require("../model/subcategory.model");
const TaskCategory = require("../../category/model/category.model"); // Import the TaskCategory model

// Create a new subtask category
exports.createSubCategory = async (taskCategoryId, subCategoryName, status) => {
  return await TaskSubCategory.create({
    taskCategoryId,
    subCategoryName,
    status,
  });
};

// Fetch subcategories by task category ID
exports.getSubCategoriesByTaskName = async (taskName) => {
  try {
    // Get the task category based on the task name
    const taskCategory = await TaskCategory.findOne({ name: taskName });
    if (!taskCategory) {
      throw new Error("Task category not found"); // More explicit error
    }

    // If task category is found, fetch the associated subcategories
    const subcategories = await TaskSubCategory.find({ taskCategoryId: taskCategory._id }).sort({ createdAt: -1 });
    return subcategories;
  } catch (error) {
    console.error("Error fetching subcategories by task name:", error.message);
    throw error; // Rethrow the error for the controller to handle
  }
};


// Fetch subcategories by task name
exports.getSubCategoriesByTaskName = async (taskName) => {
  try {
    console.log("Searching for task category with name:", taskName); // Log the task name being searched
    const taskCategory = await TaskCategory.findOne({ name: taskName });
    if (!taskCategory) {
      throw new Error("Task category not found"); // More explicit error
    }

    console.log("Found task category:", taskCategory); // Log the found task category

    // If task category is found, fetch the associated subcategories
    const subcategories = await TaskSubCategory.find({ taskCategoryId: taskCategory._id }).sort({ createdAt: -1 });
    return subcategories;
  } catch (error) {
    console.error("Error fetching subcategories by task name:", error); // Log the error
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
