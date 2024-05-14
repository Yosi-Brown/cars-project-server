const router = require("express").Router();
const { addProduct } = require("../controller/productController");

router.post("/product", addProduct);

module.exports = router;
