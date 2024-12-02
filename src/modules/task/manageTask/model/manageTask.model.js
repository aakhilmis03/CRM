const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
      taskType: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        // required: true,
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

  taskSchema.pre("save", async function (next) {
    const user = this;
  
      try {
        const lastStudent = await mongoose
          .model("ManageTask")
          .findOne()
          .sort({ createdAt: -1 });
  
        let newId = "WT0001";
  
        if (lastStudent && lastStudent.id) {
          const lastIdNum = parseInt(lastStudent.id.replace("WT", ""));
          const nextIdNum = lastIdNum + 1;
  
          newId = `WT${nextIdNum.toString().padStart(4, "0")}`;
        }
  
        user.id = newId;
        next();
      } catch (err) {
        next(err);
      }
  });

  const Task = mongoose.model("ManageTask", taskSchema);
  module.exports = Task;
