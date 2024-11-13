const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../models/staffModel');

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
    const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, );

    res.status(200).json({ message: 'Login successful', token, staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
