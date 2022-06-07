const express = require('express');
const app = express();

//routing endpont file
const router =require('./src/Routes/api');
const bodyParser = require('body-parser');

//Securety Middleware import
const rateLimit = require('express-rate-limit')
const helemt = require('helmet');
const xssClean =require('xss-clean');
const  mongoSanitize=require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');

//security middleware implementation 
app.use(helemt());
app.use(xssClean());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());
app.use(bodyParser());


//Rate limit settings
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);

//MongooDB canection

const URI ="mongodb+srv://Rakibhasan:Rakibhasan23451@cluster0.erf7p.mongodb.net/Todo?retryWrites=true&w=majority";
//const URI = "mongodb://127.0.0.1:27017/Todo";
const OPTION = {autoIndex:true}
mongoose.connect(URI,OPTION,(err)=>{
   if(err){
       console.log(err);
   }
   else{
       console.log("Canections success");
   }
});

// Routing Implement
app.use("/api/v1",router)


// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})

module.exports = app;