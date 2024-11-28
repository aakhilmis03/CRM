const express = require('express');
const router = express.Router();
const verifyToken = require("../../../../middleware/authmiddleware");
const meetingController = require("../controller/meeting.controller");

// Create Meeting Route
router.post("/create", verifyToken, meetingController.createMeeting);
router.put("/update", verifyToken, meetingController.updateMeetingData);
module.exports = router;