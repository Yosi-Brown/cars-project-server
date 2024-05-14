const mongoose = require("mongoose");
const UserModel = require("../model/userModel");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      const { email, password } = req.body;
      if (!email || !password) throw new Error("input not valid");

      const registerReq = UserModel(req.body);
      const hashPass = await hash(password, 10);

      registerReq.password = hashPass;
      // registerReq.role = "regular";

      await registerReq.save();

      return res.status(200).json({
        message: "New user registered",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "New user did not register successfully",
        success: false,
        error: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw new Error("You must enter an email and password");

      const loginUser = await UserModel.findOne({ email });
      if (!loginUser) throw new Error("user dose not exist");

      const match = await compare(password, loginUser.password);
      if (!match) throw new Error("Wrong password!!");

      if (!req.cookies.token) {
        const payload = { id: loginUser._id, role: loginUser.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 3,
        });
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 3,
          httpOnly: true,
        });
        // else {
        //   const validToken = jwt.verify(
        //     req.cookies.token,
        //     process.env.JWT_SECRET
        //   );
        //   if(!validToken)
        // }
      }
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
