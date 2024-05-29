const mongoose = require("mongoose");
const ordersModel = require("../model/orderModel");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await ordersModel
        .find()
        .populate("user")
        .populate("products.product");
      return res.status(200).json({
        message: "successfully to get all orders",
        success: true,
        orders: orders,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to get all orders",
        error: error.message,
        success: false,
      });
    }
  },

  addOrder: async (req, res) => {
    try {
      const order = ordersModel(req.body);
      console.log(order);
      await order.save();
      return res.status(200).json({
        message: "successfully to add order",
        success: true,
        order: order,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to add order",
        error: error.message,
        success: false,
      });
    }
  },
};
