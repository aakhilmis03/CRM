const express = require("express");
const router = express.Router();
const verifyToken=  require("../../../middleware/authmiddleware");
const {
  createFilter,
  getAllFilters,
  getFilterById,
  updateFilter,
  deleteFilter,
  addModules,
  getModules
} = require("../controller/filecontroller");

// Routes
router.post("/filters", verifyToken,createFilter);
router.get("/filters", verifyToken,getAllFilters);
router.get("/filtersbyId",verifyToken, getFilterById);
router.put("/filters/",verifyToken, updateFilter);
router.delete("/filters/",verifyToken, deleteFilter);
router.post("/addModules",verifyToken, addModules);
router.get("/getModules/",verifyToken,getModules);
module.exports = router;