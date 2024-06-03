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
      console.log(req.body)
      const { email, password, confirmPassword } = req.body;
      if (!email || !password) throw new Error("input not valid");

      // if(password != confirmPassword) throw new Error('passwords is not compare')
      const registerReq = UserModel(req.body);
      console.log(registerReq)
      const hashPass = await hash(password, 10);

      registerReq.password = hashPass;
      registerReq.role = "regular";

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
      // transporter.sendMail({
      //     from: process.env.MAILER_AUTH_USER_NAME,
      //     to: email,
      //     subject:"good yossi",
      //     html:`<h1>hello yossi</h1>
      //     <p>welcome to mego project we love you</p>`
      // })

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

  logOut: async(req,res) =>{
    try {
      res.clearCookie('token')
      return res.status(200).json({
        message: "Token cleared",
        success: true,})
    } catch (error) {
      console.log('Token not cleared')
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },

  getAllUsers: async(req,res) =>{
    try {
      const users = await UserModel.find()
      return res.status(200).json({
        message: "successfully to get all Users",
        success: true,
        users: users
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to get all Users",
        error: error.message,
        success: false,
      })
    }
  },

  deleteUser: async(req, res) => {
    try {
      const { id } = req.params;
      const deleteUser = await UserModel.findByIdAndDelete(id);
      console.log(deleteUser)

      if (!deleteUser) {throw new Error("User not found")}


      return res.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log('test',id)
      return res.status(500).json({
        message: "Failed to delete User",
        error: error.message,
        success: false,
      });
    }
  },

  updateRole: async(req, res) =>{
    try {
      const {id, newRole:role } = (req.body)
      console.log(role)
      const updateRole = await UserModel.findByIdAndUpdate(id, {role})
      // console.log(updateRole)
      return res.status(200).json({
        message: "role updated successfully",
        success: true,
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "role note updated",
        success: false,
      })
    }
  },

  updateUser: async(req, res) =>{
    try {
      const { id } = req.params;
      // const {id, newRole:role } = (req.body)
      // console.log(role)
      const updateUser = await UserModel.findByIdAndUpdate(id, req.body,{new:true})
      // console.log(updateRole)
      return res.status(200).json({
        message: "user updated successfully",
        success: true,
        user: updateUser
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "user note updated",
        success: false,
      })
    }
  }
}
