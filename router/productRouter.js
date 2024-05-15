const router = require("express").Router();
const { addProduct } = require("../controller/productController");

router.post("/add", addProduct);

module.exports = router;
