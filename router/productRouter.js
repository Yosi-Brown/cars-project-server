const router = require("express").Router();
const { addProduct } = require("../controller/productController");
const upload = require("../middleware/uploadFiles");

router.post("/add", upload.single('image'), addProduct);

module.exports = router;
