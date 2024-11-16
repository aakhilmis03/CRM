const express=require("express")
const mongoose=require("mongoose")
const router=express();
const verifyToken=require("../../../middleware/authmiddleware")
const bodyParser=require('body-parser');

const {Lead} = require("../../lead/models/leadmodel")

const {getCountries, getState, getCity}= require("../controller/buisnesscontroller");

router.get('/get-countries',verifyToken,getCountries);
router.get('/get-state',verifyToken,getState);
router.get('/get-city',verifyToken,getCity);

module.exports=router;
