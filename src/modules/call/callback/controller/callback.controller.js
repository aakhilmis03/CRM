const Call = require("../model/callback.model"); // Assuming you have a Call model

// Update Call Data
exports.updateCallData = async (req, res) => {
  try {
    const { callbackDate, callbackTime, remarks, status } = req.body;

    // Validate required fields
    if (!callbackDate || !callbackTime || !remarks || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate status
    const validStatuses = ["scheduled", "rescheduled", "done", "cancel"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Create a new call record
    const newCall = new Call({
      callbackDate,
      callbackTime,
      remarks,
      status,
    });

    await newCall.save();

    res.status(201).json({ success: true, message: "Call data updated successfully", data: newCall });
  } catch (error) {
    console.error("Error in updateCallData:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateCallbackData = async (req, res) => {
  try {
    const { _id, callbackDate, callbackTime, remarks, status } = req.body;

    // Validate the ID
    if (!_id) {
      return res.status(400).json({ success: false, message: "Callback ID is required" });
    }

    // Validate status (optional validation based on provided status)
    const validStatuses = ["scheduled", "rescheduled", "done", "cancel"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Find the existing callback record
    const existingCallback = await Call.findById(_id);
    if (!existingCallback) {
      return res.status(404).json({ success: false, message: "Callback not found" });
    }

    // Update only the fields provided
    if (callbackDate) existingCallback.callbackDate = callbackDate;
    if (callbackTime) existingCallback.callbackTime = callbackTime;
    if (remarks) existingCallback.remarks = remarks;
    if (status) existingCallback.status = status;

    // Save the updated callback
    await existingCallback.save();

    res.status(200).json({ success: true, message: "Callback data updated successfully", data: existingCallback });
  } catch (error) {
    console.error("Error in updateCallbackData:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};