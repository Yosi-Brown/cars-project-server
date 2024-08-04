const router = require("express").Router();
const { getAllOrders, addOrder, deleteOrder, updateStatus } = require("../controller/orderController");
const jwtAuth = require("../middleware/jwtAuth");


router.get('/getall', getAllOrders)
router.post('/add-order', addOrder)
router.delete('/delete/:id', jwtAuth, deleteOrder);
router.put('/updateStatus/:id', jwtAuth, updateStatus)



module.exports = router;

