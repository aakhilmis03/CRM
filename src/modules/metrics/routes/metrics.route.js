const express = require('express');
const router = express.Router();
const verifyToken = require("../../../middleware/authmiddleware");
const metricsController = require("../controller/metrics.controller");

// GET: Fetch metrics
router.get("/metrics", verifyToken, metricsController.countAllSalesLeadsByStatus);

module.exports = router;