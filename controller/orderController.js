const mongoose = require("mongoose");
const OrderModel = require("../model/orderModel");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderModel.find()
        .populate("user")
        .populate({
          path: "products.product",
          populate: {path: "category"},
        });
      // console.log(orders)

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
      const order = OrderModel(req.body);
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

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await OrderModel.findByIdAndDelete(id);
      // console.log(deletedOrder)

      if (!deletedOrder) {
        throw new Error("Order not found");
      }

      return res.status(200).json({
        message: "Order deleted successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete Order",
        error: error.message,
        success: false,
      });
    }
  },

  updateStatus: async (req, res) => {
    try {
      console.log("test");
      const { id } = req.params;
      // console.log(id)
      const { newStatus } = req.body;
      // console.log(status)
      const updateRole = await OrderModel.findByIdAndUpdate(id, {
        status: newStatus,
      });
      // console.log(updateRole)
      return res.status(200).json({
        message: "Status updated successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Status note updated",
        success: false,
      });
    }
  },
};
