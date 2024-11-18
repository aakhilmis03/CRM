const express = require('express');
const router = express.Router();
const { searchLeads } = require('../controller/allSaleslead');

// POST request for searching leads
router.post('/leads/search', searchLeads);

module.exports = router;
