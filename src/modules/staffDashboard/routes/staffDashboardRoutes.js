const express = require('express');
const router = express.Router();
const authMiddleware = require('../../../utils/authMiddleware');
const staffDashboardController = require('../controllers/staffDashboardController');

// Protected dashboard data route
router.get('/dashboard', authMiddleware, staffDashboardController.getDashboardData);

module.exports = router;
