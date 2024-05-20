const mongoose = require("mongoose");
const ProductModel = require("../model/productModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  addProduct: async (req, res) => {
    try {
      if (req.file) {
        const uploadImage = await cloudinary.uploader.upload(req.file.path)
        console.log(uploadImage.url);
        req.body.image = uploadImage.url
      }

      const car = req.body;
      console.log(car);
      return res.status(200).json({
        message: "successfully to push products",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "not successfully to push products",
        error: error.message,
        success: false,
      });
    }
  },
};
