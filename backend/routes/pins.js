const router = require("express").Router();
const pin = require("../modals/pin")

//CREATE PIN 

router.post("/",async(req,res)=>{
    const newPin = new pin(req.body);
    try{
        const savePin = await newPin.save();
        res.status(200).json(savePin)
    }
    catch(err){
        res.status(500).json(err);
    }
})
// GET ALL PINS 

router.get("/",async(req,res)=>{
    try{
        const fetchedPin = await newPin.find();
        res.status(200).json(fetchedPin)
    }catch(err){res.status(500).json(err);
    }
})



module.exports =  router