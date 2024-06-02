const router = require("express").Router();
const { getAllOrders, addOrder, deleteOrder, updateStatus } = require("../controller/orderController");


router.get('/getall', getAllOrders)
router.post('/add-order', addOrder)
router.delete('/delete/:id', deleteOrder);
router.put("/updateStatus", updateStatus)



module.exports = router;

