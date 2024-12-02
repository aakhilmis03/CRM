const Quotation = require('../model/quotation.model');

class QuotationController {
  // Create new quotation
  async create(req, res) {
    try {
      const quotationCount = await Quotation.countDocuments();
      const quotationNumber = `Q-${new Date().getFullYear()}-${(quotationCount + 1).toString().padStart(3, '0')}`;
      
      const quotationData = {
        ...req.body,
        quotationNumber,
        totalPrice: this.calculateTotal(req.body.items, req.body.implementation?.cost || 0, 
                                      req.body.amc?.cost || 0, req.body.hosting?.cost || 0)
      };

      const quotation = new Quotation(quotationData);
      await quotation.save();
      
      res.status(201).json({
        status: 'success',
        data: quotation
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Get all quotations
  async getAll(req, res) {
    try {
      const quotations = await Quotation.find();
      res.status(200).json({
        status: 'success',
        data: quotations
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Get quotation by ID
  async getById(req, res) {
    try {
      const quotation = await Quotation.findById(req.params.id);
      if (!quotation) {
        return res.status(404).json({
          status: 'error',
          message: 'Quotation not found'
        });
      }
      res.status(200).json({
        status: 'success',
        data: quotation
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Update quotation
  async update(req, res) {
    try {
      const quotation = await Quotation.findById(req.params.id);
      if (!quotation) {
        return res.status(404).json({
          status: 'error',
          message: 'Quotation not found'
        });
      }

      // Recalculate total price if items or costs are updated
      if (req.body.items || req.body.implementation || req.body.amc || req.body.hosting) {
        req.body.totalPrice = this.calculateTotal(
          req.body.items || quotation.items,
          req.body.implementation?.cost || quotation.implementation.cost,
          req.body.amc?.cost || quotation.amc.cost,
          req.body.hosting?.cost || quotation.hosting.cost
        );
      }

      const updatedQuotation = await Quotation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: 'success',
        data: updatedQuotation
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  } 

  // Delete quotation
  async delete(req, res) {
    try {
      const quotation = await Quotation.findByIdAndDelete(req.params.id);
      if (!quotation) {
        return res.status(404).json({
          status: 'error',
          message: 'Quotation not found'
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Quotation deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Helper method
  calculateTotal(items, implementationCost, amcCost, hostingCost) {
    const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
    return itemsTotal + implementationCost + amcCost + hostingCost;
  }
}
module.exports = QuotationController;