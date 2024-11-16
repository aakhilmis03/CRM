const mongoose = require("mongoose")

const leadDetailSchema = new mongoose.Schema({
    leadSource: {
        type: String,
        required: true,
        // enum: ['just-dial', 'email', 'fiverr', 'Social Media', 'Email', 'upwork','events '],
      },
      salesType: {
        type: String,
        required: true,
        // enum: ['NewSale', 'Renewal', 'up-sell'],
      },
      skype: {
        type: String,
      },
      leadIndustry: {
        type: String,
        required: true,
        // enum: ['Real Estate',
        //     'Ecommerce & Retail'
        //     ,'Manufacturing'
        //     ,'Jobs & Platform',
        //     'Education & Learning'
        //     ,'Fintech',
        //     'Travel & Hospitality',
        //     'Gaming'
        //     ,'IT Infra',
        //     'Marketplace'
        //     ,'Custom CRM'],
      },
      leadCompanyType: {
        type: String,
        required: true,
        // enum: ['Startup', 'Individual', 'Enterprise', 'Govt','Coorporate','MNC'],
      },
      leadFrom: {
        type: String,
        required: true,
        // enum: ['India Buisness', 'Overseas Buisness'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const businessInfoSchema = new mongoose.Schema({
    companyName: { type: String, 
        required: true
     },
    country: { type: String,
         required: true
     },
    state: { type: String,
        required: true
    },
    city:  { type: String, 
      required: true
    },
    pinZip: { type: String 
    },
    address: { 
        type: String,
         required: true
    },
    companyEmail: {
        type: String, 
        required: true 
    },
    companyMobile: { 
        type: String, 
        required: true 
    },
    companyWebsite: { 
        type: String 
    },
    gstNo: { 
        type: String 
    }
  
})

const FollowupSchema= new mongoose.Schema({
  leadstatus:{
    type:String,
    required:true,
    // enum: ['New Lead','Follow up', 'Meeting & Demo','Costing & Proposal ','Projection','Wins as Project','No Response & lost','Junk Lead', 'Converted'],
  },
  priority: {
    type: String,
    required: true,
    // enum: ['Low', 'Medium', 'High'],
  },
  leadType: {
    type: String,
    required: true,
    // enum: ['Casual Lead', 'Hot Lead', 'Cold Lead', 'Warm Lead'],
  },
  analysisStage: {
    type: String,
    required: true,
    // enum: ['Requirement Analysis', 'Initial Discussion', 'Proposal Sent', 'Negotiation'],
  },
  blockingReason: {
    type: String,
    // enum: [
    //   'Low Budget','Technical Issues','Internal Approval','Competitor Quotes','No Response','Other'],
  },
  customerFlag: {
    type: String,
    // enum: ['Genuine Client', 'Fraud', 'Tech Company', 'Freelancer', 'Potential Partner'],
  },
})

const contactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    enum: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'],
  },
  contactName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  countryCode: {
    type: String,
    required: true,
    match: [/^\+\d{1,3}$/, 'Invalid country code format'],
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10,15}$/, 'Invalid mobile number format'],
  },
});


const requirementSchema = new mongoose.Schema({
  requirement: {
    type: [String],
    // enum: ['E-Commerce','Real State ','Custom CRM/ERP', 'Custom  Apps Project','Education Project','Health Care & Pharmacy','Market Place','Travel and Hospitality','Game Development','Fintech Project'],
    required: true,
  },
  modules: {
    type: String,
    // enum:['Property Website','Bu sell market place','Rental Software','property management system CRM','Vendor Module','SALE CRM ','Buyer App','Owner APP', 'Seller app']
  },
  application: {
    type: [String],
    // enum: ['Android Native', 'Native Android', 'Native iOS', 'Flutter App', 'Others'],
    required: true,
  },
  api: {
    type: [String],
    // enum: [ 'Payment Gateway','SMS API','Google Firebase','WhatsApp API','Shipping API','Others'],
  },
  support: {
    type: String,
    // enum: ['Required', 'Not Required', 'Paid Support', 'Free Support'],
    required: true,
  },
  technology: {
    type: [String],
    // enum: ['NodeJs', 'Laravel', 'Code Ignitor', 'PHP', '.Net', 'Others'],
    required: true,
  },
  server: {
    type: [String],
    // enum: ['Dedicated', 'AWS', 'Shared Server', 'Client Server', 'Others'],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
 // clientbudget:{
  //   type:Number,
  //   required:true,
  // },
  // OurOfferedBudget:{
  //   type:Number,
  //   required:true,
  // },
  // Attachments:{

  // },
  // AssignedTo:{
  //   type:String,
  // } 
}, {
  timestamps: true,
});

const leadSchema = new mongoose.Schema({
    leadDetails: leadDetailSchema,
    businessInfo: businessInfoSchema,
    followup:FollowupSchema,
    contactdetail:contactSchema,
    requirement:requirementSchema,
}, {timestamps: true})

let Lead = mongoose.model("Lead", leadSchema)
module.exports = {Lead}

