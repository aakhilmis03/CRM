const express = require("express");
const router = express.Router();
const {
  createFilter,
  getAllFilters,
  getFilterById,
  updateFilter,
  deleteFilter
} = require("../controller/filecontroller");

// Routes
router.post("/filters", createFilter);
router.get("/filters", getAllFilters);
router.get("/filtersbyId", getFilterById);
router.put("/filters/", updateFilter);
router.delete("/filters/", deleteFilter);

module.exports = router;
