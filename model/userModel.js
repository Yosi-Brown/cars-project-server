const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    unique:true
},
password:{
    type:String,
    required:true,
    minlength:4
},
phone:{
    type: String,
    required: true,
    match: /^05[0-9]-?[0-9]{7}$/
},
firstName:{
  type:String,
  required:true
},
lastName:{
  type:String,
  required:true
},
address:{
  type:String,
  required:true
},
role:{
    type:String,
    enum: ['regular', 'manager', 'admin'],
    default: 'regular'
},
token:{type:Object,
  default:{}
}
},
{timestamps:true})


module.exports = mongoose.model("Users",userSchema)