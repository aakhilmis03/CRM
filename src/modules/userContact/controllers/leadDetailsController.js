const { Lead } = require("../../lead/models/leadmodel");

exports.getLeadDetailsByName = async (req, res) => {
    const { name } = req.params;

    try {
        const lead = await Lead.findOne({ "contactdetail.contactName": name })
            .populate("businessInfo")
            .populate("leadDetails")
            .populate("followup");

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        // Structure the data into blocks
        const responseData = {
                contactDetail: {
                    name: lead.contactdetail.contactName,
                    phoneNumber: lead.contactdetail.mobileNumber,
                    email: lead.contactdetail.email,
                    skype: lead.leadDetails.skype,
                    leadSource: lead.leadDetails.leadSource,
                    createdAt: lead.leadDetails.createdAt,
                    salesType: lead.leadDetails.salesType,
                    priority: lead.followup.priority,
                    leadType: lead.followup.leadType,
                },
                companyInfo: {
                    companyName: lead.businessInfo.companyName,
                    address: lead.businessInfo.address,
                    webUrl: lead.businessInfo.companyWebsite,
                    leadFrom: lead.leadDetails.leadFrom,
                    leadIndustry: lead.leadDetails.leadIndustry,
                },
            leadStage: lead.followup.leadstatus,
            salesProgress: lead.followup.priority, // Assuming this is what you want
            leadAdded: {
                leadSource: lead.leadDetails.leadSource,
                createdAt: lead.leadDetails.createdAt,
                salesType: lead.leadDetails.salesType,
            },
            blockingReason: lead.followup.blockingReason,
            customerFlag: lead.followup.customerFlag,
            // Add more blocks as necessary
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error fetching lead details:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};