const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middleware/authmiddleware");
const {
  addDataController,
  getAllDataController,
  getDataByIdController,
  updateDataController,
  deleteDataController
} = require("../controllers/controller");

// POST: Add data for all schemas
router.post("/adddata", verifyToken, addDataController);

// GET: Get all data for all schemas
router.get("/adddata", verifyToken, getAllDataController);

// GET: Get individual data by ID
router.get("/leadstatus/:leadstatus", verifyToken, getDataByIdController);

// PUT: Update data by ID
router.put("/adddata/:id", verifyToken, updateDataController);

// DELETE: Delete data by ID
router.delete("/adddata/:id", verifyToken, deleteDataController);

module.exports = router;
