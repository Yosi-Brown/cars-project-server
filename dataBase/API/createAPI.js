const mongoose = require("mongoose");
const ProductModel = require("../../model/productModel");
const { addCategory } = require("../../controller/categoriesController");
const CategoryModel = require("../../model/categoryModel");


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

  updateYearBeta: async (req, res) => {
    try {
      // מצא את כל המוצרים ותחליף את הערכים של `year` ממחרוזות למספרים
      const products = await ProductModel.find({});

      for (let product of products) {
        if (typeof product.year === "string") {
          console.log(`Before update: ${product.year}`);
          product.year = parseInt(product.year, 10);
          const updatedProduct = await product.save();
          console.log(`After update: ${updatedProduct.year}`);
        }
      }

      console.log("Updated all products successfully.");
      res.status(200).send("Updated all products successfully.");
    } catch (error) {
      console.error("Error updating products:", error);
      res.status(500).send("Error updating products.");
    }
  },

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

  addCarTypeToCategories: async (req, res) => {
    try {
      // משיכת כל המוצרים
      const products = await ProductModel.find({});
      
      // יצירת סט ייחודי של car_type מכל המוצרים
      const carTypes = [...new Set(products.map(product => product.car_type))];

      // מיפוי למיזוג קטגוריות דומות
      const categoryMapping = {
          'SUV': ['suv', 'SUV', 'small SUV', 'Small SUV', 'Full-size SUV'],
          'Luxury': ['Luxury', 'Luxury Sedan'],
          'Hatchback': ['hatchback'],
          'Electric Hatchback': ['Electric Hatchback'],
          'Sedan': ['sedan', 'Luxury Sedan'],
          'Minivan': ['Minivan'],
          'Muscle Car': ['Muscle Car'],
          'Coupe': ['coupe'],
          'Pickup Truck': ['pickup truck'],
          'Wagon': ['wagon']
      };

      // יצירת אובייקט ייחודי לקטגוריות הממוזגות
      const mergedCategories = new Set();

      carTypes.forEach(carType => {
          for (const [mergedCategory, synonyms] of Object.entries(categoryMapping)) {
              if (synonyms.includes(carType)) {
                  mergedCategories.add(mergedCategory);
                  break;
              }
          }
      });

      // הוספת כל קטגוריה ממוזגת לקולקשן של הקטגוריות והכנת מיפוי קטגוריה ל-ObjectId שלה
      const categoryIdMapping = {};
      for (const category of mergedCategories) {
          const updatedCategory = await CategoryModel.findOneAndUpdate(
              { name: category },
              { $set: { name: category } },
              { upsert: true, new: true, useFindAndModify: false } // יצירה אם לא קיים
          );
          categoryIdMapping[category] = updatedCategory._id;
      }

      console.log(`${mergedCategories.size} merged categories have been added to the categories collection`);

      // יצירת מיפוי הפוך למציאת קטגוריה ממוזגת לפי car_type
      const reverseMapping = {};
      for (const [mergedCategory, synonyms] of Object.entries(categoryMapping)) {
          synonyms.forEach(synonym => {
              reverseMapping[synonym] = categoryIdMapping[mergedCategory];
          });
      }

      // עדכון הקטגוריות בכל מוצר
      for (const product of products) {
          const newCategoryId = reverseMapping[product.car_type];
          if (newCategoryId) {
              await ProductModel.updateOne(
                  { _id: product._id },
                  { $set: { category: newCategoryId } }
              );
          }
      }

      res.status(200).json({
          message: `${mergedCategories.size} merged categories have been added to the categories collection and products have been updated`,
      });
  } catch (error) {
      console.error("Error updating categories", error);
      res.status(500).json({ error: "An error occurred while updating the categories and products" });
  }
  
  
    //   try {
  //     // משיכת כל המוצרים
  //     const products = await ProductModel.find({});
      
  //     // יצירת סט ייחודי של car_type מכל המוצרים
  //     const carTypes = [...new Set(products.map(product => product.car_type))];

  //     // מיפוי למיזוג קטגוריות דומות
  //     const categoryMapping = {
  //         'SUV': ['suv', 'SUV', 'small SUV', 'Small SUV', 'Full-size SUV'],
  //         'Luxury': ['Luxury', 'Luxury Sedan'],
  //         'Hatchback': ['hatchback'],
  //         'Electric Hatchback': ['Electric Hatchback'],
  //         'Sedan': ['sedan', 'Luxury Sedan'],
  //         'Minivan': ['Minivan'],
  //         'Muscle Car': ['Muscle Car'],
  //         'Coupe': ['coupe'],
  //         'Pickup Truck': ['pickup truck'],
  //         'Wagon': ['wagon']
  //     };

  //     // יצירת אובייקט ייחודי לקטגוריות הממוזגות
  //     const mergedCategories = new Set();

  //     carTypes.forEach(carType => {
  //         for (const [mergedCategory, synonyms] of Object.entries(categoryMapping)) {
  //             if (synonyms.includes(carType)) {
  //                 mergedCategories.add(mergedCategory);
  //                 break;
  //             }
  //         }
  //     });

  //     // הוספת כל קטגוריה ממוזגת לקולקשן של הקטגוריות
  //     for (const category of mergedCategories) {
  //         await CategoryModel.updateOne(
  //             { name: category },
  //             { $set: { name: category } },
  //             { upsert: true } // יצירה אם לא קיים
  //         );
  //     }

  //     console.log(`${mergedCategories.size} merged categories have been added to the categories collection`);

  //     // יצירת מיפוי הפוך למציאת קטגוריה ממוזגת לפי car_type
  //     const reverseMapping = {};
  //     for (const [mergedCategory, synonyms] of Object.entries(categoryMapping)) {
  //         synonyms.forEach(synonym => {
  //             reverseMapping[synonym] = mergedCategory;
  //         });
  //     }

  //     // עדכון הקטגוריות בכל מוצר
  //     for (const product of products) {
  //         const newCategory = reverseMapping[product.car_type];
  //         if (newCategory) {
  //             await ProductModel.updateOne(
  //                 { _id: product._id },
  //                 { $set: { category: newCategory } }
  //             );
  //         }
  //     }

  //     res.status(200).json({
  //         message: `${mergedCategories.size} merged categories have been added to the categories collection and products have been updated`,
  //     });
  // } catch (error) {
  //     console.error("Error updating categories", error);
  //     res.status(500).json({ error: "An error occurred while updating the categories and products" });
  // }


    //   try {
  //     // משיכת כל המוצרים
  //     const products = await ProductModel.find({});
      
  //     // יצירת סט ייחודי של car_tayp מכל המוצרים
  //     const carTypes = [...new Set(products.map(product => product.car_type))];

  //     // מיפוי למיזוג קטגוריות דומות
  //     const categoryMapping = {
  //       'SUV': ['suv', 'SUV', 'small SUV', 'Small SUV', 'Full-size SUV'],
  //       'Luxury': ['Luxury', 'Luxury Sedan'],
  //       'Hatchback': ['hatchback'],
  //       'Electric Hatchback': ['Electric Hatchback'],
  //       'Sedan': ['sedan', 'Luxury Sedan'],
  //       'Minivan': ['Minivan'],
  //       'Muscle Car': ['Muscle Car'],
  //       'Coupe': ['coupe'],
  //       'Pickup Truck': ['pickup truck'],
  //       'Wagon': ['wagon']
  //   };


  //     // יצירת אובייקט ייחודי לקטגוריות הממוזגות
  //     const mergedCategories = new Set();

  //     carTypes.forEach(carType => {
  //         for (const [mergedCategory, synonyms] of Object.entries(categoryMapping)) {
  //             if (synonyms.includes(carType)) {
  //                 mergedCategories.add(mergedCategory);
  //                 break;
  //             }
  //         }
  //     });

  //     // הוספת כל קטגוריה ממוזגת לקולקשן של הקטגוריות
  //     for (const category of mergedCategories) {
  //         await CategoryModel.updateOne(
  //             { name: category },
  //             { $set: { name: category } },
  //             { upsert: true } // יצירה אם לא קיים
  //         );
  //     }

  //     console.log(`${mergedCategories.size} merged categories have been added to the categories collection`);

  //     res.status(200).json({
  //         message: `${mergedCategories.size} merged categories have been added to the categories collection`,
  //     });
  // } catch (error) {
  //     console.error("Error updating categories", error);
  //     res.status(500).json({ error: "An error occurred while updating the categories" });
  // }
    // try {
    //     // משיכת כל המוצרים
    //     const products = await ProductModel.find();
        
    //     // יצירת סט ייחודי של car_tayp מכל המוצרים
    //     const carTypes = [...new Set(products.map(product => product.car_type))];
    //     console.log(carTypes);

    //     // הוספת כל car_tayp לקולקשן של הקטגוריות
    //     for (const carType of carTypes) {
    //         await CategoryModel.updateOne(
    //             { name: carType },
    //             { $set: { name: carType } },
    //             { upsert: true } // יצירה אם לא קיים
    //         );
    //     }

    //     console.log(`${carTypes.length} car types have been added to the categories collection`);

    //     res.status(200).json({
    //         message: `${carTypes.length} car types have been added to the categories collection`,
    //     });
    // } catch (error) {
    //     console.error("Error updating categories", error);
    //     res.status(500).json({ error: "An error occurred while updating the categories" });
    // }
  }
};
