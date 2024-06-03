const router = require("express").Router();
const {
  loginUser,
  registerUser,
  checkToken,
  logOut,
  getAllUsers,
  deleteUser,
  updateRole,
  updateUser
} = require("../controller/userController");

router.get("/auth", checkToken);
router.get("/logout", logOut);
router.get("/getall", getAllUsers)
router.delete("/delete/:id", deleteUser)
router.put("/update-role", updateRole)
router.put("/updateUser/:id", updateUser)


router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
