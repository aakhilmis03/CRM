const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middleware/authmiddleware");
const {
    addDataController,
    getAllDataController,
    getDataByIdController,
    updateDataController,
    deleteDataController,
    getLeadDetailsByName, // Import the new controller method
} = require("../controllers/leadDetailsController");

router.get("/lead-details/:name", verifyToken, getLeadDetailsByName);

module.exports = router;