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

exports.todayactivity = async (req, res) => {
  try {
    // Extract query parameters from the request
    const query = req.query;
    
    // Initialize the search filters object
    let searchFilters = {};

    // Get today's date and convert to the start of the day (00:00:00) and end of the day (23:59:59)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // set to 00:00:00
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // set to 23:59:59

    // Add filter to match createdAt with today's date
    searchFilters.createdAt = { $gte: startOfDay, $lte: endOfDay };

    // If 'searchbox' is provided, apply the search filter to specific fields
    if (query.searchbox) {
      const searchText = query.searchbox.trim();

      let contactFilter = {};

      // Add filters for email, contactName, companyMobile if the searchText matches
      contactFilter["$or"] = [
        { "contactdetail.email": { $regex: searchText, $options: "i" } },
        { "contactdetail.contactName": { $regex: searchText, $options: "i" } },
        { "businessInfo.companyMobile": { $regex: searchText, $options: "i" } }
      ];

      // Add the contact filter to the searchFilters
      searchFilters = { ...searchFilters, ...contactFilter };
    }

    // Perform the search with the constructed filters
    const leads = await Lead.find(searchFilters)
      // Ensure you select the necessary fields, including 'followup'
      .select("id leadDetails followup businessInfo contactdetail requirement createdAt") 
      .exec();

    // Return the response with filtered leads
    res.status(200).json({ leads });

  } catch (err) {
    // Handle errors and return a response
    res.status(500).json({ message: `Error while searching leads: ${err.message}` });
  }
};


