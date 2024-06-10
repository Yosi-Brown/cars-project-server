const router = require("express").Router();
const { addCategory, getAllCategories, getByCategory } = require("../controller/categoriesController")


router.get('/getAllCategories', getAllCategories)
router.post('/addCategory', addCategory)
// router.get('/getByCategory:category-id', getByCategory)
router.get('/getByCategory/:id', getByCategory)




module.exports = router;


