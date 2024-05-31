const mongoose = require("mongoose");
const ProductModel = require("../../model/productModel");

module.exports = {
  pushToDb: async (req, res) => {
    try {
      // const cars = require("./cars.json");
      const cars = req.body
      cars.forEach(async (car) => {
        car.image_link = 'https://res.cloudinary.com/dokz0knrk/image/upload/v1716299631/ramjufxdpbceih9dxicj.png'
        const singleCar = ProductModel(car);
        await singleCar.save();
        // return res.status(200).json({
        //   message: "successfully to push products",
        //   success: true,
        // });
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
