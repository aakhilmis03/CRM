const { Lead } = require("../models/leadmodel");
// POST: Add data for all schemas
const addDataController = async (req, res) => {
  try {
    // Add Lead
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({
      message: "All data saved successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET: Get all data for all schemas
const getAllDataController = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({
      leads,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET: Get individual data by ID
const getDataByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      lead,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT: Update data by ID
const updateDataController = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {$set: req.body},
      {
        new: true,
      }
    );
    console.log(req.body);
    res.send({message: "data updated successfully", updatedLead});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE: Delete data by ID
const deleteDataController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLead = await Lead.findByIdAndDelete(id);
    const deletedBusinessInfo = await BusinessInfo.findByIdAndDelete(id);
    const deletedFollowup = await Followup.findByIdAndDelete(id);
    const deletedContact = await Contact.findByIdAndDelete(id);
    const deletedRequirement = await Requirement.findByIdAndDelete(id);

    if (
      !deletedLead ||
      !deletedBusinessInfo ||
      !deletedFollowup ||
      !deletedContact ||
      !deletedRequirement
    ) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "Data deleted successfully",
      deletedLead,
      deletedBusinessInfo,
      deletedFollowup,
      deletedContact,
      deletedRequirement,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addDataController,
  getAllDataController,
  getDataByIdController,
  updateDataController,
  deleteDataController,
};
