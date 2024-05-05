const router = require('express').Router()
const { loginManager, registerUser } = require('../controller/manager_controler')

router.post('/', loginManager)
router.post('/register', registerUser)


module.exports = router