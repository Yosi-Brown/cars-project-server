const router = require("express").Router();
const {
  loginUser,
  registerUser,
  checkToken,
  logOut
} = require("../controller/userController");

router.get("/auth", checkToken);
router.get("/logout", logOut);
// router.get('/login', loginUser)

// router.get('/', test)

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
