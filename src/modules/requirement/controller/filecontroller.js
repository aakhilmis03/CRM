const { Filter } = require("../model/model");

// Create a new filter
const createFilter = async (req, res) => {
  try {
    const { title, value, modules } = req.body;

    let data = {
        value: value
    }
    const savedFilter = await Filter.findOneAndUpdate(
        {title: title},
        {
            $push: {
                data: data
            }
        },
        {new: true, upsert: true}
    );
    res.status(201).json({ message: "Filter created successfully", filter: savedFilter });
  } catch (error) {
    res.status(500).json({ message: "Error creating filter", error: error.message });
  }
};

// Get all filters
const getAllFilters = async (req, res) => {
  try {
    const filters = await Filter.find()
    res.status(200).json(filters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching filters", error: error.message });
  }
};

// Get a filter by ID
const getFilterById = async (req, res) => {
  try {
    const filter = await Filter.findOne({$or: [{title: req.query.title}, {_id: req.query.id}]});
    if (!filter) {
      return res.status(404).json({ message: "Filter not found" });
    }
    res.status(200).json(filter);
  } catch (error) {
    res.status(500).json({ message: "Error fetching filter", error: error.message });
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
    
    res.status(200).json({ message: "Filter updated successfully", filter: updatedFilter });
  } catch (error) {
    res.status(500).json({ message: "Error updating filter", error: error.message });
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

    res.status(200).json({ message: "Data item deleted successfully", filter: updatedFilter });
  }
   catch (error) {
    res.status(500).json({ message: "Error deleting filter", error: error.message });
  }
};

module.exports = {
  createFilter,
  getAllFilters,
  getFilterById,
  updateFilter,
  deleteFilter,
};
