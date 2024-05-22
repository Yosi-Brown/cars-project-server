const router = require("express").Router();
const { addProduct, getAllProducts } = require("../controller/productController");
const upload = require("../middleware/uploadFiles");

router.post("/add", upload.single('image'), addProduct);
router.get('/getall', getAllProducts)


module.exports = router;
