// modules/followup/controller/post.update.controller.js
const {Lead} = require('../../../lead/models/leadmodel'); // Fix the path according to your structure

const updateFollowupController = async (req, res) => {
  try {
    // Get id from request params (check if you're passing id in route)
    const { id } = req.params; // Make sure you have :id in your route path
    
    // Destructure data from request body
    const {
      leadstatus,
      priority,
      leadType,
      analysisStage,
      blockingReason,
      customerFlag,
      projectionValue,
      projectionDate,
      clientbudget,
      OurOfferedBudget,
      AssignedTo
    } = req.body;

    // Validate if id exists
    if (!id) {
      return res.status(400).json({ 
        success: false,
        message: "Lead ID is required" 
      });
    }

    // Update the lead
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        $set: {
          'followup.leadstatus': leadstatus,
          'followup.priority': priority,
          'followup.leadType': leadType,
          'followup.analysisStage': analysisStage,
          'followup.blockingReason': blockingReason,
          'followup.customerFlag': customerFlag,
          'followup.projectionValue': projectionValue,
          'followup.projectionDate': projectionDate,
          'requirement.clientbudget': clientbudget,
          'requirement.OurOfferedBudget': OurOfferedBudget,
          'requirement.AssignedTo': AssignedTo
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    // Check if lead exists
    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Followup updated successfully",
      data: updatedLead
    });

  } catch (error) {
    console.error("Error in updateFollowupController:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating followup",
      error: error.message
    });
  }
};

module.exports = {
  updateFollowupController
};