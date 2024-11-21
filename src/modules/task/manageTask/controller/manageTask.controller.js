const Task = require("../model/manageTask.model");

// Add Task
exports.addTask = async (req, res) => {
  try {
    const { taskType, category, subcategory, title, startDate, endDate, priority, AssignedTo, webUrl, taskDescription } = req.body;

    if (!taskType || !category || !subcategory || !title || !startDate || !endDate || !AssignedTo || !webUrl || !taskDescription) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newTask = await Task.create({
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
    });

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error in addTask:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Tasks with Status
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("category")
      .populate("subcategory")
      .populate("AssignedTo", "staffId name");

    const currentDate = new Date();

    const taskCounts = {
      open: 0,
      inProgress: 0,
      closed: 0,
    };

    tasks.forEach((task) => {
      if (task.startDate <= currentDate && task.endDate >= currentDate) {
        task.status = "In Progress";
        taskCounts.inProgress++;
      } else if (task.endDate < currentDate) {
        task.status = "Closed";
        taskCounts.closed++;
      } else {
        taskCounts.open++;
      }
    });

    res.status(200).json({ success: true, tasks, taskCounts });
  } catch (error) {
    console.error("Error in getTasks:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Multiple Tasks
exports.deleteTasks = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No task IDs provided" });
    }

    await Task.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ success: true, message: "Tasks deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTasks:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
