const mongoose = require("mongoose");

const callSchema = new mongoose.Schema(
  {
    callbackDate: {
      type: Date,
      required: true,
    },
    callbackTime: {
      type: String, // You can use String or Date depending on your requirement
      required: true,
    },
    remarks: {
      type: String,
    },
    status: {
      type: String,
      enum: ["scheduled", "rescheduled", "done", "cancel"],
      required: true,
    },
  },
  { timestamps: true }
);

const Call = mongoose.model("Call", callSchema);
module.exports = Call;