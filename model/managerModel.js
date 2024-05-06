const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  email:{
    type:String,
    required:true,
    match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    unique:true
},
password:{
    type:String,
    required:true,
    min:4
},
// premission:{
//     type:Number,
//     default:1
// },
// token:{type:Object}
},
{timestamps:true})


module.exports = mongoose.model("Manager",managerSchema)