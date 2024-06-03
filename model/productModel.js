const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
    model: {
      type: String,
      required: true,
    },
    engine_displacement_cc: {
      type: Number,
      default: null,
      // required: true,
    },
    horsepower: {
      type: Number,
      // required: true,
    },
    seats: {
      type: Number,
      // required: true,
    },
    colors: [{
      type: String,
      // required: true,
    }],
    engine_type: {
      type: String,
      // required: true,
    },
    car_type: {
      type: String,
      // required: true,
    },
    year: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: null
    },
    image_link: {
      type: String,
      // required: true,
    }
},{timestamps:true})


module.exports = mongoose.model('Products',productSchema)