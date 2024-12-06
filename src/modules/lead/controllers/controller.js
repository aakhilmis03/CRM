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



// const getAllDataController = async (req, res) => {
//   try {
//     // Fetch all leads from the database
//     const leads = await Lead.find();

//     // Add the dayssinceCreated field for each lead
//     const leadsWithDaysSinceCreated = leads.map((lead) => {
//       const createdAt = new Date(lead.createdAt);
//       const currentDate = new Date();
//       const timeDifference = currentDate - createdAt;
//       const daysSinceCreated = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

//       // Add the dayssinceCreated field to each lead
//       return {
//         ...lead.toObject(),  // Convert the mongoose document to a plain object
//         dayssinceCreated: daysSinceCreated
//       };
//     });

//     // Send the response with the modified leads
//     res.status(200).json({
//       leads: leadsWithDaysSinceCreated,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


// GET: Get individual data lead status
const getDataByIdController  = async (req, res) => {
  const {  leadstatus } = req.params;
  try {

    if (!leadstatus) {
      return res.status(404).json({ message: "Data not found" });
    }
    const leads = await Lead.find({ "followup.leadstatus" : leadstatus });
    if (leads.length === 0) {
      return res.status(404).json({ message: `No leads found with status: ${leadstatus}` });
    }

    res.status(200).json({
      data:leads,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
 
//all lead and searches 
const searchLeadsController = async (req, res) => {
  try {
    // Extract query parameters from the request
    const query = req.query;
    
    // Initialize the search filters object
    let searchFilters = {};

    // Check if 'leadSource' is provided and add it to the search filters
    if (query.leadSource) {
      searchFilters["leadDetails.leadSource"] = { $regex: query.leadSource, $options: "i" };
    }

    // Check if 'leadstatus' is provided and add it to the search filters
    if (query.leadstatus) {
      searchFilters["followup.leadstatus"] = { $regex: query.leadstatus, $options: "i" };
    }

    // Check if 'requirement' is provided and add it to the search filters
    if (query.requirement) {
      // In case the requirements are passed as a string separated by commas
      const requirements = query.requirement.split(",").map(req => req.trim());
      searchFilters["requirement.requirement"] = { $in: requirements };
    }

    // Check if 'salesType' is provided and add it to the search filters
    if (query.salesType) {
      searchFilters["leadDetails.salesType"] = { $regex: query.salesType, $options: "i" };
    }

    // Check if 'leadFrom' is provided and add it to the search filters
    if (query.leadFrom) {
      searchFilters["leadDetails.leadFrom"] = { $regex: query.leadFrom, $options: "i" };
    }

    // Check if 'companyName' is provided and add it to the search filters
    if (query.companyName) {
      searchFilters["businessInfo.companyName"] = { $regex: query.companyName, $options: "i" };
    }

    // Check if 'createdAt' is provided and add it to the search filters
    if (query.createdAt) {
      const startDate = new Date(query.createdAt);
      searchFilters.createdAt = { $gte: startDate }; // Searching from this date onwards
    }

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
      .select("id leadDetails followup leadstatus businessInfo contactdetail requirement createdAt") // Select necessary fields
      .exec();

    // Return the response directly from the controller
    res.status(200).json({ leads });

  } catch (err) {
    // Handle errors and return a response
    res.status(500).json({ message: `Error while searching leads: ${err.message}` });
  }
};


// const searchLeadsController = async (req, res) => {
//   try {
//     // Extract the searchbox query from the request
//     const searchbox = req.query.searchbox;
    
//     if (!searchbox) {
//       return res.status(400).json({ error: "Search query is required" });
//     }

//     // Define the fields you want to search through
//     const fieldsToSearch = [
//       "leadDetails.leadSource",
//       "leadDetails.salesType",
//       "leadDetails.skype",
//       "leadDetails.leadIndustry",
//       "leadDetails.leadCompanyType",
//       "leadDetails.leadFrom",
//       "businessInfo.companyName",
//       "businessInfo.country",
//       "businessInfo.state",
//       "businessInfo.city",
//       "businessInfo.companyEmail",
//       "businessInfo.companyMobile",
//       "businessInfo.companyWebsite",
//       "followup.leadstatus",
//       "followup.priority",
//       "followup.leadType",
//       "followup.analysisStage",
//       "followup.blockingReason",
//       "followup.customerFlag",
//       "contactdetail.contactName",
//       "contactdetail.email",
//       "contactdetail.mobileNumber",
//       "requirement.requirement",
//       "requirement.modules",
//       "requirement.application",
//       "requirement.api",
//       "requirement.support",
//       "requirement.technology",
//       "requirement.server",
//       "requirement.description",
//       "requirement.clientbudget",
//       "requirement.OurOfferedBudget"
//     ];

//     // Function to determine if a field is a string field (exclude numeric fields)
//     function isStringField(field) {
//       const stringFields = [
//         "leadDetails.leadSource",
//         "leadDetails.salesType",
//         "leadDetails.skype",
//         "leadDetails.leadIndustry",
//         "leadDetails.leadCompanyType",
//         "leadDetails.leadFrom",
//         "businessInfo.companyName",
//         "businessInfo.country",
//         "businessInfo.state",
//         "businessInfo.city",
//         "businessInfo.companyEmail",
//         "businessInfo.companyMobile",
//         "businessInfo.companyWebsite",
//         "followup.leadstatus",
//         "followup.priority",
//         "followup.leadType",
//         "followup.analysisStage",
//         "followup.blockingReason",
//         "followup.customerFlag",
//         "contactdetail.contactName",
//         "contactdetail.email",
//         "contactdetail.mobileNumber",
//         "requirement.requirement",
//         "requirement.modules",
//         "requirement.application",
//         "requirement.api",
//         "requirement.support",
//         "requirement.technology",
//         "requirement.server",
//         "requirement.description"
//       ];
//       return stringFields.includes(field);
//     }

//     // Initialize the dynamic search filters object
//     let searchFilters = {};

//     // Check if 'leadSource' is provided and add it to the search filters
//     if (req.query.leadSource) {
//       searchFilters["leadDetails.leadSource"] = { $regex: req.query.leadSource, $options: "i" };
//     }

//     // Check if 'leadstatus' is provided and add it to the search filters
//     if (req.query.leadstatus) {
//       searchFilters["followup.leadstatus"] = { $regex: req.query.leadstatus, $options: "i" };
//     }

//     // Check if 'requirement' is provided and add it to the search filters
//     if (req.query.requirement) {
//       const requirements = req.query.requirement.split(",").map(req => req.trim());
//       searchFilters["requirement.requirement"] = { $in: requirements };
//     }

//     // Check if 'salesType' is provided and add it to the search filters
//     if (req.query.salesType) {
//       searchFilters["leadDetails.salesType"] = { $regex: req.query.salesType, $options: "i" };
//     }

//     // Check if 'leadFrom' is provided and add it to the search filters
//     if (req.query.leadFrom) {
//       searchFilters["leadDetails.leadFrom"] = { $regex: req.query.leadFrom, $options: "i" };
//     }

//     // Check if 'companyName' is provided and add it to the search filters
//     if (req.query.companyName) {
//       searchFilters["businessInfo.companyName"] = { $regex: req.query.companyName, $options: "i" };
//     }

//     // Check if 'createdAt' is provided and add it to the search filters
//     if (req.query.createdAt) {
//       const startDate = new Date(req.query.createdAt);
//       searchFilters.createdAt = { $gte: startDate }; // Searching from this date onwards
//     }

//     // Handle the general search query (searchbox) by applying regex to multiple fields
//     if (searchbox) {
//       fieldsToSearch.forEach(field => {
//         // Apply regex search only for string fields
//         if (isStringField(field)) {
//           searchFilters[field] = { $regex: searchbox, $options: "i" }; // Case-insensitive search
//         } else {
//           // For numeric fields, apply exact match (only if query is a valid number)
//           if (!isNaN(searchbox)) {
//             searchFilters[field] = parseFloat(searchbox);  // Exact match for numeric fields
//           }
//         }
//       });
//     }

//     // Perform the search with the constructed filters
//     const leads = await Lead.find(searchFilters)
//       .select("id leadDetails leadstatus businessInfo contactdetail requirement createdAt") // Select necessary fields
//       .exec();

//     // Add the dayssinceCreated field for each lead
//     const leadsWithDaysSinceCreated = leads.map((lead) => {
//       const createdAt = new Date(lead.createdAt);
//       const currentDate = new Date();
//       const timeDifference = currentDate - createdAt;
//       const daysSinceCreated = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

//       // Add the dayssinceCreated field to each lead
//       return {
//         ...lead.toObject(),  // Convert the mongoose document to a plain object
//         dayssinceCreated: daysSinceCreated
//       };
//     });

//     // Send the response with the modified leads
//     res.status(200).json({
//       leads: leadsWithDaysSinceCreated,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



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
  // getAllDataController,
  getDataByIdController,
  searchLeadsController,
  updateDataController,
  deleteDataController,
};
