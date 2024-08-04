const mongoose = require("mongoose");

const OrderNumSchema = mongoose.Schema({
  orderNum: {
    type: Number,
    required: true
  },
}, {timestamps: true});

module.exports = mongoose.model('Order-num', OrderNumSchema);