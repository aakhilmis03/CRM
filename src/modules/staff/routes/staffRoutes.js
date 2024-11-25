const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Routes for staff actions
router.post('/add', staffController.addStaff);  // Admin adds staff
router.post('/login', staffController.loginStaff);  // Staff login
router.get('/allstaff', staffController.getAllStaff); // All staff
router.get('/staffProfile', staffController.getStaffProfile); //staff profile
router.put('/updateProfile', staffController.updateStaffProfile) // Update staff
router.delete('/delete/', staffController.deleteStaff); // Delete staff

module.exports = router;
