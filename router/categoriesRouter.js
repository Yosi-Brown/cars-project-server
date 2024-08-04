const router = require("express").Router();
const { addCategory, getAllCategories, getByCategory, deleteCategory, editCategory } = require("../controller/categoriesController");
const jwtAuth = require("../middleware/jwtAuth");

router.get('/getall', getAllCategories)
router.post('/add', addCategory)
router.get('/getByCategory/:id', getByCategory)
router.delete('/delete/:id', jwtAuth, deleteCategory);
router.put('/edit/:id', jwtAuth, editCategory);


// router.get('/getByCategory:category-id', getByCategory)




module.exports = router;


