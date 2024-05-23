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
  getAllProducts: async (req,res) => {
    try {
      const products = await ProductModel.find()
      return res.status(200).json({
        message: "successfully to get all products",
        success: true,
        products: products
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to get all products",
        error: error.message,
        success: false,
      })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      // console.log(deletedProduct)

      if (!deletedProduct) {throw new Error("Product not found")}


      return res.status(200).json({
        message: "Product deleted successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete product",
        error: error.message,
        success: false,
      });
    }
  },
  updateProduct: async (req, res) =>{
    try {
      const { id } = req.params;
      const updatedData = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedProduct) throw new Error('Product not found')
  
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update product',
        error: error.message
      });
    }
  }}     

;
