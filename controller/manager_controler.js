const mongoose = require("mongoose");
const Manager = require("../model/managerModel");
const { hash, compare } = require("bcrypt");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email && !password) throw new Error("input not valid");

      const hashPass = await hash(password, 10);
      req.body.password = hashPass;

      const newManager = Manager(req.body);

      await newManager.save();
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

  loginManager: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email && !password) throw new Error("input not valid");

      const newManager = await Manager.findOne({ email });
      if (!newManager) throw new Error("user not exist");

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
};
