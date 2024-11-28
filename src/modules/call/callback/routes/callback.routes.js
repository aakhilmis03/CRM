const express = require('express');
const router = express.Router();
const verifyToken = require("../../../../middleware/authmiddleware");
const callsController = require("../controller/callback.controller");

// Update Call Data Route
router.post("/enter", verifyToken, callsController.updateCallData);
router.put("/update", verifyToken, callsController.updateCallbackData);
module.exports = router;