const mongoose=require("mongoose");
const { applyTimestamps } = require("../../staff/models/staffModel");

const requirementschema=new mongoose.Schema({
    title:{
        type: String,
        required:true,
        enum:['Blocking Reason','Api','Customer Flag','Application','Technology','Server','Support'],
        unique:true,
    },
    data:[{
       value: String,
       modules: [{
        typeName: String
       }] 
    }]
});

let Filter = mongoose.model("requirement",requirementschema)
module.exports= {Filter};