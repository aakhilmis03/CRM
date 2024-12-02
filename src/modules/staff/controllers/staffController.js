const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../models/staffModel');

// Admin adds a new staff

exports.addStaff = async (req, res) => {
  try {
    const { staffId, name, email, phoneNumber, designation, password, role } = req.body;

    // Validate that staffId is not empty
    if (!staffId || staffId.trim() === "") {
      return res.status(400).json({ message: 'Staff ID is required. Please provide a valid Staff ID.' });
    }
    
    // Check if the staff already exists by email or staffId
    const existingStaff = await Staff.findOne({ $or: [{ email }, { staffId }] });
    if (existingStaff) {
      return res.status(400).json({ message: 'Staff already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    
    const newStaff = new Staff({
      staffId: staffId, // staffId provided by user
      name,
      email,
      phoneNumber: phoneNumber || '', // Default to empty string if not provided
      designation: designation || '', // Default to empty string if not provided
      password: req.body.password,
      role: role || 'sales', // Default to 'sales' if not provided
    });

    // Save to database
    await newStaff.save();

    res.status(201).json({ message: 'Staff added successfully', staff: newStaff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding staff' });
  }
};

// Login staff
exports.loginStaff = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the staff exists in DB
    const staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET,);

    res.status(200).json({ message: 'Login successful', token, staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get all staff

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching staff' });
  }
};


// get the particular staff 
exports.getStaffProfile = async (req, res) => {
  try {
    const { staffId } = req.body;  // staffId will be passed as a URL parameter

    // Find the staff by staffId
    const staff = await Staff.findOne({ staffId: staffId });

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ staff });
  } catch (error) {
    console.error("Error occurred while fetching staff profile:", error);
    res.status(500).json({ message: 'Error fetching staff profile', error: error.message });
  }
};



// Update staff profile (only the fields provided in the request)
exports.updateStaffProfile = async (req, res) => {
  try {
    // Extract the fields that might be updated from the request body
    const { staffId, name, email, phoneNumber, designation, role, password } = req.body;

    // Create an object to hold the fields that will be updated
    const updatedData = {};

    // Only add the fields that are provided
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phoneNumber) updatedData.phoneNumber = phoneNumber;
    if (designation) updatedData.designation = designation;
    if (role) updatedData.role = role;
    
    // If password is provided, hash it before updating
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    // Update the staff in the database using staffId
    const staff = await Staff.findOneAndUpdate({ staffId: staffId }, updatedData, { new: true });


    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff profile updated successfully', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating staff profile' });
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  const { staffId } = req.body; // Get staffId from URL parameters

  try {
    // Find and delete the staff member by staffId
    const deletedStaff = await Staff.findOneAndDelete({ staffId });

    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting staff' });
  }
};