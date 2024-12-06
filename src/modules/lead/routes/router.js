const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middleware/authmiddleware");
const {
  addDataController,
  getAllDataController,
  getDataByIdController,
  updateDataController,
  deleteDataController,
  searchLeadsController
} = require("../controllers/controller");

// POST: Add data for all schemas
router.post("/adddata", verifyToken, addDataController);

// GET: Get individual data by lead status
router.get("/leadstatus/:leadstatus", verifyToken, getDataByIdController);

//get all the data & the search bar 
router.get("/search/", verifyToken, searchLeadsController);

// PUT: Update data by ID
router.put("/adddata/:id", verifyToken, updateDataController);

// DELETE: Delete data by ID
router.delete("/adddata/:id", verifyToken, deleteDataController);

module.exports = router;
