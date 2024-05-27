const mongoose = require("mongoose");
const ordersModel = require("../model/orderModel");

module.exports = {
    getAllOrders: async   (req,res) => {
        try {
          const orders = await ordersModel.find()
          return res.status(200).json({
            message: "successfully to get all orders",
            success: true,
            orders: orders
          });
        } catch (error) {
          return res.status(500).json({
            message: "not successfully to get all orders",
            error: error.message,
            success: false,
          })
        }
    }}
