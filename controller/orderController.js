const mongoose = require("mongoose");
const OrderModel = require("../model/orderModel");
const NumModel = require("../model/orderNumModel");
const { orderMail } = require("../templates/emails");


module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderModel.find()
        .populate("user")
        .populate({
          path: "products.product",
          populate: { path: "category" },
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
      const { order } = req.body;
      // console.log(order);
      const numDoc  = await NumModel.findOne()
      const orderNum = numDoc.orderNum + 1
      // console.log(orderNum);
      order.orderNum = orderNum

      const newOrder = OrderModel(order);
      
      
      await newOrder.save();
      
      numDoc.orderNum = orderNum;
      await numDoc.save();
      
      await newOrder.populate('user')
      await newOrder.populate('products.product')
      // .populate('products.product')
      // console.log('test',newOrder.products[0]);

      await orderMail(newOrder)
  
      return res.status(200).json({
        message: "successfully to add order",
        success: true,
        order: order,
      });
    } catch (error) {
      console.log(error);
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
  // addOrder: async (req, res) => {
  //   try {
  //     const { order } = req.body;
  
  //     // קבלת המספר הסדרתי הבא
  //     const numDoc = await NumModel.findOne();
  //     const orderNum = numDoc.orderNum + 1;
  //     order.orderNum = orderNum;
  
  //     // יצירת מודל ההזמנה עם הפרטים הרלוונטיים
  //     const newOrder = new OrderModel(order);
  
  //     // השתמש ב־populate כדי להחליף את ה־ObjectIds של המוצרים במידע ממודל המוצרים
  //     await newOrder.populate('products.product');
  
  //     // שמירת ההזמנה במסד הנתונים
  //     await newOrder.save();
  
  //     // עדכון המספר הסדרתי הבא במודל המספרים
  //     numDoc.orderNum = orderNum;
  //     await numDoc.save();
  
  //     // הדפסת ההזמנה לצורך בדיקה
  //     console.log('New Order:', newOrder);
  
  //     return res.status(200).json({
  //       message: "הזמנה נוספה בהצלחה",
  //       success: true,
  //       order: newOrder,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({
  //       message: "יצירת ההזמנה נכשלה",
  //       error: error.message,
  //       success: false,
  //     });
  //   }
  // },
  
};
