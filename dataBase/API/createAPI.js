const mongoose = require("mongoose");
const ProductModel = require("../../model/productModel");
const { addCategory } = require("../../controller/categoriesController");

module.exports = {
  pushToDb: async (req, res) => {
    try {
      // const cars = require("./cars.json");
      const cars = req.body;
      cars.forEach(async (car) => {
        car.image_link =
          "https://res.cloudinary.com/dokz0knrk/image/upload/v1716299631/ramjufxdpbceih9dxicj.png";
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
  // updateYear: async (req, res) => {
  //   try {
  //     // מצא את כל המוצרים ותחליף את הערכים של `year` ממחרוזות למספרים
  //     const products = await ProductModel.find({});

  //     for (let product of products) {
  //       if (typeof product.year === "string") {
  //         console.log(`Before update: ${product.year}`);
  //         product.year = parseInt(product.year, 10);
  //         const updatedProduct = await product.save();
  //         console.log(`After update: ${updatedProduct.year}`);
  //       }
  //     }

  //     console.log("Updated all products successfully.");
  //     res.status(200).send("Updated all products successfully.");
  //   } catch (error) {
  //     console.error("Error updating products:", error);
  //     res.status(500).send("Error updating products.");
  //   }
  // },
  updateYear: async (req, res) => {
    try {
      // עדכון כל המוצרים עם המרת year ממחרוזת למספר
      await ProductModel.updateMany({ year: { $type: "string" } }, [
        { $set: { year: { $toInt: "$year" } } },
      ]);

      console.log("Updated all products successfully.");
      res.status(200).send("Updated all products successfully.");
    } catch (error) {
      console.error("Error updating products:", error);
      res.status(500).send("Error updating products.");
    }
  },
  addCategory: async (req, res) => {
    try {
      const products = await ProductModel.updateMany(
        {},
        { $set: { category: "6666c226e774788d8007b470" } }
      );
      console.log(
        `${products.nModified} products have been updated with the new category`
      );

      res
        .status(200)
        .json({
          message: `${products.nModified} products have been updated with the new category`,
        });
    } catch (error) {
      console.error("Error updating products", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the products" });
    }
  },
};
