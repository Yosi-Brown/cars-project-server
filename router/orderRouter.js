const router = require("express").Router();
const { getAllOrders, addOrder } = require("../controller/orderController");


router.get('/getall', getAllOrders)
router.post('/add-order', addOrder)


module.exports = router;

