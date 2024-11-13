const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Routes for staff actions
router.post('/add', staffController.addStaff);  // Admin adds staff
router.post('/login', staffController.loginStaff);  // Staff login

module.exports = router;
