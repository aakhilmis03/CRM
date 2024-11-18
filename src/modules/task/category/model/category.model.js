// models/taskCategoryModel.js
const mongoose = require("mongoose");

const taskCategorySchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Enable", "Disable"],
      default: "Enable",
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("TaskCategory", taskCategorySchema);
const TaskCategory = mongoose.model("TaskCategory", taskCategorySchema);
module.exports = TaskCategory;
