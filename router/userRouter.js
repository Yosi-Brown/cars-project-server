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
const jwtAuth = require("../middleware/jwtAuth");


router.get("/getall", getAllUsers)
router.get("/auth", checkToken);
router.get("/logout", logOut);
router.delete("/delete/:id", jwtAuth, deleteUser)
router.put("/update-role/:id", jwtAuth, updateRole)
router.put("/updateUser/:id", jwtAuth, updateUser)


router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
