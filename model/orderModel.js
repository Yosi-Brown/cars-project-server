const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      ref: "Users",
      type: mongoose.Types.ObjectId,
    },
    totalPrice: {
      type: Number,
      min: 1,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
        // RTP: {
        //   type: Number,
        //   required: true,
        //   min: 1,
        // },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    status: {
      type: Number,
      default: 1,
      min: [1, "minimum 1"],
      max: [4, "max 4"],
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  this.totalPrice = this.products.reduce((total, product) => {
    return total + product.RTP * product.quantity;
  }, 0);

  next();
});

module.exports = mongoose.model("Orders", orderSchema);
