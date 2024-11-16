const { Filter } = require("../model/model");
const { ObjectId } = require("mongoose").Types;
const mongoose = require("mongoose");

const verifyToken = require("../../../middleware/authmiddleware");
// Create a new filter
const createFilter = async (req, res) => {
  try {
    const { title, value } = req.body;

    const savedFilter = await Filter.findOneAndUpdate(
      { title: title },
      {
        $push: {
          data: { $each: value },
        },
      },
      { new: true, upsert: true }
    );
    res.status(201).json({ message: "Filter created successfully", filter: savedFilter });
  } catch (error) {
    res.status(500).json({ message: "Error creating filter", error: error.message });
  }
};

const addModules = async (req, res) => {
  try {
    const { id, modules, dataId } = req.body;

    // Validate that modules is an array
    if (!Array.isArray(modules) || modules.length === 0) {
      return res
        .status(400)
        .json({ message: "Modules must be a non-empty array" });
    }

    // Perform the update operation
    const updatedFilter = await Filter.findOneAndUpdate(
      { _id: id, "data._id": dataId },
      { $push: { "data.$.modules": { $each: modules } } },
      { new: true }
    );

    if (!updatedFilter) {
      return res.status(404).json({ message: "Filter or data item not found" });
    }

    res
      .status(200)
      .json({ message: "Filter updated successfully", filter: updatedFilter });
  } catch (error) {
    console.error("Error updating filter:", error.message);
    res
      .status(500)
      .json({ message: "Error updating filter", error: error.message });
  }
};

// Get modules by filter ID and data ID

const getModules = async (req, res) => {
  try {
    // Log the entire query object to see what is received
    console.log("Received Query Params:", req.body);


    const { id, dataId } = req.body;
    console.log("Received ID:", id);
console.log("Received Data ID:", dataId);

    // Validate the ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id) || id.length !== 24) {
      return res.status(400).json({ message: "Invalid Filter ID" });
    }
    if (!dataId || !mongoose.Types.ObjectId.isValid(dataId) || dataId.length !== 24) {
      return res.status(400).json({ message: "Invalid Data ID" });
    }

    // Convert `id` and `dataId` to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);
    const dataObjectId = new mongoose.Types.ObjectId(dataId);

    console.log("Searching for filter with ID:", objectId);

    const filter = await Filter.findOne({ _id: objectId });
    if (!filter) {
      return res.status(404).json({ message: "Filter not found" });
    }

    const dataItem = filter.data.find((item) => item._id.equals(dataObjectId));
    if (!dataItem) {
      return res.status(404).json({ message: "Data item not found" });
    }

    res.status(200).json({ modules: dataItem.modules });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Error fetching modules", error: error.message });
  }
};

// Get all filters
const getAllFilters = async (req, res) => {
  try {
    const filters = await Filter.find();
    res.status(200).json(filters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching filters", error: error.message });
  }
};

// Get a filter by ID
const getFilterById = async (req, res) => {
  try {
    const { title, id, dataId } = req.query;

    let pipeLine = [
      {
        $match: {
          $or: [{ title: title }, { _id: new mongoose.Types.ObjectId(id) }],
        },
      },
    ];

    if (req.query.dataId) {
      pipeLine.push({ $unwind: "$data" });
      pipeLine.push({
        $match: { "data._id": new mongoose.Types.ObjectId(dataId) },
      });
    }

    const filter = await Filter.aggregate(pipeLine);
    if (filter.length === 0) {
      return res.status(404).json({ message: "Filter not found" });
    }
    res.status(200).json(filter[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching filter", error: error.message });
  }
};

// Update a filter by ID
const updateFilter = async (req, res) => {
  try {
    const { title, value, dataId } = req.body;

    // Find and update the specific value in the data array
    const updatedFilter = await Filter.findOneAndUpdate(
      { title, "data._id": dataId },
      { $set: { "data.$.value": value } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Filter updated successfully", filter: updatedFilter });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating filter", error: error.message });
  }
};

// Delete a filter by ID
const deleteFilter = async (req, res) => {
  try {
    const { title, dataId } = req.body;

    // Find and remove the specific item from the data array
    const updatedFilter = await Filter.findOneAndUpdate(
      { title },
      { $pull: { data: { _id: dataId } } },
      { new: true }
    );
    if (!updatedFilter) {
      return res.status(404).json({ message: "Filter or data item not found" });
    }

    res.status(200).json({
      message: "Data item deleted successfully",
      filter: updatedFilter,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting filter", error: error.message });
  }
};

module.exports = {
  createFilter,
  getAllFilters,
  getFilterById,
  updateFilter,
  deleteFilter,
  addModules,
  getModules,
};
