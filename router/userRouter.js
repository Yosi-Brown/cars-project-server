const router = require('express').Router()
const { loginUser, registerUser, checkToken } = require('../controller/userController')

router.get('/auth', checkToken)

router.post('/', loginUser)
// router.post('/register', registerUser)


module.exports = router