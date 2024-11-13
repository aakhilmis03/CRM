const express = require('express');
const Lead = require('../models/leadmodel');
const router = express.Router();
const verifyToken=require("../../../middleware/authmiddleware")
// Create a new lead
router.post('/leads', verifyToken,async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all leads
router.get('/leads', verifyToken,async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
