const { Lead } = require("../../lead/models/leadmodel");

// Search Leads Controller
exports.searchLeads = async (req, res) => {
  try {
    const {
      key,
      salesType,
      source,
      addedBy,
      leadStatus,
      leadCompanyType,
      leadFrom,
      country,
      startDate,
      endDate,
      requirement,
    } = req.body;

    let pipeLine = [];
    // Build the search query object
    const filter = {};

    if (salesType) filter.salesType = salesType;
    if (leadStatus) filter.leadStatus= leadStatus;
    if (source) filter.source = source;
    if (addedBy) filter.addedBy = addedBy
    if (leadStatus) filter.leadStatus = leadStatus
    if (leadCompanyType) filter.leadCompanyType = leadCompanyType
    if (leadFrom) filter.leadFrom = leadFrom
    if (country) filter.country = country
    if (requirement) filter.requirement = requirement

    // Date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      console.log("Start Date (Converted):", start, "End Date (Converted):", end);
    
      filter.createdAt = {
        $gte: start,
        $lte: end,
      };
    }
    filter.createdAt = {
      $gte: new Date("2024-10-18"),
      $lte: new Date("2024-11-12"),
    };

    let data = {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$leadDetails",
            "$businessInfo",
            "$followup",
            "$contactdetail",
            "$requirement",
            {
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
              _id: "$_id",
            },
          ],
        },
      },
    };

    pipeLine.push(data);
    pipeLine.push({ $match: filter });

    // Fetch leads based on the query
    console.log(filter);
    const leads = await Lead.aggregate(pipeLine);
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error("Error in searchLeads:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
