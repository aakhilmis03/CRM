const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    meetingDate: {
      type: Date,
      required: true,
    },
    meetingTime: {
      type: String, // Format: --:--
      required: true,
    },
    meetingType: {
      type: String,
      enum: ["Offline", "Online"], // Add more types if needed
      required: true,
    },
    meetingLink: {
      type: String,
      required: function() {
        return this.meetingType === "Online"; // Required only for online meetings
      },
    },
    meetingVenue: {
      type: String,
      required: function() {
        return this.meetingType === "Offline"; // Required only for offline meetings
      },
    },
    remarks: {
      type: String,
      maxlength: 70, // Limit to 70 words
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"], // Define possible statuses
      required: true,
    },
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;