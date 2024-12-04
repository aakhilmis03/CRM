const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const verifyToken = require('../../../middleware/authmiddleware');

// Routes for staff actions
router.post('/add',verifyToken,staffController.addStaff);  // Admin adds staff
router.post('/login', staffController.loginStaff);  // Staff login
router.get('/allstaff',verifyToken,  staffController.getAllStaff); // All staff
router.get('/staffProfile',verifyToken,  staffController.getStaffProfile); //staff profile
router.put('/updateProfile', verifyToken, staffController.updateStaffProfile) // Update staff
router.delete('/delete/', verifyToken, staffController.deleteStaff); // Delete staff

module.exports = router;
