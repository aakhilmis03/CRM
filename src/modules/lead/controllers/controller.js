const { Lead } = require("../models/leadmodel");
// POST: Add data for all schemas
const addDataController = async (req, res) => {
  try {

    // Add Lead
    const lead = new Lead(req.body);
    await lead.save();

    //   // Add Business Info
    //   const businessInfo = new BusinessInfo(businessInfoData);
    //   await businessInfo.save();

    //   // Add Followup
    //   const followup = new Followup(followupData);
    //   await followup.save();

    //   // Add Contact
    //   const contact = new Contact(contactData);
    //   await contact.save();

    //   // Add Requirement
    //   const requirement = new Requirement(requirementData);
    //   await requirement.save();

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
    // const businessInfos = await BusinessInfo.find();
    // const followups = await Followup.find();
    // const contacts = await Contact.find();
    // const requirements = await Requirement.find();

    res.status(200).json({
      leads,
    //   businessInfos,
    //   followups,
    //   contacts,
    //   requirements,
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
    // const businessInfo = await BusinessInfo.findById(id);
    // const followup = await Followup.findById(id);
    // const contact = await Contact.findById(id);
    // const requirement = await Requirement.findById(id);

    if (!lead) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      lead,
    //   businessInfo,
    //   followup,
    //   contact,
    //   requirement,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT: Update data by ID
const updateDataController = async (req, res) => {
  const { id } = req.params;
  const {
    leadData,
    // businessInfoData,
    // followupData,
    // contactData,
    // requirementData,
  } = req.body;

  try {
    const updatedLead = await Lead.findByIdAndUpdate(id, leadData, {
      new: true,
    });
    // const updatedBusinessInfo = await BusinessInfo.findByIdAndUpdate(
    //   id,
    //   businessInfoData,
    //   { new: true }
    // );
    // const updatedFollowup = await Followup.findByIdAndUpdate(id, followupData, {
    //   new: true,
    // });
    // const updatedContact = await Contact.findByIdAndUpdate(id, contactData, {
    //   new: true,
    // });
    // const updatedRequirement = await Requirement.findByIdAndUpdate(
    //   id,
    //   requirementData,
    //   { new: true }
    // );

    // if (
    //   !updatedLead ||
    //   !updatedBusinessInfo ||
    //   !updatedFollowup ||
    //   !updatedContact ||
    //   !updatedRequirement
    // ) {
    //   return res.status(404).json({ message: "Data not found" });
    // }

    // res.status(200).json({
    //   message: "Data updated successfully",
    //   updatedLead,
    //   updatedBusinessInfo,
    //   updatedFollowup,
    //   updatedContact,
    //   updatedRequirement,
    // });
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
