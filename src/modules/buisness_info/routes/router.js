const express=require("express")
const mongoose=require("mongoose")
const router=express();
const verifyToken=require("../../../middleware/authmiddleware")
const bodyParser=require('body-parser');

const {Lead} = require("../../lead/models/leadmodel")

const {
    getCountries, getState, getCity}= require("../controller/buisnesscontroller");

router.get('/get-countries',verifyToken,getCountries);
router.get('/get-state',verifyToken,getState);
router.get('/get-city',verifyToken,getCity);

router.post('/buisness-info', verifyToken,async (req, res) => {
    const {
      companyName,
      country,
      state,
      city,
      pinZip,
      address,
      companyEmail,
      companyMobile,
      companyWebsite,
      gstNo
    } = req.body;
    
    // if (!companyName || !country || !state || !city || !address || !companyEmail || !companyMobile) {
    //     return res.status(400).json({ message: 'Please fill in all required fields.' });
    //   }
    
      try {
        // Create a new business info record
        // const newBusinessInfo = new BuisnessInfo({
        //   companyName,
        //   country,
        //   state,
        //   city,
        //   pinZip,
        //   address,
        //   companyEmail,
        //   companyMobile,
        //   companyWebsite,
        //   gstNo
        // });
    
        // Save to the database
        const savedInfo = await Lead.create(req.body);
        res.status(201).json({ message: 'Buisness info saved successfully', data: savedInfo });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    });

router.post('/Followup', verifyToken,async(req,res)=> {
    const{
    leadstatus,
    priority,
    leadType,
    analysisStage,
    blockingReason,
    customerFlag
    }=req.body
    try {
        // Save to the database
        const savedInfo = await Lead.create(req.body);
        res.status(201).json({ message: 'Buisness info saved successfully', data: savedInfo });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
});

router.get('/followup',verifyToken, async (req, res) => {
    try {
      const followups = await Followup.find();
      res.json(followups);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a follow-up record by ID
  router.put('/followup/:id', verifyToken,async (req, res) => {
    try {
      const updatedFollowup = await Followup.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedFollowup);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a follow-up record by ID
  router.delete('/followup/:id',verifyToken, async (req, res) => {
    try {
      await Followup.findByIdAndDelete(req.params.id);
      res.json({ message: 'Follow-up record deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/contacts',verifyToken, async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all contacts
  router.get('/contacts', verifyToken,async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single contact by ID
  router.get('/contacts/:id', verifyToken,async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ message: 'Contact not found' });
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a contact by ID
  router.put('/contacts/:id',verifyToken, async (req, res) => {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
      res.json(updatedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a contact by ID
  router.delete('/contacts/:id', verifyToken,async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
      res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.post('/requirement', verifyToken,async (req, res) => {
    try {
      const requirement = new Requirement(req.body);
      await requirement.save();
      res.status(201).json(requirement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all requirements
  router.get('/requirement',verifyToken, async (req, res) => {
    try {
      const requirements = await Requirement.find();
      res.status(200).json(requirements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a specific requirement by ID
  router.get('/requirement/:id', verifyToken,async (req, res) => {
    try {
      const requirement = await Requirement.findById(req.params.id);
      if (!requirement) return res.status(404).json({ message: 'Requirement not found' });
      res.status(200).json(requirement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a requirement
  router.put('/requirement/:id', verifyToken,async (req, res) => {
    try {
      const updatedRequirement = await Requirement.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRequirement) return res.status(404).json({ message: 'Requirement not found' });
      res.status(200).json(updatedRequirement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a requirement
  router.delete('/requirement/:id',verifyToken, async (req, res) => {
    try {
      const requirement = await Requirement.findByIdAndDelete(req.params.id);
      if (!requirement) return res.status(404).json({ message: 'Requirement not found' });
      res.status(200).json({ message: 'Requirement deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports=router;
