const mongoose = require("mongoose");
const CategoryModel = require("../model/categoriesModel");
const ProductModel = require('../model/productModel')

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await CategoryModel.find();
      return res.status(200).json({
        message: "successfully to get all Categories",
        success: true,
        categories: categories,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to get all Categories",
        error: error.message,
        success: false,
      });
    }
  },

  addCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      console.log('newCategory', req.body);
      const data = new CategoryModel({ name: categoryName });
      // console.log("data");
      await data.save();

      return res.status(200).json({
        message: "successfully to add category",
        success: true,
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        message: "not successfully to add category",
        error: error.message,
        success: false,
      });
    }
  },

  getByCategory: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log("Category ID:", id);
  
      // מציאת מוצרים לפי ה-ObjectId של הקטגוריה ושימוש ב-populate לטעינת מידע הקטגוריה
      const products = await ProductModel.find({ category: id }).populate("category");
  
      // console.log("Products found:", products);
      
      return res.status(200).json({
        message: "Successfully fetched products by category",
        success: true,
        products: products,
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return res.status(500).json({
        message: "Failed to fetch products by category",
        error: error.message,
        success: false,
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);
      console.log(deletedCategory)

      if (!deletedCategory) {
        throw new Error ("Category not found");
      }

      return res.status(200).json({
        message: "Category deleted successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete Category",
        error: error.message,
        success: false,
      });
    }
  },

  editCategory: async (req, res) => {
    try {
      
      const { id } = req.params;
      // console.log(id);
      const { categoryName } = req.body;
      console.log(categoryName);
      const updatedCategory = await CategoryModel.findByIdAndUpdate(id, {name: categoryName});
      console.log(updatedCategory)
      if (!updatedCategory) throw new Error('Category not found')

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        // product: updatedProduct
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update Category",
        error: error.message,
      });
    }
  },
  
};
