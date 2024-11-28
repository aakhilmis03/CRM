const express=require('express');
const router=express.Router();
const verifyToken = require("../../../../middleware/authmiddleware")
const {updateFollowupController}=require("../controller/post.update.controller")

router.put("/update/:id",verifyToken,updateFollowupController);

module.exports = router;