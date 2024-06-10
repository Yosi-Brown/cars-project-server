const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Car", "Motorcycle", "Truck"],
    unique:true
  },
},{timestamps:true});

module.exports = mongoose.model('Categories', categorySchema);