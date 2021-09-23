const mongoose = require ("mongoose");
 const userSchema = new mongoose.Schema({
     name:{
         type:String ,
         minlength:4,
         
     },
     Phone:{
        type:Number ,
        min: [2000000000, 'Invalid Phone Number'],
        max: [9999999999,'Invalid Phone Number'],
        
    },
    email:{
        type:String ,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        
    },
    message:{
        type:String ,
       
    }
 })

 //create collections
  const User= new mongoose.model("User",userSchema);
  module.exports= User;