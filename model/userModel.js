const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
role:{
    type:String,
    enum: ['regular', 'manager'],
    default: 'regular'
},

// premission:{
//     type:Number,
//     default:1
// },
token:{type:Object,
  default:{}
}
},
{timestamps:true})


module.exports = mongoose.model("USer",userSchema)