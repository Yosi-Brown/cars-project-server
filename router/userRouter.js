const router = require("express").Router();
const {
  loginUser,
  registerUser,
  checkToken,
  logOut,
  changePassword,
  getAllUsers,
  deleteUser,
  updateRole,
  updateUser,
  updateProfile,
  forgotPassword,
  resetPassword
} = require("../controller/userController");
const jwtAuth = require("../middleware/jwtAuth");


router.get("/getall", getAllUsers)
router.get("/auth", checkToken);
router.get("/logout", logOut);
router.delete("/delete/:id", jwtAuth, deleteUser)
router.put("/update-role/:id", jwtAuth, updateRole)
router.put("/updateUser/:id", jwtAuth, updateUser)
router.put("/updateProfile/:id", jwtAuth, updateProfile)
router.post("/changePassword/:id", changePassword);


router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
