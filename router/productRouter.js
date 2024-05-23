const router = require("express").Router();
const { addProduct, getAllProducts, deleteProduct, updateProduct } = require("../controller/productController");
const upload = require("../middleware/uploadFiles");

router.post("/add", upload.single('image'), addProduct);
router.get('/getall', getAllProducts)
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', updateProduct);


module.exports = router;
