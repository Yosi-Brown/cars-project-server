const router = require("express").Router();
const { addProduct, getAllProducts, deleteProduct, updateProduct, getProduct } = require("../controller/productController");
const upload = require("../middleware/uploadFiles");

router.post("/add", upload.single('image'), addProduct);
router.get('/get-product/:id', getProduct)
router.get('/getall', getAllProducts)
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', upload.single('image'), updateProduct);
// router.put('/image-update', upload.single('image'), updateProduct);


module.exports = router;
