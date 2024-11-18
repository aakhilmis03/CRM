const taskSubCategoryService = require("../buisness/subcategory.buisness");
const taskCategoryService= require("../../category/buisness/category.buisness");
// Add a Subtask Category
// exports.addSubCategory = async (req, res) => {
//   try {
//     const { taskCategoryId, subCategoryName, status } = req.body;

//     if (!taskCategoryId || !subCategoryName) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const newSubCategory = await taskSubCategoryService.createSubCategory(
//       taskCategoryId,
//       subCategoryName,
//       status
//     );

//     res.status(201).json({ success: true, data: newSubCategory });
//   } catch (error) {
//     console.error("Error in addSubCategory:", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

exports.addSubCategory = async (req, res) => {
  try {
    const { taskCategoryId, subCategoryName, status } = req.body; // Change to taskName

    if (!taskCategoryId || !subCategoryName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Get taskCategoryId based on taskName
    // const taskCategory = await taskCategoryService.getTaskCategoryByName(taskName); // New function to get category by name
    // if (!taskCategory) {
    //   return res.status(404).json({ success: false, message: "Task category not found" });
    // }

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
    const { taskCategoryId } = req.params;

    if (!taskCategoryId) {
      return res.status(400).json({ success: false, message: "Task category ID is required" });
    }

    const subCategories = await taskSubCategoryService.getSubCategoriesByCategory(taskCategoryId);

    res.status(200).json({ success: true, count: subCategories.length, data: subCategories });
  } catch (error) {
    console.error("Error in getSubCategoriesByCategory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Subcategories by Task Name
exports.getSubCategoriesByTaskName = async (req, res) => {
  try {
    const { taskName } = req.body; // Get taskName from the request body

    if (!taskName) {
      return res.status(400).json({ success: false, message: "Task name is required" });
    }

    console.log("Fetching subcategories for task name:", taskName); // Log the task name

    // Use the new service function to get subcategories by task name
    const subCategories = await taskSubCategoryService.getSubCategoriesByTaskName(taskName);
    
    if (!subCategories || subCategories.length === 0) {
      return res.status(404).json({ success: false, message: "No subcategories found for this task name" });
    }

    res.status(200).json({ success: true, count: subCategories.length, data: subCategories });
  } catch (error) {
    console.error("Error in getSubCategoriesByTaskName:", error); // Log the entire error object
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
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
    const { id } = req.params;

    await taskSubCategoryService.deleteSubCategory(id);
    res.status(200).json({ success: true, message: "Subtask Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSubCategory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
