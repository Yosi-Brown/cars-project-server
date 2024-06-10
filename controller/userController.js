const mongoose = require("mongoose");
const UserModel = require("../model/userModel");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../middleware/mailer");

module.exports = {
  checkToken: async (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must log in for this action");

      const validToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!validToken) throw new Error("token is not valid");

      return res.status(200).json({
        message: "You have a valid token",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },

  registerUser: async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password, confirmPassword } = req.body;
      if (!email || !password) throw new Error("input not valid");

      if (password != confirmPassword)
        throw new Error("passwords is not compare");

      const registerReq = new UserModel(req.body);
      // console.log(registerReq);
      const hashPass = await hash(password, 10);

      registerReq.password = hashPass;

      const test = await registerReq.save();
      // console.log(test)

      req.body = { email, password, newUser: true }; // הכנה של req.body להתחברות

      const result = await module.exports.loginUser(req, res); // קריאה לפונקציית loginUser עם דגל מיוחד

      if (result.success) {
        return res.status(200).json({
          message: "New user registered and logged in successfully",
          success: true,
        });
      } else {
        return res.status(500).json({
          message: "Registration succeeded but login failed",
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      if (error.code === 11000) {
        return res.status(500).json({
          message: "Email already exists!",
          success: false,
          error: error.message,
        });
      } else {
        return res.status(500).json({
          message: "New user did not register successfully",
          success: false,
          error: error.message,
        });
      }
    }
  },

  loginUser: async (req, res) => {
    // console.log(register);
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw new Error("You must enter an email and password");

      const loginUser = await UserModel.findOne({ email });
      if (!loginUser) throw new Error("user dose not exist");

      const match = await compare(password, loginUser.password);
      if (!match) throw new Error("Wrong password!!");
      // console.log(match);

      if (!req.cookies.token) {
        const payload = { id: loginUser._id, role: loginUser.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 3,
        });
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 3,
          httpOnly: true,
        });
      }
      // transporter.sendMail({
      //     from: process.env.MAILER_AUTH_USER_NAME,
      //     to: email,
      //     subject:"good yossi",
      //     html:`<h1>hello yossi</h1>
      //     <p>welcome to mego project we love you</p>`
      // })

      if (req.body.newUser) {
        return { success: true }; // במקרה של קריאה פנימית, חזור אובייקט עם הצלחה
      } else {
        return res.status(200).json({
          message: "Login successfully",
          success: true,
        });
      }
    } catch (error) {
      if (req.body.newUser) {
        return { success: false, error: error.message }; // במקרה של קריאה פנימית, חזור אובייקט עם שגיאה
      } else {
        return res.status(500).json({
          message: "Login failed",
          success: false,
          error: error.message,
        });
      }
    }
  },

  logOut: async (req, res) => {
    try {
      res.clearCookie("token");
      return res.status(200).json({
        message: "Logout successfully",
        success: true,
      });
    } catch (error) {
      console.log("Logout failed");
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.find();
      return res.status(200).json({
        message: "successfully to get all Users",
        success: true,
        users: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to get all Users",
        error: error.message,
        success: false,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUser = await UserModel.findByIdAndDelete(id);
      // console.log(deleteUser)

      if (!deleteUser) {
        throw new Error("User not found");
      }

      return res.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log("test", id);
      return res.status(500).json({
        message: "Failed to delete User",
        error: error.message,
        success: false,
      });
    }
  },

  updateRole: async (req, res) => {
    try {
      const { newRole } = req.body;
      const { id } = req.params;
      console.log(newRole);
      const updateRole = await UserModel.findByIdAndUpdate(id, {
        role: newRole,
      });
      // console.log(updateRole)
      return res.status(200).json({
        message: "role updated successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "role note updated",
        success: false,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      // const {id, newRole:role } = (req.body)
      // console.log(role)
      const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // console.log(updateRole)
      return res.status(200).json({
        message: "user updated successfully",
        success: true,
        user: updateUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "user note updated",
        success: false,
      });
    }
  },
};
