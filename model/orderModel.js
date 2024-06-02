const mongoose = require("mongoose");
const Product = require("./productModel"); // ייבוא מודל המוצרים

const orderSchema = mongoose.Schema(
  {
    user: {
      ref: "Users",
      type: mongoose.Types.ObjectId,
      required: true,
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
          required: true,
        },
        RTP: {
          type: Number,
          min: 1,
        },
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
      max: [5, "maximum 5"],
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  try {
    for (const productItem of this.products) {
      if (productItem.RTP == null) {
        const product = await Product.findById(productItem.product);
        if (product) {
          productItem.RTP = product.price;
        } else {
          return next(new Error("Product not found"));
        }
      }
    }

    // חישוב totalPrice
    this.totalPrice = this.products.reduce((total, product) => {
      return total + product.RTP * product.quantity;
    }, 0);

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Orders", orderSchema);