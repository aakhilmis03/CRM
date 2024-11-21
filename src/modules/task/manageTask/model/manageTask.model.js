const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
      taskType: {
        type: String,
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskCategory",
        required: true,
      },
      subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSubCategory",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
      },
      AssignedTo:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
      }],
      webUrl: {
        type: String,
        required: true,
      },
      taskDescription: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["Open", "In Progress", "Closed","Hold Task"],
        default: "Open",
      },
    },
    { timestamps: true }
  );
  const Task = mongoose.model("ManageTask", taskSchema);
  module.exports = Task;
