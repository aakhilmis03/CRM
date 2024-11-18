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
      saleCompanyType,
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

    // if (source) query.source = { $regex: source, $options: 'i' };
    // if (addedBy) query.addedBy = { $regex: addedBy, $options: 'i' };
    // if (leadStatus) query.leadStatus = { $regex: leadStatus, $options: 'i' };
    // if (saleCompanyType) query.saleCompanyType = { $regex: saleCompanyType, $options: 'i' };
    // if (leadFrom) query.leadFrom = { $regex: leadFrom, $options: 'i' };
    // if (country) query.country = { $regex: country, $options: 'i' };
    // if (requirement) query.requirement = { $regex: requirement, $options: 'i' };

    // Date range filter
    // if (startDate && endDate) {
    //   query.date = {
    //     $gte: new Date(startDate),
    //     $lte: new Date(endDate),
    //   };
    // }

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
