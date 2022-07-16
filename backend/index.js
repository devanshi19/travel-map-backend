const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app  = express();
app.use(express.json());

//PIN API
const pinRoute = require("./routes/pins");
app.use("/api/pins",pinRoute)


//USER API 
const userRoute = require("./routes/users")
app.use("/api/users",userRoute)

//CONNETION TO DATABASE
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to data base");
}).catch(err => {console.log("error",err)});

//CONNECTION TO SERVER
app.listen(8800,()=>{
    console.log("server connectimng!!")
})
