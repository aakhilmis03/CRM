const mongoose = require("mongoose");
const TaskCategory = require("../../category/model/category.model")
const taskSubCategorySchema = new mongoose.Schema(
  {
    taskCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"TaskCategory",
      required: true,
    },
    subCategoryName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Enable", "Disable"],
      default: "Enable",
    },
  },
  { timestamps: true }
);

const TaskSubCategory = mongoose.model("TaskSubCategory", taskSubCategorySchema);
module.exports = TaskSubCategory;
