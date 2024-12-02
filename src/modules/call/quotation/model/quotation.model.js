const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  quotationNumber: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  currency: {
    type: String,
    enum: ['USD', 'INR'],
    required: true
  },
  client: {
    name: {
      type: String,
      required: true
    },
    company: String,
    location: String
  },
  subject: String,
  items: [{
    service: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  implementation: {
    cost: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  amc: {
    cost: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  hosting: {
    cost: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  termsAndConditions: String,
  paymentTerms: String,
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: String
  }
}, {
  timestamps: true
});

const Quotation = mongoose.model('Quotation', QuotationSchema);
module.exports = Quotation;