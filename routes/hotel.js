const express = require("express");
const Hotel =require("../models/hotel.js")
const router=express.Router();''
const {getHotels,getHotel,createHotel,updateHotel,deleteHotel}=require('../controllers/hotel.js');
const multer = require('../index.js')

router.get('/',getHotels);

router.get("/:id",getHotel);
 

router.post("/",createHotel);




//update
router.put("/:id", updateHotel);

//delete
router.delete("/:id",deleteHotel);




module.exports=router;