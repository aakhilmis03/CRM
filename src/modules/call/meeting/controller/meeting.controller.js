const Meeting = require("../model/meeting.model");

// Create Meeting
exports.createMeeting = async (req, res) => {
  try {
    const { meetingDate, meetingTime, meetingType, meetingLink, meetingVenue, remarks, status } = req.body;

    // Validate required fields
    if (!meetingDate || !meetingTime || !meetingType || !remarks || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create a new meeting record
    const newMeeting = new Meeting({
      meetingDate,
      meetingTime,
      meetingType,
      meetingLink,
      meetingVenue,
      remarks,
      status,
    });

    await newMeeting.save();

    res.status(201).json({ success: true, message: "Meeting created successfully", data: newMeeting });
  } catch (error) {
    console.error("Error in createMeeting:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.updateMeetingData = async (req, res) => {
  try {
    const { _id, meetingDate, meetingTime, meetingType, meetingLink, meetingVenue, remarks, status } = req.body;
    // Validate the ID
    if (!_id) {
      return res.status(400).json({ success: false, message: "Meeting ID is required" });
    }

    // Validate meeting type (optional validation based on provided type)
    const validMeetingTypes = ["Offline", "Online"];
    if (meetingType && !validMeetingTypes.includes(meetingType)) {
      return res.status(400).json({ success: false, message: "Invalid meeting type" });
    }

    // Validate status (optional validation based on provided status)
    const validStatuses = ["Scheduled", "Completed", "Cancelled"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Find the existing meeting record
    const existingMeeting = await Meeting.findById(_id);
    if (!existingMeeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    // Update only the fields provided
    if (meetingDate) existingMeeting.meetingDate = meetingDate;
    if (meetingTime) existingMeeting.meetingTime = meetingTime;
    if (meetingType) existingMeeting.meetingType = meetingType;
    if (meetingLink) existingMeeting.meetingLink = meetingLink;
    if (meetingVenue) existingMeeting.meetingVenue = meetingVenue;
    if (remarks) existingMeeting.remarks = remarks;
    if (status) existingMeeting.status = status;

    // Save the updated meeting
    await existingMeeting.save();

    res.status(200).json({ success: true, message: "Meeting data updated successfully", data: existingMeeting });
  } catch (error) {
    console.error("Error in updateMeetingData:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};