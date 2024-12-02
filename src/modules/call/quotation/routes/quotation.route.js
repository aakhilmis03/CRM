const express = require('express');
const router = express.Router();
const QuotationController = require('../controller/quotation.controller');
const quotationController = new QuotationController();

// Create new quotation
router.post('/quotations', (req, res) => quotationController.create(req, res));

// Get all quotations
router.get('/quotations', (req, res) => quotationController.getAll(req, res));

// Get quotation by ID
router.get('/quotations/:id', (req, res) => quotationController.getById(req, res));

// Update quotation
router.put('/quotations/:id', (req, res) => quotationController.update(req, res));

// Delete quotation
router.delete('/quotations/:id', (req, res) => quotationController.delete(req, res));
module.exports = router; 