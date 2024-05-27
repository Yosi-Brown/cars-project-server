const router = require("express").Router();
const { getAllOrders } = require("../controller/ordresContrller");


router.get('/getall', getAllOrders)


module.exports = router;

