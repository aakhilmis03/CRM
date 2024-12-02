const { isValid } = require("../../../../middleware/validator");
const Task = require("../model/manageTask.model");
const mongoose = require("mongoose");

// Add Task
exports.addTask = async (req, res) => {
  try {
    const {
      taskType,
      category,
      subcategory,
      title,
      startDate,
      endDate,
      priority,
      AssignedTo,
      webUrl,
      taskDescription,
    } = req.body;

    if (
      !taskType ||
      !category ||
      !subcategory ||
      !title ||
      !startDate ||
      !endDate ||
      !AssignedTo ||
      !webUrl ||
      !taskDescription
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newTask = await Task.create(
      req.body
    //   {
    //   taskType,
    //   category,
    //   subcategory,
    //   title,
    //   startDate,
    //   endDate,
    //   priority,
    //   AssignedTo,
    //   webUrl,
    //   taskDescription,
    // }
  );

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error in addTask:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Tasks with Status
// exports.getTasks = async (req, res) => {
//   try {
//     const { key } = req.body;

//     // Initialize an empty filter object
//     const filterConditions = {};
//     if (isValid(key)) {
//       filterConditions.$or = [
//         { title: { $regex: key, $options: "i" } },
//         { subCategoryName: { $regex: key, $options: "i" } },
//         { categoryName: { $regex: key, $options: "i" } },
//       ];
//     }

//     // Log the filter conditions for debugging
//     console.log("Filter Conditions:", filterConditions);

//     // Fetch tasks based on the provided filter
//     let tasks = await Task.aggregate([
//       // Look up category information
//       {
//         $lookup: {
//           from: "taskcategories",
//           localField: "category",
//           foreignField: "_id",
//           as: "category",
//         },
//       },
//       {
//         $addFields: {
//           category: { $ifNull: [{ $arrayElemAt: ["$category", 0] }, {}] }, // Extract category info
//           categoryName: { $ifNull: [{ $arrayElemAt: ["$category.taskName", 0] }, ""] }, // Extract category name
//         },
//       },
//       // Look up subcategory information
//       {
//         $lookup: {
//           from: "tasksubcategories",
//           localField: "subcategory",
//           foreignField: "_id",
//           as: "subcategory",
//         },
//       },
//       {
//         $addFields: {
//           subcategory: { $ifNull: [{ $arrayElemAt: ["$subcategory", 0] }, {}] }, // Extract subcategory info
//           subCategoryName: { $ifNull: [{ $arrayElemAt: ["$subcategory.subCategoryName", 0] }, ""] }, // Extract subcategory name
//         },
//       },
//       // Match tasks based on filter conditions (search by category, subcategory, title)
//       {
//         $match: filterConditions,
//       },
//       // Look up assigned staff details
//       {
//         $lookup: {
//           from: "staffs",
//           localField: "AssignedTo",
//           foreignField: "_id",
//           as: "AssignedTo",
//         },
//       },
//       {
//         $addFields: {
//           AssignedTo: { $ifNull: [{ $arrayElemAt: ["$AssignedTo", 0] }, {}] }, // Extract assigned staff info
//         },
//       },
//       // Filter tasks that have status "Close"
//       {
//         $match: {
//           status: "Close", // Only return tasks that are "Close"
//           // status: "Open",
//           // status: "InProgress",
//         },
//       },
//     ]);

//     // Fetch task counts for all statuses (open, in progress, close)
//     const taskCounts = await Task.aggregate([
//       {
//         $group: {
//           _id: "$status", // Group by task status
//           count: { $sum: 1 }, // Count tasks for each status
//         },
//       },
//       {
//         $sort: { "_id": 1 }, // Optional sorting by status order
//       },
//     ]);

//     res.status(200).json({ success: true, taskCounts, tasks });
//   } catch (error) {
//     console.error("Error in getTasks:", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

exports.getTasks = async (req, res) => {
  try {
    const { key, status } = req.body;

    // Initialize an empty filter object
    const filterConditions = {};
    
    // Apply search filters (if key is provided)
    if (isValid(key)) {
      filterConditions.$or = [
        { title: { $regex: key, $options: "i" } },
        { subCategoryName: { $regex: key, $options: "i" } },
        { categoryName: { $regex: key, $options: "i" } },
      ];
    }

    // Apply status filter (if status is provided)
    if (status) {
      filterConditions.status = status; // Filter tasks based on the provided status
    }

    // Log the filter conditions for debugging
    console.log("Filter Conditions:", filterConditions);

    // Fetch tasks based on the provided filter
    let tasks = await Task.aggregate([
      // Look up category information
      {
        $lookup: {
          from: "taskcategories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: { $ifNull: [{ $arrayElemAt: ["$category", 0] }, {}] }, // Extract category info
          categoryName: { $ifNull: [{ $arrayElemAt: ["$category.taskName", 0] }, ""] }, // Extract category name
        },
      },
      // Look up subcategory information
      {
        $lookup: {
          from: "tasksubcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $addFields: {
          subcategory: { $ifNull: [{ $arrayElemAt: ["$subcategory", 0] }, {}] }, // Extract subcategory info
          subCategoryName: { $ifNull: [{ $arrayElemAt: ["$subcategory.subCategoryName", 0] }, ""] }, // Extract subcategory name
        },
      },
      // Match tasks based on filter conditions (search by category, subcategory, title, or status)
      {
        $match: filterConditions,
      },
      // Look up assigned staff details
      {
        $lookup: {
          from: "staffs",
          localField: "AssignedTo",
          foreignField: "_id",
          as: "AssignedTo",
        },
      },
      {
        $addFields: {
          AssignedTo: { $ifNull: [{ $arrayElemAt: ["$AssignedTo", 0] }, {}] }, // Extract assigned staff info
        },
      },
    ]);

    // Fetch task counts for all statuses (open, in progress, close)
    const taskCounts = await Task.aggregate([
      {
        $group: {
          _id: "$status", // Group by task status
          count: { $sum: 1 }, // Count tasks for each status
        },
      },
      {
        $sort: { "_id": 1 }, // Optional sorting by status order
      },
    ]);

    res.status(200).json({ success: true, taskCounts, tasks });
  } catch (error) {
    console.error("Error in getTasks:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//update the status

exports.updateTaskStatus = async (req, res) => {
  try {
    const { tasks_id, status } = req.body;

    if (!tasks_id || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      tasks_id,
      { status },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res
      .status(404)
      .json({ success: true, message: "Task  found", task: updatedTask });
  } catch (error) {
    console.error("Error in updateTaskStatus:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Multiple Tasks
exports.deleteTasks = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No task IDs provided" });
    }

    await Task.deleteMany({ _id: { $in: ids } });

    res
      .status(200)
      .json({ success: true, message: "Tasks deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTasks:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
