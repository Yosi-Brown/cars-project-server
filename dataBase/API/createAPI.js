const mongoose = require("mongoose");
const ProductModel = require("../../model/productModel");

module.exports = {
  pushToDb: async (req, res) => {
    try {
      const cars = require("./cars.json");
      cars.forEach(async (car) => {
        const singleCar = ProductModel(car);
        await singleCar.save();
        return res.status(200).json({
          message: "successfully to push products",
          success: true,
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to push products",
        error: error.message,
        success: false,
      });
    }
  },
};