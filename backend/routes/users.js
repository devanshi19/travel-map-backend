const router = require("express").Router();
const user = require("../modals/user");
const bcrypt = require("bcrypt");


//CREGISTER USERS

router.post("/register",async(req,res)=>{
    try{
        //GENERATE NEW PASSWORD 
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(req.body.password,salt)
        
        //CREATE NEW USER
        const newUser = new user({
            username:req.body.username,
            email:req.body.email,
            password:hasedPassword
        })
      
        //SAVE AND SEND USER 
        const User = await newUser.save();
        res.status(200).json(User._id);
    }
    catch(err){ res.status(500).json(err)}
})


// LOGIN USERS 
router.post("/login",async(req,res)=>{
    try{
        //FIND USER
        const User = await user.findOne({username:req.body.username});
        !User && res.status(400).json("Wrong username or password !")

        //VALIDATE PASSWORD
        const validatePwd = await bcrypt.compare(req.body.password,User.password) ;
        !validatePwd && res.status(400).json("Invalid password")

        // SEND RESPOND
        res.status(200).json({_id:User._id,username:User.username})
    }
    catch(err){ res.status(500).json(err)}
})




module.exports =  router