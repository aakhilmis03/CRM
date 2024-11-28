const { Lead } = require("../../lead/models/leadmodel");
const Call = require("../../call/callback/model/callback.model"); // Import Callback model
const Meeting = require("../../call/meeting/model/meeting.model"); // Import Meeting model

// Define all possible lead statuses
const allLeadStatuses = [
  "New Lead",
  "Follow up",
  "Meeting & Demo",
  "Costing & Proposal",
  "Projection",
  "Wins as Project",
  "No Response & lost",
  "Junk Lead",
  "Converted"
];

// Count All Sales Leads by Status
exports.countAllSalesLeadsByStatus = async (req, res) => {
  try {
    // Aggregate leads by their leadstatus
    const leadCounts = await Lead.aggregate([
      {
        $group: {
          _id: "$followup.leadstatus",
          count: { $sum: 1 } // Count the number of leads for each status
        }
      }
    ]);

    // Transform the result to include all statuses, defaulting to 0 if not present
    const leadCountsMap = leadCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Fetch scheduled callbacks and meetings
    const scheduledCallbacks = await Call.find({ status: "scheduled" }).select('_id callbackDate callbackTime remarks');
    const scheduledMeetings = await Meeting.find({ status: "Scheduled" }).select('_id meetingDate meetingTime meetingType remarks');

    // Prepare the final response including all statuses
    const response = allLeadStatuses.map(status => ({
      leadstatus: status,
      count: leadCountsMap[status] || 0, // Default to 0 if status is not found
    }));

    // Calculate the total number of leads
    const totalLeads = response.reduce((sum, item) => sum + item.count, 0);

    // Return the response as JSON
    res.status(200).json({
      success: true,
      totalLeads: totalLeads, // Include total leads count
      scheduledCallbacks: scheduledCallbacks, // Include all scheduled callbacks data
      scheduledMeetings: scheduledMeetings, // Include all scheduled meetings data
      data: response // Include the lead status data with counts
    });

  } catch (error) {
    console.error("Error counting all sales leads by status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
