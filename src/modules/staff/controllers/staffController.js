const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../models/staffModel');

// Admin adds a new staff
exports.addStaff = async (req, res) => {
  try {
    const { staffId, name, email, phoneNumber, designation, password,role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password=hashedPassword;

    // Create new staff object
    const newStaff = new Staff(
      req.body
  );

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
