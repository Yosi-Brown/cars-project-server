const mongoose = require("mongoose");
const ProductModel = require("../model/productModel");

module.exports = {
  addProduct: async (req, res) => {
    try {
      // console.log(req)
      const car = req.body;
      const imgCar = car.image
      console.log(imgCar);
      // const singleCar = ProductModel(car);
      // await singleCar.save();
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
