const router = require("express").Router();
const {
  loginUser,
  registerUser,
  checkToken,
  logOut,
  getAllUsers,
  deleteUser,
  updateRole,
  updateUser,
  updateProfile,
  forgotPassword,
  changePassword
} = require("../controller/userController");
const jwtAuth = require("../middleware/jwtAuth");


router.get("/getall", getAllUsers)
router.get("/auth", checkToken);
router.get("/logout", logOut);
router.delete("/delete/:id", jwtAuth, deleteUser)
router.put("/update-role/:id", jwtAuth, updateRole)
router.put("/updateUser/:id", jwtAuth, updateUser)
router.put("/updateProfile/:id", jwtAuth, updateProfile)


router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);

module.exports = router;
