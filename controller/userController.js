const Mongoose = require("mongoose");
const UserModel = require("../model/userModel");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

module.exports = {
  checkToken: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) throw new Error("must log in for this action");
      const validToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      if (!validToken) throw new Error("token is not valid");
      return res.status(200).json({
        message: "",
        success: true,
      });
    } catch (error) {
      console.log('test')
      return res.status(500).json({
        message: "",
        success: false,
        // error: error.message,
      });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email && !password) throw new Error("input not valid");

      const registerReq = UserModel(req.body);
      const hashPass = await hash(password, 10);

      registerReq.password = hashPass;
      registerReq.role = "regular";

      await registerReq.save();
      return res.status(200).json({
        message: "successfully to register user",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to register user",
        success: false,
        error: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error("input not valid");

      const loginUser = await UserModel.findOne({ email });
      if (!loginUser) throw new Error("user not exist");

      const match = await compare(password, loginUser.password);
      if (!match) throw new Error("password not match");

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
      // else {
      //   const validToken = jwt.verify(
      //     req.cookies.token,
      //     process.env.JWT_SECRET
      //   );
      //   if(!validToken)
      // }
      return res.status(200).json({
        message: "successfully to login user",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "not successfully to login user",
        success: false,
        error: error.message,
      });
    }
  },
};
