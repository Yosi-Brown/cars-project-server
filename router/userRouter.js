const router = require("express").Router();
const {
  loginUser,
  registerUser,
  checkToken,
} = require("../controller/userController");

router.get("/auth", checkToken);
// router.get('/login', loginUser)

// router.get('/', test)

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
