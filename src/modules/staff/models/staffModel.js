const mongoose = require("mongoose");

// Staff schema definition
const staffSchema = new mongoose.Schema(
  {
    staffId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    designation: { type: String },
    password: { type: String, required: true }, // Store password securely (hashed)
    role: { type: String, default: "sales" }, // Default role
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
