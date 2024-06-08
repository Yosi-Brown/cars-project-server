const router = require("express").Router();
const { addProduct, getAllProducts, deleteProduct, updateProduct, getProduct } = require("../controller/productController");
const jwtAuth = require("../middleware/jwtAuth");
const upload = require("../middleware/uploadFiles");

router.get('/getall', getAllProducts)
router.get('/get-product/:id', getProduct)
router.post("/add", jwtAuth, upload.single('image'), addProduct);
router.put('/update/:id', jwtAuth, upload.single('image'), updateProduct);
router.delete('/delete/:id', jwtAuth, deleteProduct);


module.exports = router;
